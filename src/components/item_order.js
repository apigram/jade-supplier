import React, {Component} from "react"
import axios from "axios";
import {AUTH_HEADER} from "../actions";

export default class ItemOrder extends Component {
    constructor(props) {
        super(props);

        this.state = {
            'url': props.order.order,
            'received_date': '',
            'quantity': props.order.quantity,
            'unit_price': props.order.unit_price,
            'comments': props.order.comments,
        };

        axios.get(this.state.url, AUTH_HEADER).then((response) => {
            this.setState({received_date: new Date(response.data.received_date).toDateString()})
        });
    }

    render() {
        return (
            <tr key={this.state.url}>
                <td>
                    {this.state.received_date}
                </td>
                <td>
                    {this.state.quantity}
                </td>
                <td>
                    {this.state.unit_price}
                </td>
                <td>
                    {this.state.comments}
                </td>
            </tr>
        )
    }
}