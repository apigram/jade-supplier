import { FETCH_COMPANIES, ADD_COMPANY, DELETE_COMPANY, SAVE_COMPANY } from "../actions";

export default function (state = [], action) {
    switch (action.type){
        case FETCH_COMPANIES:
            return action.payload.data.companies;
        case ADD_COMPANY:
            return [action.payload.data.company, ...state];
        case SAVE_COMPANY:
            return state.map((company) => {
                if (company.uri === action.payload.data.company.uri) {
                    return action.payload.data.company;
                } else {
                    return company;
                }
            });
        case DELETE_COMPANY:
            return state.filter((company) => {
                return company.uri !== `/api/company/${action.payload.data.id}`;
            });
        default:
            return state;
    }
}