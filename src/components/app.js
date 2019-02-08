import React, { Component } from 'react';
import OrderList from '../containers/order_list';
import OrderDetail from '../containers/order_detail';
import ItemList from '../containers/item_list';
import ItemDetail from '../containers/item_detail';
import CompanyList from '../containers/company_list';
import CompanyDetail from '../containers/company_detail';
import '../App.css';

export default class App extends Component {
  render() {
    return (
      <div className="App">
          <h1>JADE - Supplier Interface</h1>
          <div className="card-deck">
              <OrderList/>
              <OrderDetail/>
          </div>
          <div className="card-deck">
              <ItemList/>
              <ItemDetail/>
          </div>
          <div className="card-deck">
              <CompanyList/>
              <CompanyDetail/>
          </div>
      </div>
    );
  }
}
