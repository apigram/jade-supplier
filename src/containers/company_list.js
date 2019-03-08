import React, {Component} from 'react';
import {fetchCompanies, fetchCompany, deleteCompany} from '../actions';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import CompanySearch from './company_search_bar'

class CompanyList extends Component {
    constructor(props) {
        super(props);
        this.props.fetchCompanies();
    }

    renderList() {
        return this.props.items.map((company) => {
            let listClass = 'list-group-item list-group-item-action';
            if (this.props.activeCompany !== null && company.uri === this.props.activeCompany.uri) {
                listClass = listClass + ' active';
            }
            return (
                <li key={company.uri} className={listClass}>
                    <div className="row">
                        <div className="col-sm-10" onClick={() => {this.props.fetchCompany(company.uri)}}>
                            {company.label}
                        </div>
                        <div className="col-sm-2">
                            <button type="button" className="btn btn-danger" onClick={() => {this.props.deleteCompany(company.uri)}}>Delete</button>
                        </div>
                    </div>
                </li>
            )
        })
    }

    render() {
        return (
            <div className="card bg-light text-dark">
                <h2 className="card-header">Companies</h2>
                <CompanySearch/>
                <ul className="list-group list-group-flush">
                    {this.renderList()}
                </ul>
            </div>
        );
    }
}

function mapStateToProps(state) {
    return {
        items: state.companies,
        activeItem: state.activeCompany,
    }
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({fetchCompanies, fetchCompany, deleteCompany}, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(CompanyList);