import React, {Component} from 'react'
import {fetchOrders} from '../actions/index';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';

class OrderSearch extends Component {
    constructor(props) {
        super(props);
        this.state = {criteria: ''};
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }

    handleSubmit(event) {
        event.preventDefault();
        this.props.fetchOrders(this.state.criteria);
    }

    handleChange(event) {
        this.setState({criteria: event.target.value})
    }

    render() {
        return (
            <div className="card-body">
                <form onSubmit={this.handleSubmit}>
                    <div className="form-group">
                        <input name="criteria"
                               type="search"
                               value={this.state.criteria}
                               onChange={this.handleChange}
                               className="form-control"
                               placeholder="Search for an order..."/>
                    </div>
                </form>
            </div>
        );
    }
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({fetchOrders}, dispatch);
}

export default connect(null, mapDispatchToProps)(OrderSearch);