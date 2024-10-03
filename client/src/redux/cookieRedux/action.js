import {
  ERROR_MESSAGE,
  LOADING,
  GET_COOKIE_USER_VALUES,
  DELETE_COOKIE_USER_VALUES,
} from "./type";

export const getCookieDetails = () => {
  return (dispatch) => {
    dispatch(loader());
    dispatch(getCookieUserValues());
  };
};

export const deleteCookieDetails = () => {
  return (dispatch) => {
    dispatch(loader());
    dispatch(deleteCookieUserValues());
  };
};

export const loader = () => {
  return {
    type: LOADING,
  };
};

export const getCookieUserValues = () => {
  return {
    type: GET_COOKIE_USER_VALUES,
  };
};

export const deleteCookieUserValues = () => {
  return {
    type: DELETE_COOKIE_USER_VALUES,
  };
};
