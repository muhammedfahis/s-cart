import {
  MINI_LOADER,
  PAGE_LOADER,
  GET_USER_MANAGEMENT_DATA,
  ERROR_MESSAGE
} from "./type";

const InitialValue = {
  miniLoader: false,
  pageLoader: false,
  userManagementData: [],
  error: ""
};

const adminReducer = (state = InitialValue, action) => {
  switch (action.type) {
    case MINI_LOADER:
      return {
        ...state,
        miniLoader: true,
        pageLoader: false,
        error: "",
      };
    case PAGE_LOADER:
      return {
        ...state,
        pageLoader: true,
        miniLoader: false,
        error: "",
      };
    case GET_USER_MANAGEMENT_DATA:
      return {
        ...state,
        pageLoader: false,
        miniLoader: false,
        userManagementData: action.payload,
        error: "",
      };
    case ERROR_MESSAGE:
      return {
        ...state,
        pageLoader: false,
        miniLoader: false,
        userManagementData: [],
        error: action.error,
      };
    default:
      return state;
  }
};

export default adminReducer;
