import { all, fork } from "redux-saga/effects";
import axios from "axios";
import projectSaga from "./project";

axios.defaults.baseURL = "http://localhost:9000";

export default function* rootSaga() {
  yield all([fork(projectSaga)]);
}
