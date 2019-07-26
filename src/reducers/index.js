import {combineReducers} from 'redux';
import OrdersReducer from './reducer_orders';
import ActiveOrderReducer from './reducer_active_order';
import ItemsReducer from './reducer_items';
import ActiveItemReducer from './reducer_active_item';
import CompaniesReducer from './reducer_companies';
import ActiveCompanyReducer from './reducer_active_company';
import AuthReducer from './reducer_auth';
import SupplierReducer from './reducer_suppliers'
import ErrorReducer from './reducer_error';
import { reducer as formReducer } from 'redux-form'

const rootReducer = combineReducers({
    orders: OrdersReducer,
    activeOrder: ActiveOrderReducer,
    items: ItemsReducer,
    activeItem: ActiveItemReducer,
    companies: CompaniesReducer,
    activeCompany: ActiveCompanyReducer,
    activeUser: AuthReducer,
    suppliers: SupplierReducer,
    error: ErrorReducer,
    form: formReducer
});

export default rootReducer;