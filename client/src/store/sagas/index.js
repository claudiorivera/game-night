import { takeEvery } from "redux-saga/effects";
import { getUsers, registerUser } from "./users";

function* rootSaga() {
  yield takeEvery("GET_USERS_REQUESTED", getUsers);
  yield takeEvery("REGISTER_USER_REQUESTED", registerUser);
}

export default rootSaga;
