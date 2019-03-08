import React, {Component} from 'react';
import {connect} from 'react-redux';
import {saveOrder} from "../actions";
import {bindActionCreators} from "redux";

class ItemDetail extends Component {
    constructor(props) {
        super(props);

        this.state = {
            uri: '',
            total_quantity: '',
            current_quantity: '',
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (this.props.activeItem.uri !== prevState.uri) {
            this.setState({uri: this.props.activeItem.uri});
            if (this.props.activeItem.total_quantity !== prevState.total_quantity && this.state.total_quantity === '') {
                this.setState({total_quantity: this.props.activeItem.total_quantity})
            }
            if (this.props.activeItem.current_quantity !== prevState.current_quantity && this.state.current_quantity === '') {
                this.setState({current_quantity: this.props.activeItem.current_quantity})
            }
            if (this.props.activeItem.time_of_day !== prevState.time_of_day && this.state.time_of_day === '') {
                this.setState({time_of_day: this.props.activeItem.time_of_day})
            }
        }
    }

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

    render() {
        if (this.props.activeItem && this.state) {
            return (
                <div className="card text-white bg-info">
                    <h2 className="card-header">{this.props.activeOrder.name}</h2>
                    <div className="card-body">
                        <form onSubmit={this.handleSubmit}>
                            <div className="form-group">
                                <label htmlFor="label">Label:</label>
                                <input name="label" type="text" className="form-control"
                                       value={this.state.label} onChange={this.handleChange}/>
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
                        <br/>
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

function mapStateToProps(state) {
    return {
        activeItem: state.activeItem,
    }
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({saveOrder}, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(ItemDetail);