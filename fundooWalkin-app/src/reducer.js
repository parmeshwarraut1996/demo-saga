import { combineReducers } from 'redux';

import searchReducer from '../src/reducer/searchReducer';
import loginReducer from './reducer/loginReducer';
import dashboardReducer from './reducer/dashboardReducer'
export default combineReducers({

    searchReducer,
    loginReducer,
    dashboardReducer
})