import {ADD_ITEM, DELETE_ITEM, FETCH_ITEMS, SAVE_ITEM} from "../actions";

export default function (state = null, action) {
    switch (action.type){
        case FETCH_ITEMS:
            switch (action.payload.status) {
                case 404:
                    return {error: 'No items found.'};
                case 500:
                    return {error: 'An unknown error has occurred.'};
                default:
                    return null;
            }
        case ADD_ITEM:
            switch (action.payload.status) {
                case 400:
                    return 'Invalid action.';
                case 403:
                    return 'You do not have permission to add items.';
                case 500:
                    return 'An unknown error has occurred.';
                default:
                    return null;
            }
        case SAVE_ITEM:
            switch (action.payload.status) {
                case 404:
                    return 'Item does not exist.';
                case 400:
                    return 'Item is not valid.';
                case 403:
                    return 'You do not have permission to modify items.';
                case 500:
                    return 'An unknown error has occurred.';
                default:
                    return null;
            }
        case DELETE_ITEM:
            switch (action.payload.status) {
                case 404:
                    return 'Item does not exist.';
                case 400:
                    return 'Invalid action.';
                case 403:
                    return 'You do not have permission to delete items.';
                case 500:
                    return 'An unknown error has occurred.';
                default:
                    return null;
            }
        default:
            return state;
    }
}