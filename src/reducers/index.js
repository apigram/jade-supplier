import {combineReducers} from 'redux';
import OrdersReducer from './reducer_orders';
import ActiveOrderReducer from './reducer_active_order';
import ItemsReducer from './reducer_items';
import ActiveItemReducer from './reducer_active_item';
import CompaniesReducer from './reducer_companies';
import ActiveCompanyReducer from './reducer_active_company';
//import AuthReducer from './reducer_auth';

const rootReducer = combineReducers({
    orders: OrdersReducer,
    activeOrder: ActiveOrderReducer,
    items: ItemsReducer,
    activeItem: ActiveItemReducer,
    companies: CompaniesReducer,
    activeCompany: ActiveCompanyReducer
    //activeUser: AuthReducer
});

export default rootReducer;