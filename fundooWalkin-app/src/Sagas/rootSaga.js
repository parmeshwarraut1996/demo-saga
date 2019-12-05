
import { put, call, all, delay } from "redux-saga/effects";

import { watchLoginuser } from "./loginSaga";
import { watchUsercount, watchgetUser, watchupdateUser, watchUsercountByCity, watchUserchat } from "./dashboardSaga";

export default function* rootSaga() {
    console.log('in root saga')
    yield all([
        watchLoginuser(),
        watchUsercount(),
        watchgetUser(),
        watchupdateUser(),
        watchUsercountByCity(),
        watchUserchat()

    ])
}