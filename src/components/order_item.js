import React, {Component} from "react"
import axios from "axios";
import {AUTH_HEADER} from "../actions";

export default class OrderItem extends Component {
    constructor(props) {
        super(props);

        this.state = {
            'url': props.item.item,
            'label': '',
            'quantity': props.item.quantity,
            'unit_price': props.item.unit_price,
            'comments': props.item.comments,
        };

        axios.get(this.state.url, AUTH_HEADER).then((response) => {
            this.setState({label: response.data.label})
        });
    }

    render() {
        return (
            <tr key={this.state.url}>
                <td>
                    {this.state.label !== null ? this.state.label : 'Loading...'}
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