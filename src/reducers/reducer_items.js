import { FETCH_ITEMS, ADD_ITEM, DELETE_ITEM, SAVE_ITEM } from "../actions";

export default function (state = [], action) {
    switch (action.type){
        case FETCH_ITEMS:
            if (action.payload.status === 200) {
                return action.payload.data;
            } else {
                return state;
            }
        case ADD_ITEM:
            if (action.payload.status === 201) {
                return [action.payload.data.item, ...state];
            } else {
                return state;
            }
        case SAVE_ITEM:
            if (action.payload.status === 200) {
                return state.map((item) => {
                    if (item.uri === action.payload.data.item.uri) {
                        return action.payload.data.item;
                    } else {
                        return item;
                    }
                });
            } else {
                return state;
            }
        case DELETE_ITEM:
            if (action.payload.status === 200) {
                return state.filter((item) => {
                    return item.uri !== `/api/item/${action.payload.data.id}`;
                });
            } else {
                return state;
            }
        default:
            return state;
    }
}