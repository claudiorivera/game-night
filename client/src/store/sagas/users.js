import { put } from "redux-saga/effects";

export function* registerUser(action) {
  try {
    const user = { _id: 3, name: "Oliver", email: "oliver@oliver.com" };
    yield put({ type: "REGISTER_USER_SUCCESSFUL", user });
  } catch (error) {
    yield put({ type: "REGISTER_USER_FAILED", error });
  }
}

export function* getUsers(action) {
  try {
    const users = [
      { _id: 1, name: "Claudio Rivera", email: "me@claudiorivera.com" },
      { _id: 2, name: "Heather Stoffels", email: "me@heatherstoffels.com" },
    ];
    yield put({ type: "GET_USERS_SUCCESSFUL", users });
  } catch (error) {
    yield put({ type: "GET_USERS_FAILED", error });
  }
}
