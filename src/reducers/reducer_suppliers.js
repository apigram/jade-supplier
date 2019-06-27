import { FETCH_SUPPLIERS } from "../actions";

export default function (state = [], action) {
    switch (action.type){
        case FETCH_SUPPLIERS:
            return action.payload.data;
        default:
            return state;
    }
}