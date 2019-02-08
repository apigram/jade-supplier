import React, {Component} from 'react';
import {fetchOrders, fetchOrder, addOrder, saveOrder, deleteOrder} from '../actions';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import ItemSearch from './item_search_bar'

class OrderList extends Component {
    renderList() {
        return this.props.items.map((order) => {
            let listClass = 'list-group-item list-group-item-action';
            if (this.props.activeItem !== null && order.uri === this.props.activeOrder.uri) {
                listClass = listClass + ' active';
            }
            return (
                <li key={order.uri} className={listClass}>
                    <div className="row">
                        <div className="col-sm-10" onClick={() => {this.props.fetchOrder(order.uri)}}>
                            {order.label}
                        </div>
                        <div className="col-sm-2">
                            <button type="button" className="btn btn-danger" onClick={() => {this.deleteOrder(order.uri)}}>Delete</button>
                        </div>
                    </div>
                </li>
            )
        })
    }

    render() {
        return (
            <div className="card bg-light text-dark">
                <h2 className="card-header">Orders</h2>
                <ItemSearch/>
                <ul className="list-group list-group-flush">
                    {this.renderList()}
                </ul>
            </div>
        );
    }
}

function mapStateToProps(state) {
    return {
        items: state.orders,
        activeItem: state.activeOrder,
    }
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({fetchOrders, fetchOrder, addOrder, saveOrder, deleteOrder}, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(OrderList);