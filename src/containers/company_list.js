import React, {Component} from 'react';
import {fetchCompanies, fetchCompany, deleteCompany} from '../actions';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import CompanySearch from './company_search_bar'
import * as _ from "lodash";

class CompanyList extends Component {
    constructor(props) {
        super(props);
        this.props.fetchCompanies();
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

    render() {
        if (this.props.companies !== null) {
            return (
                <div className="card bg-light text-dark">
                    <h2 className="card-header">Companies</h2>
                    <CompanySearch/>
                    <ul className="list-group list-group-flush">
                        {this.renderList()}
                    </ul>
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
    return bindActionCreators({fetchCompanies, fetchCompany, deleteCompany}, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(CompanyList);