import React, {Component} from 'react';
import {connect} from 'react-redux';
import {saveItem} from "../actions";
import {bindActionCreators} from "redux";
import ItemOrder from "../components/item_order"

class ItemDetail extends Component {
    constructor(props) {
        super(props);

        this.state = {
            url: '',
            quantity: '',
            unit_price: '',
            low_stock_threshold: ''
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (this.props.activeItem.url !== prevState.url) {
            this.setState({url: this.props.activeItem.url});
            if (this.props.activeItem.quantity !== prevState.quantity && this.state.quantity === '') {
                this.setState({quantity: this.props.activeItem.quantity})
            }
            if (this.props.activeItem.unit_price !== prevState.unit_price && this.state.unit_price === '') {
                this.setState({unit_price: this.props.activeItem.unit_price})
            }
            if (this.props.activeItem.low_stock_threshold !== prevState.low_stock_threshold && this.state.low_stock_threshold === '') {
                this.setState({low_stock_threshold: this.props.activeItem.low_stock_threshold})
            }
        }
    }

    handleChange(event) {
        switch (event.target.name) {
            case 'quantity':
                this.setState({quantity: event.target.value});
                break;
            case 'unit_price':
                this.setState({unit_price: event.target.value});
                break;
            case 'low_stock_threshold':
                this.setState({low_stock_threshold: event.target.value});
                break;
            default:
                break;
        }
    }

    handleSubmit(event) {
        event.preventDefault();
        let itemData = {
            quantity: this.state.quantity,
            unit_price: this.state.unit_price,
            low_stock_threshold: this.state.low_stock_threshold
        };
        this.props.saveItem(this.props.activeItem.url, itemData);
    }

    renderOrders() {
        return this.props.activeItem.orders.map((order) => {
            return (
                <ItemOrder key={order.url} order={order}/>
            )
        })
    }

    render() {
        if (this.props.activeItem && this.state) {
            return (
                <div className="card text-white bg-info">
                    <h2 className="card-header">{this.props.activeItem.label}</h2>
                    <div className="card-body">
                        <form onSubmit={this.handleSubmit}>
                            <div className="form-group">
                                <label htmlFor="quantity">Total Quantity:</label>
                                <input name="quantity" type="text" className="form-control"
                                       value={this.state.quantity} onChange={this.handleChange}/>
                            </div>
                            <div className="form-group">
                                <label htmlFor="unit_price">Price Per Unit:</label>
                                <input name="unit_price" type="text" className="form-control"
                                       value={this.state.unit_price} onChange={this.handleChange}/>
                            </div>
                            <div className="form-group">
                                <label htmlFor="low_stock_threshold">Low Stock Threshold:</label>
                                <input name="low_stock_threshold" type="text" className="form-control"
                                       value={this.state.low_stock_threshold} onChange={this.handleChange}/>
                            </div>
                            <button className="btn btn-primary" type="submit">Save</button>
                        </form>
                        <br/>
                        <table className="table">
                            <thead>
                            <tr>
                                <th>Order Received Date</th>
                                <th>Quantity Ordered</th>
                                <th>Unit Price</th>
                                <th>Comments</th>
                            </tr>
                            </thead>
                            <tbody>
                                {this.renderOrders()}
                            </tbody>
                        </table>
                    </div>
                </div>
            )
        }
        return (
            <div className="card text-white bg-info">
                <div className="card-body">
                    <p>Select an item to view details.</p>
                </div>
            </div>
        );
    }
}

function mapStateToProps(state) {
    return {
        activeItem: state.activeItem,
    }
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({saveItem}, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(ItemDetail);