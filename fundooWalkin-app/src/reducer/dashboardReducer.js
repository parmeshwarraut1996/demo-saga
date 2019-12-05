import {
    GET_COUNT_RESPONSE,
    GET_USER_RESPONSE,
    UPDATE_USER_RESPONSE,
    CLOSE_UPDATE_RESPONSE,
    CLOSE_UPDATE_ERROR,
    UPDATE_ERROR,
    OPEN_CALENDAR,
    CLOSE_CALENDAR,
    UPDATE_LOCATION,
    GET_COUNT_BY_CITY_RESPONSE,
    GET_CHAT,
    GET_CHAT_RESPONSE,
    CLOSE_UPDATED,
    DASHBOARD_NETWORK_ERROR,
    OPEN_LOADING,
    UPDATE_USER_ASYNC,
    CLOSE_UPDATE_LOADING
} from "../constants/actionTypes";




export default (state = {
    responseCount: [],
    user: [],
    updateResponse: [],
    updateStatus: false,
    error: false,
    errorResponse: [],
    calendar: false,
    location: "",
    cityWiseCount: [],
    chats: [],
    userUpdated: false,
    loading: true,
    internetConnection: false,
    networkError: false,
    updateLoading: false




}, action) => {
    switch (action.type) {
        case GET_COUNT_RESPONSE:
            return {
                ...state,
                responseCount: action.payload,
                loading: false,
                networkError: false
            }
        case GET_USER_RESPONSE:
            return {
                ...state,
                user: action.payload,
                loading: false,
                networkError: false
            }
        case UPDATE_USER_ASYNC:
            return {
                ...state,
                updateLoading: true
            }
        case UPDATE_USER_RESPONSE:
            return {
                ...state,
                updateResponse: action.payload,
                updateStatus: true,
                userUpdated: true,
                updateLoading: false

            }
        case CLOSE_UPDATE_RESPONSE:
            return {
                ...state,
                updateStatus: false
            }
        case UPDATE_ERROR:
            return {
                ...state,
                errorResponse: action.payload,
                error: true,
                updateLoading: false

            }
        case CLOSE_UPDATE_ERROR:
            return {
                ...state,
                error: false
            }
        case OPEN_CALENDAR:
            return {
                ...state,
                calendar: true
            }
        case CLOSE_CALENDAR:
            return {
                ...state,
                calendar: false
            }
        case UPDATE_LOCATION:
            return {
                ...state,
                location: action.value
            }
        case GET_COUNT_BY_CITY_RESPONSE:
            return {
                ...state,
                cityWiseCount: action.payload,
                networkError: false
            }
        case GET_CHAT_RESPONSE:
            return {
                ...state,
                chats: action.payload
            }
        case CLOSE_UPDATED:
            return {
                ...state,
                userUpdated: false
            }
        case DASHBOARD_NETWORK_ERROR:
            return {
                ...state,
                networkError: true,
                loading: false,
                updateLoading: false
            }
        case OPEN_LOADING:
            return {
                ...state,
                loading: true,
                networkError: false,

            }
        case CLOSE_UPDATE_LOADING:
            return {
                ...state,
                updateLoading: false

            }
        default:
            return state
    }
}
