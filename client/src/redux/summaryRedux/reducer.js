import {
  MINI_LOADER,
  PAGE_LOADER,
  GET_SUMMARY_DATA,
  ERROR_MESSAGE
} from "./type";

const InitialValue = {
  miniLoader: false,
  pageLoader: false,
  summaryData: [],
  error: ""
};

const summaryReducer = (state = InitialValue, action) => {
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
    case GET_SUMMARY_DATA:
      return {
        ...state,
        pageLoader: false,
        miniLoader: false,
        summaryData: action.payload,
        error: "",
      };
    case ERROR_MESSAGE:
      return {
        ...state,
        pageLoader: false,
        miniLoader: false,
        summaryData: [],
        error: action.error,
      };
    default:
      return state;
  }
};

export default summaryReducer;
