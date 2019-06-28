import React, {Component} from 'react';
import {fetchCompanies, fetchCompany, deleteCompany, addCompany} from '../actions';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import CompanySearch from './company_search_bar'
import * as _ from "lodash";
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

Modal.setAppElement('#container');


class CompanyList extends Component {
    constructor(props) {
        super(props);
        this.props.fetchCompanies();
        this.state = {
            modalIsOpen: false,
            name: '',
            business_number: 0,
            type: ''
        };

        this.openModal = this.openModal.bind(this);
        this.closeModal = this.closeModal.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }

    openModal() {
        this.setState({modalIsOpen: true});
    }

    closeModal() {
        this.setState({modalIsOpen: false});
    }

    handleSubmit(event) {
        event.preventDefault();
        this.props.addCompany({
            name: this.state.name,
            business_number: this.state.business_number,
            type: this.state.type,
            contacts: [{
                first_name: this.state.first_name,
                last_name: this.state.last_name,
                role: this.state.role,
                phone: this.state.phone,
                email: this.state.email,
                address: this.state.address,
            }]
        });
        this.closeModal();
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

    renderList() {
        return this.props.companies.map((company) => {
            let listClass = 'list-group-item list-group-item-action';
            if (this.props.activeCompany !== null && company.url === this.props.activeCompany.url) {
                listClass = listClass + ' active';
            }
            return (
                <li key={company.url} className={listClass}>
                    <div className="row">
                        <div className="col-sm-10" onClick={() => {this.props.fetchCompany(company.url)}}>
                            {company.name} ({_.upperFirst(_.toLower(company.type))})
                        </div>
                        <div className="col-sm-2">
                            <button type="button" className="btn btn-danger" onClick={() => {this.props.deleteCompany(company.url)}}>Delete</button>
                        </div>
                    </div>
                </li>
            )
        })
    }

    renderAddLink() {
        return (
            <div className="card-link">
                <a href="javascript:void(0)" onClick={this.openModal}>Add a new company</a>
                <Modal
                    isOpen={this.state.modalIsOpen}
                    onRequestClose={this.closeModal}
                    style={customStyles}
                    contentLabel="Add Item">
                    <div className="card bg-light text-dark">
                        <div className="card-header">
                            <h2 ref={subtitle => this.subtitle = subtitle}>Add Company</h2>
                        </div>
                        <div className="card-body">
                            <form onSubmit={this.handleSubmit}>
                                <div className="form-name">
                                    <div className="form-group">
                                        <label htmlFor="">Name:</label>
                                        <input name="name" type="text" onChange={this.handleChange}
                                               value={this.state.name} className="form-control"/>
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="business_number">Business Number:</label>
                                        <input name="business_number" type="text" onChange={this.handleChange}
                                               value={this.state.business_number} className="form-control"/>
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="type">Type:</label>
                                        <select name="type" onChange={this.handleChange} value={this.state.type} className="form-control">
                                            <option value="CLIENT">Client</option>
                                            <option value="SUPPLIER">Supplier</option>
                                        </select>
                                    </div>
                                    <label htmlFor="first_name">Contact Name:</label>
                                    <div className="form-group form-row">
                                        <div className="col">
                                            <input name="first_name" onChange={this.handleChange} value={this.state.first_name} type="text" className="form-control" placeholder="First Name"/>
                                        </div>
                                        <div className="col">
                                            <input name="last_name" onChange={this.handleChange} value={this.state.last_name} type="text" className="form-control" placeholder="Last Name"/>
                                        </div>
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="role">Role:</label>
                                        <input name="role" type="text" onChange={this.handleChange}
                                               value={this.state.role} className="form-control"/>
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="phone">Phone:</label>
                                        <input name="phone" type="text" onChange={this.handleChange}
                                               value={this.state.phone} className="form-control"/>
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="email">Email:</label>
                                        <input name="email" type="email" onChange={this.handleChange}
                                               value={this.state.email} className="form-control"/>
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="address">Address:</label>
                                        <input name="address" type="text" onChange={this.handleChange}
                                               value={this.state.address} className="form-control"/>
                                    </div>
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

    render() {
        if (this.props.companies !== null) {
            return (
                <div className="card bg-light text-dark">
                    <h2 className="card-header">Companies</h2>
                    <CompanySearch/>
                    <ul className="list-group list-group-flush">
                        {this.renderList()}
                    </ul>
                    {this.renderAddLink()}
                </div>
            );
        } else {
            return (
                <div className="card bg-light text-dark">
                    <h2 className="card-header">Companies</h2>
                    <CompanySearch/>
                    <p>Loading companies...</p>
                </div>
            )
        }
    }
}

function mapStateToProps(state) {
    return {
        companies: state.companies,
        activeCompany: state.activeCompany,
    }
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({fetchCompanies, fetchCompany, deleteCompany, addCompany}, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(CompanyList);