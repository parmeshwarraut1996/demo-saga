import { put, call, all, delay } from "redux-saga/effects";
import { takeEvery } from 'redux-saga/effects';
import axios from 'axios';
import auth from "../controller/userController";
import {
    LOGIN_ASYNC, LOGIN_RESPONSE,
    LOGIN_ERROR, GET_COUNT_ASYNC,
    GET_COUNT_RESPONSE, GET_USER_ASYNC,
    GET_USER_RESPONSE,
    UPDATE_USER_ASYNC
    , UPDATE_USER_RESPONSE,
    UPDATE_USER,
    UPDATE_ERROR,
    GET_COUNT,
    GET_COUNT_BY_CITY_ASYNC,
    GET_COUNT_BY_CITY_RESPONSE,
    GET_COUNT_BY_CITY,
    GET_CHAT_ASYNC,
    GET_CHAT_RESPONSE,
    GET_CHAT,
    GET_USER_ERROR,
    GET_COUNT_ERROR,
    NETWORK_ERROR,
    DASHBOARD_NETWORK_ERROR
} from "../constants/actionTypes";

export function* getcountAsync(action) {
    try {
        // console.log("data i  sag   " + JSON.stringify(action.value))
        yield put({ type: GET_COUNT_ASYNC });

        const response = yield call(count => auth.getCount())
        //    console.log('respone in saga' + JSON.stringify(response));
        //   paneltemplete.prototype.status(response.data.status)
        //   console.log("tetettttetettt..."+paneltemplete.prototype.status)
        // console.log("response in fsaga--" + response.data);


        yield put({ type: GET_COUNT_RESPONSE, payload: response.data })

        yield delay(6000)

        yield put({ type: GET_COUNT });


    }
    catch (error) {
        if (error == "Error: Network Error") {
            console.log("in nertoerk error");
            yield delay(1000)
            yield put({ type: DASHBOARD_NETWORK_ERROR, payload: error })
        }
        else {
            console.log("error in saga--- " + error)
            yield put({ type: GET_COUNT_ERROR, payload: error.response.data })
        }
    }

}
export function* watchUsercount() {
    console.log("in watch function ");
    yield takeEvery('GET_COUNT', getcountAsync);
}

export function* getuserAsync(action) {
    try { // console.log("this,edit A--> " + this.state.Attitude); // console.log("this,edit A--> " + this.state.Attitude);
        // console.log("this,edit c--> " + this.state.Communication);
        // console.log("this,edit k===> " + this.state.Knowledge);
        // console.log("this,edit c--> " + this.state.Communication);
        // console.log("this,edit k===> " + this.state.Knowledge);
        // console.log("data i  sag   " + JSON.stringify(action.value))
        yield put({ type: GET_USER_ASYNC });

        const response = yield call(count => auth.getUser(action.value))
        //    console.log('respone in saga' + JSON.stringify(response));
        //   paneltemplete.prototype.status(response.data.status)
        //   console.log("tetettttetettt..."+paneltemplete.prototype.status)
        // console.log("response in fsaga--" + response);


        yield put({ type: GET_USER_RESPONSE, payload: response.data })




    }
    catch (error) {
        console.log("error in saga user--- " + error)

        if (error == "Error: Network Error") {
            console.log("in nertoerk error");
            yield delay(1000)
            yield put({ type: DASHBOARD_NETWORK_ERROR, payload: error })
        }
        else {
            yield put({ type: GET_USER_ERROR, payload: error.response.data })
        }
    }

}
export function* watchgetUser() {
    console.log("in watch function ");
    yield takeEvery('GET_USER', getuserAsync);
}

export function* updateuserAsync(action) {
    try {
        console.log("data i  sag   " + JSON.stringify(action.value))
        yield put({ type: UPDATE_USER_ASYNC });

        const response = yield call(count => auth.updateUser(action.value))
        //    console.log('respone in saga' + JSON.stringify(response));
        //   paneltemplete.prototype.status(response.data.status)
        //   console.log("tetettttetettt..."+paneltemplete.prototype.status)
        console.log("response in fsaga--" + response.status);
        if (response.status == 200) {
            console.log("response in iff--" + response.status);
            yield put({ type: GET_CHAT })
        }

        yield put({ type: UPDATE_USER_RESPONSE, payload: response })




    }
    catch (error) {
        // console.log("error in saga--- " + error)
        yield put({ type: UPDATE_ERROR, payload: error.response.data })
    }

}
export function* watchupdateUser() {
    console.log("in watch function ");
    yield takeEvery('UPDATE_USER', updateuserAsync);
}
export function* getUserCountByCity() {
    try {
        yield put({ type: GET_COUNT_BY_CITY_ASYNC });
        const response = yield call(count => auth.getCountByCity());
        console.log("count in city saga===>" + response.data);
        yield put({ type: GET_COUNT_BY_CITY_RESPONSE, payload: response.data })
        yield delay(6000);
        yield put({ type: GET_COUNT_BY_CITY })

    } catch (error) {
        if (error == "Error: Network Error") {
            console.log("in nertoerk error");
            yield delay(1000)
            yield put({ type: DASHBOARD_NETWORK_ERROR, payload: error })
        }
        else {
            console.log("error in saga--- " + error)
            yield put({ type: GET_COUNT_ERROR, payload: error.response.data })
        }
    }

}
export function* watchUsercountByCity() {
    console.log("in watch function ");
    yield takeEvery("GET_COUNT_BY_CITY", getUserCountByCity);
}

export function* watchUserchat() {
    console.log("in watch function of chat ");
    yield takeEvery("GET_CHAT", getChat);
}
export function* getChat(action) {
    try {
        console.log("data i  sag   " + JSON.stringify(action.value))
        yield put({ type: GET_CHAT_ASYNC });

        const response = yield call(count => auth.getChat())
        //    console.log('respone in saga' + JSON.stringify(response));
        //   paneltemplete.prototype.status(response.data.status)
        //   console.log("tetettttetettt..."+paneltemplete.prototype.status)
        console.log("response in saga of chat===>" + JSON.stringify(response.data));


        yield put({ type: GET_CHAT_RESPONSE, payload: response })

        yield delay(5000)

        yield put({ type: GET_CHAT })


    }
    catch (error) {
        // console.log("error in saga--- " + error)
        yield put({ type: UPDATE_ERROR, payload: error.response.data })
    }

}