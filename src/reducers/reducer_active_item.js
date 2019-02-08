import { FETCH_ITEM } from '../actions'

export default function (state = null, action) {
    switch (action.type){
        case FETCH_ITEM:
            return action.payload.data.item;
        default:
            return state;
    }
}