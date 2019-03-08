import React, {Component} from 'react';
import {fetchOrders, fetchOrder, addOrder, saveOrder, deleteOrder} from '../actions';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import OrderSearch from './order_search_bar'

class OrderList extends Component {
    constructor(props) {
        super(props);
        this.props.fetchOrders();
    }

    renderList() {
        return this.props.orders.map((order) => {
            let listClass = 'list-group-item list-group-item-action';
            if (this.props.activeOrder !== null && order.uri === this.props.activeOrder.uri) {
                listClass = listClass + ' active';
            }
            return (
                <li key={order.uri} className={listClass}>
                    <div className="row">
                        <div className="col-sm-10" onClick={() => {this.props.fetchOrder(order.uri)}}>
                            {order.label}
                        </div>
                        <div className="col-sm-2">
                            <button type="button" className="btn btn-danger" onClick={() => {this.props.deleteOrder(order.uri)}}>Delete</button>
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
                <OrderSearch/>
                <ul className="list-group list-group-flush">
                    {this.renderList()}
                </ul>
            </div>
        );
    }
}

function mapStateToProps(state) {
    return {
        orders: state.orders,
        activeOrder: state.activeOrder,
    }
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({fetchOrders, fetchOrder, addOrder, saveOrder, deleteOrder}, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(OrderList);