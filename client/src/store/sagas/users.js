import { put } from "redux-saga/effects";

const axios = require("axios").default;

export function* registerUser(action) {
  try {
    const { data: user } = yield axios.post(
      "/api/users/register",
      action.payload
    );
    yield put({ type: "REGISTER_USER_SUCCESSFUL", payload: user });
  } catch (error) {
    yield put({ type: "REGISTER_USER_FAILED", payload: error });
  }
}

export function* getUsers(action) {
  try {
    const { data: users } = yield axios.get("/api/users");
    yield put({ type: "GET_USERS_SUCCESSFUL", payload: users });
  } catch (error) {
    console.log(error);

    yield put({ type: "GET_USERS_FAILED", payload: error });
  }
}
