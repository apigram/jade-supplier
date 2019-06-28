import React, { Component } from 'react';
import OrderList from './order_list';
import OrderDetail from './order_detail';
import ItemList from './item_list';
import ItemDetail from './item_detail';
import CompanyList from './company_list';
import CompanyDetail from './company_detail';
import LoginForm from './login_form';
import {connect} from 'react-redux';
import '../App.css';

class App extends Component {
  render() {
      if (this.props.activeUser !== null) {
          return (
              <div className="App">
                  <h1>JADE - Supplier Interface</h1>
                  <div className="card-deck">
                      <OrderList type="INCOMING"/>
                      <OrderList type="OUTGOING"/>
                      <OrderDetail/>
                  </div>
                  <br/>
                  <div className="card-deck">
                      <ItemList/>
                      <ItemDetail/>
                  </div>
                  <br/>
                  <div className="card-deck">
                      <CompanyList/>
                      <CompanyDetail/>
                  </div>
              </div>
          );
      } else {
          return (
              <div className="App">
                  <h1>JADE - Supplier Interface</h1>
                  <LoginForm/>
              </div>
          )
      }
  }
}

function mapStateToProps(state) {
    return {
        activeUser: state.activeUser
    }
}

export default connect(mapStateToProps, null)(App);
