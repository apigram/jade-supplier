import React, {Component} from 'react';
import {connect} from 'react-redux';
import {AUTH_HEADER, saveOrder} from "../actions";
import {bindActionCreators} from "redux";
import OrderItem from "../components/order_item";
import axios from "axios";

class OrderDetail extends Component {
    constructor(props) {
        super(props);

        this.state = {
            url: '',
            total_quantity: '',
            current_quantity: '',
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    /*componentDidUpdate(prevProps, prevState, snapshot) {
        if (this.props.activeOrder.url !== prevState.url) {
            this.setState({url: this.props.activeOrder.url});
            if (this.props.activeOrder.total_quantity !== prevState.total_quantity && this.state.total_quantity === '') {
                this.setState({total_quantity: this.props.activeOrder.total_quantity})
            }
            if (this.props.activeOrder.current_quantity !== prevState.current_quantity && this.state.current_quantity === '') {
                this.setState({current_quantity: this.props.activeOrder.current_quantity})
            }
            if (this.props.activeOrder.time_of_day !== prevState.time_of_day && this.state.time_of_day === '') {
                this.setState({time_of_day: this.props.activeOrder.time_of_day})
            }
        }
    }*/

    handleChange(event) {
        switch (event.target.name) {
            case 'total_quantity':
                this.setState({total_quantity: event.target.value});
                break;
            case 'current_quantity':
                this.setState({current_quantity: event.target.value});
                break;
            case 'time_of_day':
                this.setState({time_of_day: event.target.value});
                break;
            default:
                break;
        }
    }

    handleSubmit(event) {
        event.preventDefault();
        let itemData = {
            total_quantity: this.state.total_quantity,
            current_quantity: this.state.current_quantity,
            time_of_day: this.state.time_of_day
        };
        this.props.saveOrder(this.props.activeOrder.uri, itemData);
    }

    renderCompanyOptions() {
        return this.props.companies.map((company) => {
            return (
                <option key={company.url} value={company.url} selected={this.state.client === company.url}>{company.name}</option>
            )
        });
    }

    renderOrderedItems() {

        return this.props.activeOrder.items.map((item) => {
            return (
                <OrderItem item={item}/>
            )
        })
    }

    render() {
        if (this.props.activeOrder && this.state) {
            let received_date = new Date(this.props.activeOrder.received_date).toDateString();
            let scheduled_date = this.props.activeOrder.scheduled_deliver_date !== null ? new Date(this.props.activeOrder.scheduled_deliver_date).toDateString() : 'Not scheduled';
            let delivered_date = this.props.activeOrder.delivered_date !== null ? new Date(this.props.activeOrder.delivered_date).toDateString() : 'Pending';
            return (
                <div className="card text-white bg-info">
                    <h2 className="card-header">Order {received_date}</h2>
                    <div className="card-body">
                        Received date: {received_date}
                        <br/>
                        Scheduled delivery date: {scheduled_date}
                        <br/>
                        Delivered on: {delivered_date}
                        <br/>
                        Current status: {this.props.activeOrder.status}
                        <br/>
                        Items:
                        <table className="table">
                            <thead>
                                <tr>
                                    <th>Item Label</th>
                                    <th>Quantity</th>
                                    <th>Unit Price</th>
                                    <th>Comments</th>
                                </tr>
                            </thead>
                            <tbody>
                                {this.renderOrderedItems()}
                            </tbody>
                        </table>
                    </div>
                </div>
            )
        }
        return (
            <div className="card text-white bg-info">
                <div className="card-body">
                    <p>Select an order to view details.</p>
                </div>
            </div>
        );
    }
}

/*
<form onSubmit={this.handleSubmit}>
                            <div className="form-group">
                                <label htmlFor="label">Client</label>
                                <input name="label" type="text" className="form-control"
                                       value={this.state.client} onChange={this.handleChange}/>
                                <select className="form-control" name="client">
                                    {this.renderCompanyOptions()}
                                </select>
                            </div>
                            <div className="form-group">
                                <label htmlFor="total_quantity">Total Quantity:</label>
                                <input name="total_quantity" type="text" className="form-control"
                                       value={this.state.total_quantity} onChange={this.handleChange}/>
                            </div>
                            <div className="form-group">
                                <label htmlFor="current_quantity">Current Quantity:</label>
                                <input name="current_quantity" type="text" className="form-control"
                                       value={this.state.current_quantity} onChange={this.handleChange}/>
                            </div>
                            <button className="btn btn-primary" type="submit">Save</button>
                        </form>
 */

function mapStateToProps(state) {
    return {
        activeOrder: state.activeOrder,
        companies: state.companies
    }
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({saveOrder}, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(OrderDetail);