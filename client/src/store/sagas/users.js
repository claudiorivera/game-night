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
    const { data } = error.response;
    yield put({ type: "REGISTER_USER_FAILED", payload: data });
  }
}
