import { FETCH_ITEMS, ADD_ITEM, DELETE_ITEM, SAVE_ITEM } from "../actions";

export default function (state = null, action) {
    switch (action.type){
        case FETCH_ITEMS:
            return action.payload.data.items;
        case ADD_ITEM:
            return [action.payload.data.item, ...state];
        case SAVE_ITEM:
            return state.map((item) => {
                if (item.uri === action.payload.data.item.uri) {
                    return action.payload.data.item;
                } else {
                    return item;
                }
            });
        case DELETE_ITEM:
            return state.filter((item) => {
                return item.uri !== `/api/item/${action.payload.data.id}`;
            });
        default:
            return state;
    }
}