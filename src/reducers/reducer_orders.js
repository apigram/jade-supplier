import { FETCH_ORDERS, ADD_ORDER, DELETE_ORDER, SAVE_ORDER } from "../actions";

export default function (state = [], action) {
    switch (action.type){
        case FETCH_ORDERS:
            return action.payload.data;
        case ADD_ORDER:
            return [action.payload.data, ...state];
        case SAVE_ORDER:
            return state.map((order) => {
                if (order.url === action.payload.data.url) {
                    return action.payload.data;
                } else {
                    return order;
                }
            });
        case DELETE_ORDER:
            return state.filter((order) => {
                return order.url !== `/api/order/${action.payload.data.id}`;
            });
        default:
            return state;
    }
}