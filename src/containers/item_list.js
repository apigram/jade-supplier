import React, {Component} from 'react';
import {fetchItems, fetchItem, addItem, deleteItem} from '../actions';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import ItemSearch from './item_search_bar'
import Modal from 'react-modal';

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

class ItemList extends Component {

    constructor(props) {
        super(props);
        this.props.fetchItems();
        this.state = {
            modalIsOpen: false,
            item_label: '',
            item_quantity: 0,
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
        this.props.addItem({
            label: this.state.item_label,
            quantity: this.state.item_quantity,
        });
        this.closeModal();
    }

    handleChange(event) {
        switch (event.target.name) {
            case 'item_label':
                this.setState({item_label: event.target.value});
                break;
            case 'item_quantity':
                this.setState({item_quantity: event.target.value});
                break;
            default:
                break;
        }
    }

    renderList() {
        return this.props.items.map((item) => {
            let listClass = 'list-group-item list-group-item-action';
            if (this.props.activeItem !== null && item.url === this.props.activeItem.url) {
                listClass = listClass + ' active';
            }
            return (
                <li key={item.url} className={listClass}>
                    <div className="row">
                        <div className="col-sm-10" onClick={() => {this.props.fetchItem(item.url)}}>
                            {item.label}
                        </div>
                        <div className="col-sm-2">
                            <button type="button" className="btn btn-danger" onClick={() => {this.props.deleteItem(item.url)}}>Delete</button>
                        </div>
                    </div>
                </li>
            )
        })
    }

    renderAddLink() {
        return (
            <div className="card-link">
                <a href="javascript:void(0)" onClick={this.openModal}>Add a new item</a>
                <Modal
                    isOpen={this.state.modalIsOpen}
                    onRequestClose={this.closeModal}
                    style={customStyles}
                    contentLabel="Add Item">
                    <div className="card bg-light text-dark">
                        <div className="card-header">
                            <h2 ref={subtitle => this.subtitle = subtitle}>Add Item</h2>
                        </div>
                        <div className="card-body">
                            <form onSubmit={this.handleSubmit}>
                                <div className="form-group">
                                    <label htmlFor="item_label">Label:</label>
                                    <input name="item_label" type="text" onChange={this.handleChange}
                                           value={this.state.item_label} className="form-control"/>
                                    <label htmlFor="item_quantity">Quantity:</label>
                                    <input name="item_quantity" type="text" onChange={this.handleChange}
                                           value={this.state.item_quantity} className="form-control"/>
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
        if (this.props.items !== null) {
            return (
                <div className="card bg-light text-dark">
                    <h2 className="card-header">Items</h2>
                    <ItemSearch/>
                    <ul className="list-group list-group-flush">
                        {this.renderList()}
                    </ul>
                    {this.renderAddLink()}
                </div>
            );
        } else {
            return (
                <div className="card bg-light text-dark">
                    <h2 className="card-header">Items</h2>
                    <ItemSearch/>
                    {this.renderAddLink()}
                </div>
            )
        }
    }
}

function mapStateToProps(state) {
    return {
        items: state.items,
        activeItem: state.activeItem,
        error: state.error
    }
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({fetchItems, fetchItem, addItem, deleteItem}, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(ItemList);