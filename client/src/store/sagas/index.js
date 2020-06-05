import { takeEvery } from "redux-saga/effects";
import { registerUser } from "./users";

function* rootSaga() {
  yield takeEvery("REGISTER_USER_REQUESTED", registerUser);
}

export default rootSaga;
