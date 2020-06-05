import { takeEvery } from "redux-saga/effects";
import { registerUser, loginUser } from "./user";

function* rootSaga() {
  yield takeEvery("REGISTER_USER_REQUESTED", registerUser);
  yield takeEvery("LOGIN_USER_REQUESTED", loginUser);
}

export default rootSaga;
