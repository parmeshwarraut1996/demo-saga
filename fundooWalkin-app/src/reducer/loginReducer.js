import {
    LOGIN_USER,
    LOGIN_RESPONSE,
    LOGIN_ERROR,
    CLOSE_ERROR,
    OPEN_LOADING,
    UPDATE_ERROR,
    CLOSE_LOADING,
    NETWORK_ERROR,
    NETWORK_ERROR_CLOSE
} from "../constants/actionTypes";


export default (state = {
    response: [],
    error: [],
    user: [],
    successStatus: false,
    errorStatus: false,
    loading: false,
    networkError: false


}, action) => {
    switch (action.type) {
        case LOGIN_USER:
            return {
                ...state,
                user: action.payload

            }
        case LOGIN_RESPONSE:
            return {

                ...state,
                response: action.payload,
                successStatus: true,
                errorStatus: false,
                loading: false
            }
        case LOGIN_ERROR:
            return {
                ...state,
                error: action.payload,
                success: false,
                errorStatus: true,
                loading: false
            }
        case CLOSE_ERROR:
            return {
                ...state,
                errorStatus: false

            }
        case OPEN_LOADING:
            return {
                ...state,
                loading: true
            }
        case CLOSE_LOADING:
            return {
                ...state,
                loading: false
            }
        case NETWORK_ERROR:
            return {
                ...state,
                networkError: true,
                loading: false
            }
        case NETWORK_ERROR_CLOSE:
            return {
                ...state,
                networkError: false
            }

        default:
            return state


    }
}