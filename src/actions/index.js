import axios from 'axios';

export const JADE_SERVICE_URL = 'http://localhost:8000';
export const FETCH_ITEMS = 'FETCH_ITEMS';
export const FETCH_ITEM = 'FETCH_ITEM';
export const FETCH_ORDERS = 'FETCH_ORDERS';
export const FETCH_ORDER = 'FETCH_ORDER';
export const FETCH_COMPANIES = 'FETCH_COMPANIES';
export const FETCH_COMPANY = 'FETCH_COMPANY';
export const FETCH_SUPPLIERS = 'FETCH_SUPPLIERS';

export const ADD_ITEM = 'ADD_ITEM';
export const SAVE_ITEM = 'SAVE_ITEM';
export const DELETE_ITEM = 'DELETE_ITEM';

export const ADD_ORDER = 'ADD_ORDER';
export const SAVE_ORDER = 'SAVE_ORDER';
export const DELETE_ORDER = 'DELETE_ORDER';

export const ADD_COMPANY = 'ADD_COMPANY';
export const SAVE_COMPANY = 'SAVE_COMPANY';
export const DELETE_COMPANY = 'DELETE_COMPANY';

export const LOGIN = 'LOGIN';

export let AUTH_HEADER = {
    headers: {
        Authorization: ''
    }
};

export function fetchItems(criteria = null) {
    let url = `${JADE_SERVICE_URL}/item/`;
    if (criteria !== null) {
        url = `${url}?name=${criteria}`
    }

    const request = axios.get(url, AUTH_HEADER);

    return {
        type: FETCH_ITEMS,
        payload: request
    }
}

export function fetchItem(item) {
    const url = `${item}`;
    
    const request = axios.get(url, AUTH_HEADER);

    return {
        type: FETCH_ITEM,
        payload: request
    }
}

export function fetchOrders(criteria = null) {
    let url = `${JADE_SERVICE_URL}/order/`;
    if (criteria !== null) {
        url = `${url}?name=${criteria}`
    }
    
    const request = axios.get(url, AUTH_HEADER);

    return {
        type: FETCH_ORDERS,
        payload: request
    }
}

export function fetchOrder(order) {
    const url = `${order}`;
    
    const request = axios.get(url, AUTH_HEADER);

    return {
        type: FETCH_ORDER,
        payload: request
    }
}

export function fetchCompanies(criteria = null) {
    let url = `${JADE_SERVICE_URL}/company/`;
    if (criteria !== null) {
        url = `${url}?name=${criteria}`
    }

    const request = axios.get(url, AUTH_HEADER);

    return {
        type: FETCH_COMPANIES,
        payload: request
    }
}

export function fetchSuppliers() {
    let url = `${JADE_SERVICE_URL}/supplier/`;

    const request = axios.get(url, AUTH_HEADER);

    return {
        type: FETCH_SUPPLIERS,
        payload: request
    }
}

export function fetchCompany(company) {
    const url = `${company}`;
    
    const request = axios.get(url, AUTH_HEADER);

    return {
        type: FETCH_COMPANY,
        payload: request
    }
}

export function addItem(item) {
    const url = `${JADE_SERVICE_URL}/item/`;
    const request = axios.post(url, item, AUTH_HEADER);

    return {
        type: ADD_ITEM,
        payload: request
    }
}

export function addOrder(order) {
    const url = `${JADE_SERVICE_URL}/order/`;
    const request = axios.post(url, order, AUTH_HEADER);

    return {
        type: ADD_ORDER,
        payload: request
    }
}

export function addCompany(company) {
    const url = `${JADE_SERVICE_URL}/company/`;
    const request = axios.post(url, company, AUTH_HEADER);

    return {
        type: ADD_COMPANY,
        payload: request
    }
}

export function saveItem(item_uri, item_data) {
    const url = `${item_uri}`;
    const request = axios.put(url, item_data, AUTH_HEADER);

    return {
        type: SAVE_ITEM,
        payload: request
    };
}

export function saveOrder(order_uri, order_data) {
    const url = `${order_uri}`;
    const request = axios.patch(url, order_data, AUTH_HEADER); // Using PATCH here as we do not want to overwrite all data.

    return {
        type: SAVE_ORDER,
        payload: request
    };
}

export function saveCompany(company_uri, company_data) {
    const url = `${company_uri}`;
    const request = axios.put(url, company_data, AUTH_HEADER);

    return {
        type: SAVE_COMPANY,
        payload: request
    };
}

export function deleteItem(item_uri) {
    const url = `${item_uri}`;
    const request = axios.delete(url, AUTH_HEADER);

    return {
        type: DELETE_ITEM,
        payload: request
    };
}

export function deleteOrder(order_uri) {
    const url = `${order_uri}`;
    const request = axios.delete(url, AUTH_HEADER);

    return {
        type: DELETE_ORDER,
        payload: request
    };
}

export function deleteCompany(company_uri) {
    const url = `${company_uri}`;
    const request = axios.delete(url, AUTH_HEADER);

    return {
        type: DELETE_COMPANY,
        payload: request
    };
}

export function login(user, password) {
    const url = `${JADE_SERVICE_URL}/api-token-auth/`;

    const request = axios.post(url, {
                username: user,
                password
            }
    );

    return {
        type: LOGIN,
        payload: request
    }
}
