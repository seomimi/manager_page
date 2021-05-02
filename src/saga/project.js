import { all, fork, put, takeLatest, call, takeEvery } from "redux-saga/effects";
import axios from "axios";

import {
  LOAD_PROJECT_REQUEST,
  LOAD_PROJECT_SUCCESS,
  LOAD_PROJECT_FAILURE,
  LOAD_PROJECTLIST_REQUEST,
  LOAD_PROJECTLIST_SUCCESS,
  LOAD_PROJECTLIST_FAILURE,
  SELECT_APPLICANT_REQUEST,
  SELECT_APPLICANT_SUCCESS,
  SELECT_APPLICANT_FAILURE,
  CANCEL_APPLICANT_REQUEST,
  CANCEL_APPLICANT_SUCCESS,
  CANCEL_APPLICANT_FAILURE,
  MODAL_REQUEST,
  MODAL_SUCCESS,
  MODAL_FAILURE,
} from "../reducer/project";

function loadProjectAPI(data) {
  return axios.get(`/project`, data);
}

function* loadProject(action) {
  try {
    const result = yield call(loadProjectAPI, action.data);
    yield put({
      type: LOAD_PROJECT_SUCCESS,
      data: result.data,
    });
  } catch (err) {
    console.error(err);
    yield put({
      type: LOAD_PROJECT_FAILURE,
      error: err.response.data,
    });
  }
}
function loadProjectListAPI(data) {
  return axios.get(`/projectRequests`, data);
}

function* loadProjectList(action) {
  try {
    const result = yield call(loadProjectListAPI, action.data);
    yield put({
      type: LOAD_PROJECTLIST_SUCCESS,
      data: result.data,
    });
  } catch (err) {
    console.error(err);
    yield put({
      type: LOAD_PROJECTLIST_FAILURE,
      error: err.response.data,
    });
  }
}

function selectApplicantAPI(id) {
  return axios.patch(`/projectRequests/${id}`, { isChosen: true });
}

function* selectApplicant(action) {
  try {
    const result = yield call(selectApplicantAPI, action.data);
    yield put({
      type: SELECT_APPLICANT_SUCCESS,
      data: result.data,
    });
  } catch (err) {
    console.error(err);
    yield put({
      type: SELECT_APPLICANT_FAILURE,
      error: err.response.data,
    });
  }
}

function cancelApplicantAPI(id) {
  return axios.patch(`/projectRequests/${id}`, { isChosen: false });
}

function* cancelApplicant(action) {
  try {
    const result = yield call(cancelApplicantAPI, action.data);

    yield put({
      type: CANCEL_APPLICANT_SUCCESS,
      data: result.data,
    });
  } catch (err) {
    console.error(err);
    yield put({
      type: CANCEL_APPLICANT_FAILURE,
      error: err.response.data,
    });
  }
}

function loadModalAPI(data) {
  return axios.get(`/brandRequestsHistory?userId=${data}`);
}

function* loadModal(action) {
  try {
    const result = yield call(loadModalAPI, action.data);
    yield put({
      type: MODAL_SUCCESS,
      data: result.data[0],
    });
  } catch (err) {
    console.error(err);
    yield put({
      type: MODAL_FAILURE,
      error: err.response.data,
    });
  }
}

function* watchLoadProject() {
  yield takeLatest(LOAD_PROJECT_REQUEST, loadProject);
}
function* watchLoadProjectList() {
  yield takeLatest(LOAD_PROJECTLIST_REQUEST, loadProjectList);
}
function* watchSelectApplicant() {
  yield takeEvery(SELECT_APPLICANT_REQUEST, selectApplicant);
}
function* watchCancelApplicant() {
  yield takeLatest(CANCEL_APPLICANT_REQUEST, cancelApplicant);
}

function* watchLoadModal() {
  yield takeLatest(MODAL_REQUEST, loadModal);
}
export default function* userSaga() {
  yield all([
    fork(watchLoadProject),
    fork(watchLoadProjectList),
    fork(watchSelectApplicant),
    fork(watchCancelApplicant),
    fork(watchLoadModal),
  ]);
}
