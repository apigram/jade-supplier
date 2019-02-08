import React, {Component} from 'react';
import {fetchItems, fetchItem} from '../actions';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import ItemSearch from './item_search_bar'

class ItemList extends Component {
    renderList() {
        return this.props.items.map((item) => {
            let listClass = 'list-group-item list-group-item-action';
            if (this.props.activeItem !== null && item.uri === this.props.activeItem.uri) {
                listClass = listClass + ' active';
            }
            return (
                <li key={item.uri} className={listClass}>
                    <div className="row">
                        <div className="col-sm-10" onClick={() => {this.props.fetchItem(item.uri)}}>
                            {item.label}
                        </div>
                        <div className="col-sm-2">
                            <button type="button" className="btn btn-danger" onClick={() => {this.removeItem(item.uri)}}>Delete</button>
                        </div>
                    </div>
                </li>
            )
        })
    }

    render() {
        return (
            <div className="card bg-light text-dark">
                <h2 className="card-header">Items</h2>
                <ItemSearch/>
                <ul className="list-group list-group-flush">
                    {this.renderList()}
                </ul>
            </div>
        );
    }
}

function mapStateToProps(state) {
    return {
        items: state.items,
        activeItem: state.activeItem,
    }
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({fetchItems, fetchItem}, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(ItemList);