import { FETCH_COMPANY } from '../actions'

export default function (state = null, action) {
    switch (action.type){
        case FETCH_COMPANY:
            return action.payload.data;
        default:
            return state;
    }
}