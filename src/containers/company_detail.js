import React, {Component} from 'react';
import {connect} from 'react-redux';
import {saveCompany} from "../actions";
import {bindActionCreators} from "redux";

class CompanyDetail extends Component {
    constructor(props) {
        super(props);

        this.state = {
            url: '',
            name: '',
            business_number: '',
            type: '',
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (this.props.activeCompany.url !== prevState.url) {
            this.setState({url: this.props.activeCompany.url});
            if (this.props.activeCompany.name !== prevState.name&& this.state.name === '') {
                this.setState({name: this.props.activeCompany.name})
            }
            if (this.props.activeCompany.business_number !== prevState.business_number && this.state.business_number === '') {
                this.setState({business_number: this.props.activeCompany.business_number})
            }
            if (this.props.activeCompany.type!== prevState.type && this.state.type === '') {
                this.setState({type: this.props.activeCompany.type})
            }
        }
    }

    handleChange(event) {
        switch (event.target.name) {
            case 'name':
                this.setState({name: event.target.value});
                break;
            case 'business_number':
                this.setState({business_number: event.target.value});
                break;
            case 'type':
                this.setState({type: event.target.value});
                break;
            default:
                break;
        }
    }

    handleSubmit(event) {
        event.preventDefault();
        let companyData = {
            name: this.state.name,
            business_number: this.state.business_number,
            type: this.state.type
        };
        this.props.saveCompany(this.props.activeCompany.uri, companyData);
    }

    render() {
        if (this.props.activeCompany && this.state) {
            return (
                <div className="card text-white bg-info">
                    <h2 className="card-header">{this.props.activeCompany.name}</h2>
                    <div className="card-body">
                        <form onSubmit={this.handleSubmit}>
                            <div className="form-group">
                                <label htmlFor="name">Name:</label>
                                <input name="name" type="text" className="form-control"
                                       value={this.state.name} onChange={this.handleChange}/>
                            </div>
                            <div className="form-group">
                                <label htmlFor="business_number">ABN:</label>
                                <input name="business_number" type="text" className="form-control"
                                       value={this.state.business_number} onChange={this.handleChange}/>
                            </div>
                            <div className="form-group">
                                <label htmlFor="type">Current Quantity:</label>
                                <select name="type" onChange={this.handleChange} value={this.state.type} className="form-control">
                                    <option value="CLIENT">Client</option>
                                    <option value="SUPPLIER">Supplier</option>
                                </select>
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