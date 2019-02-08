import { FETCH_ORDERS, ADD_ORDER, DELETE_ORDER, SAVE_ORDER } from "../actions";

export default function (state = null, action) {
    switch (action.type){
        case FETCH_ORDERS:
            return action.payload.data.orders;
        case ADD_ORDER:
            return [action.payload.data.order, ...state];
        case SAVE_ORDER:
            return state.map((order) => {
                if (order.uri === action.payload.data.order.uri) {
                    return action.payload.data.order;
                } else {
                    return order;
                }
            });
        case DELETE_ORDER:
            return state.filter((order) => {
                return order.uri !== `/api/order/${action.payload.data.id}`;
            });
        default:
            return state;
    }
}