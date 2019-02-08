import React, {Component} from 'react';
import {connect} from 'react-redux';
import {saveCompany} from "../actions";
import {bindActionCreators} from "redux";

class CompanyDetail extends Component {
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
        if (this.props.activeCompany.uri !== prevState.uri) {
            this.setState({uri: this.props.activeCompany.uri});
            if (this.props.activeCompany.total_quantity !== prevState.total_quantity && this.state.total_quantity === '') {
                this.setState({total_quantity: this.props.activeCompany.total_quantity})
            }
            if (this.props.activeCompany.current_quantity !== prevState.current_quantity && this.state.current_quantity === '') {
                this.setState({current_quantity: this.props.activeCompany.current_quantity})
            }
            if (this.props.activeCompany.time_of_day !== prevState.time_of_day && this.state.time_of_day === '') {
                this.setState({time_of_day: this.props.activeCompany.time_of_day})
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
        let companyData = {
            total_quantity: this.state.total_quantity,
            current_quantity: this.state.current_quantity,
            time_of_day: this.state.time_of_day
        };
        this.props.saveCompany(this.props.activeCompany.uri, companyData);
    }

    render() {
        if (this.props.activeCompany && this.state) {
            return (
                <div className="card text-white bg-info">
                    <h2 className="card-header">{this.props.activeItem.name}</h2>
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
                    <p>Select a company to view details.</p>
                </div>
            </div>
        );
    }
}

function mapStateToProps(state) {
    return {
        activeCompany: state.activeCompany,
    }
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({saveCompany}, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(CompanyDetail);