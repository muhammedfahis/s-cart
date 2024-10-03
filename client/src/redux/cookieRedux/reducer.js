import {
  LOADING,
  GET_COOKIE_USER_VALUES,
  DELETE_COOKIE_USER_VALUES,
} from "./type";

import { deleteCookie, getCookie } from "../../service/service";
const InitialValue = {
  loader: false,
  cookies: "",
};

const cookieReducer = (state = InitialValue, action) => {
  switch (action.type) {
    case LOADING:
      return {
        ...state,
        loader: true,
      };
    case GET_COOKIE_USER_VALUES:
      return {
        ...state,
        loader: false,
        cookies: getCookie(),
      };
    case DELETE_COOKIE_USER_VALUES:
      return {
        ...state,
        loader: false,
        cookies: deleteCookie(),
      };
    default:
      return state;
  }
};

export default cookieReducer;
