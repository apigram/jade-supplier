import { FETCH_ORDER } from '../actions/index'

export default function (state = null, action) {
    switch (action.type){
        case FETCH_ORDER:
            return action.payload.data.order;
        default:
            return state;
    }
}