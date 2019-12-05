import {
    SELECTED_USER,
    CLOSE_USER,
    SELECTED_LIST,
    SELECTED_EDIT,
    CLOSE_EDIT,
    MULTI_SELECTED,
    QUIT_MULTISELECT,
    UNSELECT_LIST,
    SELECTED_CARD
} from "../constants/actionTypes";

export default (state = {
    user: [],
    userSelected: false,
    listSelected: "",
    edit: false,
    multiSelected: false,
    card: []

}, action) => {
    switch (action.type) {
        case SELECTED_USER:
            return {
                ...state,
                userSelected: true,
                user: action.value
            }
        case CLOSE_USER:
            return {
                ...state,
                userSelected: false
            }
        case SELECTED_LIST:
            return {
                ...state,
                listSelected: action.value

            }
        case SELECTED_EDIT:
            return {
                ...state,
                user: action.value,
                edit: true,
            }
        case CLOSE_EDIT:
            return {
                ...state,
                edit: false
            }
        case MULTI_SELECTED:
            return {
                ...state,
                multiSelected: true
            }
        case QUIT_MULTISELECT:
            return {
                ...state,
                multiSelected: false
            }
        case UNSELECT_LIST:
            return {
                ...state,
                listSelected: ""
            }
        case SELECTED_CARD:
            return {
                ...state,
                card: action.value
            }
        default:
            return state
    }
}