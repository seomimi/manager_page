import produce from "../util/produce";

export const initialState = {
  loadProjectLoading: false,
  loadProjectDone: false,
  loadProjectError: null,
  loadProjectListLoading: false,
  loadProjectListDone: false,
  loadProjectListError: null,
  selectApplicantLoading: false,
  selectApplicantDone: false,
  selectApplicantError: null,
  cancelApplicantLoading: false,
  cancelApplicantDone: false,
  cancelApplicantError: null,
  modalLoading: false,
  modalDone: false,
  modalError: null,
  project: null,
  projectRequests: [],
  checkedBoxIdx: [],
  brandHistory: null,
  tapName: "tap1",
};

export const LOAD_PROJECT_REQUEST = "LOAD_PROJECT_REQUEST";
export const LOAD_PROJECT_SUCCESS = "LOAD_PROJECT_SUCCESS";
export const LOAD_PROJECT_FAILURE = "LOAD_PROJECT_FAILURE";

export const LOAD_PROJECTLIST_REQUEST = "LOAD_PROJECTLIST_REQUEST";
export const LOAD_PROJECTLIST_SUCCESS = "LOAD_PROJECTLIST_SUCCESS";
export const LOAD_PROJECTLIST_FAILURE = "LOAD_PROJECTLIST_FAILURE";

export const RESET_CHECK_BOX = "RESET_CHECK_BOX";
export const CHECK_BOX_IDX = "CHECK_BOX_IDX";
export const CHANGE_TAP = "CHANGE_TAP";

export const SELECT_APPLICANT_REQUEST = "SELECT_APPLICANT_REQUEST";
export const SELECT_APPLICANT_SUCCESS = "SELECT_APPLICANT_SUCCESS";
export const SELECT_APPLICANT_FAILURE = "SELECT_APPLICANT_FAILURE";

export const CANCEL_APPLICANT_REQUEST = "CANCEL_APPLICANT_REQUEST";
export const CANCEL_APPLICANT_SUCCESS = "CANCEL_APPLICANT_SUCCESS";
export const CANCEL_APPLICANT_FAILURE = "CANCEL_APPLICANT_FAILURE";

export const MODAL_REQUEST = "MODAL_REQUEST";
export const MODAL_SUCCESS = "MODAL_SUCCESS";
export const MODAL_FAILURE = "MODAL_FAILURE";

const reducer = (state = initialState, action) =>
  produce(state, (draft) => {
    switch (action.type) {
      case LOAD_PROJECT_REQUEST:
        draft.loadProjectLoading = true;
        draft.loadProjectDone = false;
        draft.loadProjectError = null;
        break;
      case LOAD_PROJECT_SUCCESS:
        draft.loadProjectLoading = false;
        draft.loadProjectDone = true;
        draft.loadProjectError = null;
        draft.project = action.data;
        break;
      case LOAD_PROJECT_FAILURE:
        draft.loadProjectLoading = false;
        draft.loadProjectDone = false;
        draft.loadProjectError = action.error;
        break;
      case LOAD_PROJECTLIST_REQUEST:
        draft.loadProjectListLoading = true;
        draft.loadProjectListDone = false;
        draft.loadProjectListError = null;
        break;
      case LOAD_PROJECTLIST_SUCCESS:
        draft.loadProjectListLoading = false;
        draft.loadProjectListDone = true;
        draft.loadProjectListError = null;
        draft.projectRequests = draft.projectRequests.concat(action.data);
        break;
      case LOAD_PROJECTLIST_FAILURE:
        draft.loadProjectListLoading = false;
        draft.loadProjectListDone = false;
        draft.loadProjectListError = action.error;
        break;
      case SELECT_APPLICANT_REQUEST:
        draft.selectApplicantLoading = true;
        draft.selectApplicantError = null;
        draft.selectApplicantDone = false;
        break;
      case SELECT_APPLICANT_SUCCESS:
        draft.projectRequests.find((v) => v.id === action.data.id).isChosen = action.data.isChosen;
        draft.selectApplicantLoading = false;
        draft.selectApplicantDone = true;
        break;
      case SELECT_APPLICANT_FAILURE:
        draft.selectApplicantLoading = false;
        draft.selectApplicantError = action.error;
        break;

      case CANCEL_APPLICANT_REQUEST:
        draft.cancelApplicantLoading = true;
        draft.cancelApplicantError = null;
        draft.cancelApplicantDone = false;
        break;
      case CANCEL_APPLICANT_SUCCESS:
        draft.projectRequests.find((v) => v.id === action.data.id).isChosen = action.data.isChosen;
        draft.cancelApplicantLoading = false;
        draft.cancelApplicantDone = true;
        break;
      case CANCEL_APPLICANT_FAILURE:
        draft.cancelApplicantLoading = false;
        draft.cancelApplicantError = action.error;
        break;

      case MODAL_REQUEST:
        draft.modalLoading = true;
        draft.modalDone = false;
        draft.modalError = null;
        break;
      case MODAL_SUCCESS:
        draft.modalLoading = false;
        draft.modalDone = true;
        draft.modalError = null;
        draft.brandHistory = action.data;
        break;
      case MODAL_FAILURE:
        draft.modalLoading = false;
        draft.modalDone = false;
        draft.modalError = action.error;
        break;
      case CHECK_BOX_IDX:
        draft.checkedBoxIdx.indexOf(action.data) === -1
          ? draft.checkedBoxIdx.push(action.data)
          : (draft.checkedBoxIdx = draft.checkedBoxIdx.filter((v) => v !== action.data));
        break;
      case RESET_CHECK_BOX:
        draft.checkedBoxIdx = [];
        break;
      case CHANGE_TAP:
        draft.tapName = action.data;
        draft.checkedBoxIdx = [];
        break;
      default:
        break;
    }
  });

export default reducer;
