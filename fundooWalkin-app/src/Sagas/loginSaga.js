import { put, call, all, delay } from "redux-saga/effects";
import { takeEvery } from 'redux-saga/effects';
import axios from 'axios';
import auth from "../controller/userController";
import { LOGIN_ASYNC, LOGIN_RESPONSE, LOGIN_ERROR, NETWORK_ERROR } from "../constants/actionTypes";

export function* loginAsync(action) {
    try {
        // console.log("data i  sag   " + JSON.stringify(action.value))
        yield put({ type: LOGIN_ASYNC });

        const response = yield call(login => auth.login(action.value))
        //     console.log('respone in saga' + JSON.stringify(response));
        //   paneltemplete.prototype.status(response.data.status)
        //   console.log("tetettttetettt..."+paneltemplete.prototype.status)
        // console.log("response in fsaga--" + response);

        yield delay(2000)
        yield put({ type: LOGIN_RESPONSE, payload: response })




    }
    catch (error) {
        console.log("error in saga--- " + error)
        if (error == "Error: Network Error") {
            console.log("in nertoerk error");
            
            yield put({ type: NETWORK_ERROR, payload: error })
        }
        else {
            console.log("in lofin error saga error"+error.response.data);
            yield put({ type: LOGIN_ERROR, payload: error.response.data })
        }
    }

}
export function* watchLoginuser() {
    console.log("in watch function ");
    yield takeEvery('LOGIN_USER', loginAsync);
}