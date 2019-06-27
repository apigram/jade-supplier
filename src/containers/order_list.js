import React, {Component} from 'react';
import {fetchOrders, fetchOrder, fetchSuppliers, addOrder, saveOrder, deleteOrder} from '../actions';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import OrderSearch from './order_search_bar'
import Modal from "react-modal";

const customStyles = {
    content: {
        top: '50%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        marginRight: '-50%',
        transform: 'translate(-50%, -50%)'
    }
};

Modal.setAppElement('.container');

class OrderList extends Component {
    constructor(props) {
        super(props);
        this.props.fetchOrders();
        this.props.fetchSuppliers();
        this.state = {
            modalIsOpen: false,
            delivery_date: '',
            supplier: "",
            items: []
        };

        this.openModal = this.openModal.bind(this);
        this.closeModal = this.closeModal.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleItemChange = this.handleItemChange.bind(this);
        this.addItem = this.addItem.bind(this);
    }

    addItem() {
        let newItem = {item: "", quantity: 0};
        this.setState({items: [...this.state.items, newItem]});
    }

    removeItem(deletedItem) {
        this.setState({
            items: this.state.items.filter((item) => {
                return item.url !== deletedItem.url;
            })
        });
    }

    handleChange(event) {
        event.preventDefault();
        switch (event.target.name) {
            case 'scheduled_deliver_date':
                this.setState({scheduled_deliver_date: event.target.value});
                break;
            case 'supplier':
                this.setState({supplier: event.target.value});
                break;
            default:
                break;
        }
    }

    handleItemChange(event) {
        let index = parseInt(event.target.name.match('[0-9]+?')[0]);
        let eventName = event.target.name.match('[A-Za-z]+')[0];
        let newItemState = this.state.items;
        switch (eventName) {
            case 'item':
                newItemState[index].item = event.target.value;
                newItemState[index].unit_price = this.props.items.filter((item) => {
                    return item.url === newItemState[index].item
                })[0].unit_price;
                break;
            case 'quantity':
                newItemState[index].quantity = event.target.value;
                break;
            case 'unit_price':
                newItemState[index].unit_price = event.target.value;
                break;
            default:
                break;
        }

        this.setState({items: newItemState})
    }

    handleSubmit(event) {
        event.preventDefault();
        let newOrder = {
            scheduled_deliver_date: this.state.scheduled_deliver_date,
            status: 'Order Received',
            client: this.props.activeUser.company,
            supplier: this.state.supplier,
            items: this.state.items
        };
        this.props.addOrder(newOrder);
    }

    openModal() {
        this.setState({modalIsOpen: true});
    }

    closeModal() {
        this.setState({modalIsOpen: false});
    }

    renderList() {
        return this.props.orders.map((order) => {
            let listClass = 'list-group-item list-group-item-action';
            if (this.props.activeOrder !== null && order.url === this.props.activeOrder.url) {
                listClass = listClass + ' active';
            }
            let dateString = new Date(order.received_date).toDateString();
            return (
                <li key={order.url} className={listClass}>
                    <div className="row">
                        <div className="col-sm-10" onClick={() => {this.props.fetchOrder(order.url)}}>
                            {dateString}
                        </div>
                        <div className="col-sm-2">
                            <button type="button" className="btn btn-danger" onClick={() => {this.props.deleteOrder(order.url)}}>Delete</button>
                        </div>
                    </div>
                </li>
            )
        })
    }

    renderAddLink() {
        return (
            <div className="card-link">
                <a href="javascript:void(0)" onClick={this.openModal}>Place an order</a>
                <Modal
                    isOpen={this.state.modalIsOpen}
                    onRequestClose={this.closeModal}
                    style={customStyles}
                    contentLabel="Add Item">
                    <div className="card bg-light text-dark">
                        <div className="card-header">
                            <h2 ref={subtitle => this.subtitle = subtitle}>Place Order</h2>
                        </div>
                        <div className="card-body">
                            <form onSubmit={this.handleSubmit}>
                                <div className="form-name">
                                    <div className="form-group">
                                        <label htmlFor="scheduled_delivery_date">Deliver By:</label>
                                        <input name="scheduled_delivery_date" type="date" onChange={this.handleChange}
                                               value={this.state.scheduled_deliver_date} className="form-control"/>
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="supplier">Supplier:</label>
                                        <br/>
                                        <select name="supplier" onChange={this.handleChange} value={this.state.supplier} className="form-control">
                                            <option value="">Select one...</option>
                                            {this.renderSupplierList()}
                                        </select>
                                    </div>
                                    <strong>Items</strong>
                                    <table className="table table-striped table-bordered">
                                        <thead className="thead-dark">
                                        <tr>
                                            <th>Item</th>
                                            <th>Quantity</th>
                                            <th>Unit Price</th>
                                            <th/>
                                        </tr>
                                        </thead>
                                        <tbody>
                                            {this.renderItemForms()}
                                        </tbody>
                                        <tfoot>
                                        <tr>
                                            <td colSpan="4">
                                                <a href="javascript:void(0)" onClick={this.addItem}>Add item to order</a>
                                            </td>
                                        </tr>
                                        </tfoot>
                                    </table>
                                </div>
                                <div className="btn-group">
                                    <button type="submit" className="btn btn-primary">Create</button>
                                    <button type="button" className="btn btn-danger"
                                            onClick={this.closeModal}>Cancel
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </Modal>
            </div>
        )
    }

    renderItemForms() {
        if (this.state.items) {
            return this.state.items.map((item, index) => {
                return (
                    <tr key={index}>
                        <td>
                            <select name={"item[" + index + "]"} value={this.state.items[index].url} onChange={this.handleItemChange} className="form-control">
                                <option value="">Select one...</option>
                                {this.renderItemList()}
                            </select>
                        </td>
                        <td>
                            <input name={"quantity[" + index + "]"} type="text" onChange={this.handleItemChange} value={this.state.items[index].quantity} className="form-control"/>
                        </td>
                        <td>
                            <input name={"unit_price[" + index + "]"} type="text" onChange={this.handleItemChange} value={this.state.items[index].unit_price} className="form-control"/>
                        </td>
                        <td>
                            <a href="javascript:void(0)" onClick={this.removeItem.bind(this, item)}>Remove</a>
                        </td>
                    </tr>
                );
            });
        }
    }

    renderSupplierList() {
        return this.props.suppliers.map((supplier) => {
            return (
                <option key={supplier.url} value={supplier.url}>{supplier.name}</option>
            );
        });
    }

    renderItemList() {
        return this.props.items.map((item) => {
            return (
                <option key={item.url} value={item.url}>{item.label}</option>
            );
        });
    }

    render() {
        if (this.props.orders !== null) {
            return (
                <div className="card bg-light text-dark">
                    <h2 className="card-header">Orders</h2>
                    <OrderSearch/>
                    <ul className="list-group list-group-flush">
                        {this.renderList()}
                    </ul>
                    {this.renderAddLink()}
                </div>
            );
        } else {
            return (
                <div className="card bg-light text-dark">
                    <h2 className="card-header">Orders</h2>
                    <OrderSearch/>
                    <p>Loading Orders...</p>
                </div>
            )
        }
    }
}

function mapStateToProps(state) {
    return {
        orders: state.orders,
        activeOrder: state.activeOrder,
        suppliers: state.suppliers,
        items: state.items,
        activeUser: state.activeUser
    }
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({fetchOrders, fetchOrder, fetchSuppliers, addOrder, saveOrder, deleteOrder}, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(OrderList);