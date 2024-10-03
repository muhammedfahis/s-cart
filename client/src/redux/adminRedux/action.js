import {
  ERROR_MESSAGE,
  GET_USER_MANAGEMENT_DATA,
  MINI_LOADER,
  PAGE_LOADER,
} from "./type";
import axios from "axios";
import { alerterror, alertsuccess } from "../../components/Alert";

export const getUserManagementData = (loader) => {
  return (dispatch) => {
    dispatch(loader === MINI_LOADER ? miniLoader() : pageLoader());
    axios
      .get(`${process.env.REACT_APP_ENDPOINT}/getAll`)
      .then((response) => {
        let userManagementData = (response?.data?.code === 200 && response?.data?.data) ? response?.data?.data : [];
        dispatch(getUserManagementResponse(userManagementData));
      })
      .catch((err) => {
        console.log(err.message);
        alerterror("Invalid Request!! Please try again after sometime..");
        dispatch(getAPIErrorResponse(err.message));
      });
  };
};

export const createUserManagementData = (payload) => {
  return (dispatch) => {
    dispatch(miniLoader());
    axios
      .post(`${process.env.REACT_APP_ENDPOINT}/createUser`, payload)
      .then((response) => {
        alertsuccess("Created Successfully!");
        dispatch(getUserManagementData(MINI_LOADER));
      })
      .catch((err) => {
        console.log(err.message);
        alerterror("Invalid Request!! Please try again after sometime..");
        dispatch(getAPIErrorResponse(err.message));
        dispatch(getUserManagementData(MINI_LOADER));
      });
  };
};

export const updateUserManagementData = (payload) => {
  return (dispatch) => {
    dispatch(miniLoader());
    axios
      .put(`${process.env.REACT_APP_ENDPOINT}/updateUser`, payload)
      .then((response) => {
        dispatch(getUserManagementData(MINI_LOADER));
        alertsuccess("Updated Successfully!");
      })
      .catch((err) => {
        console.log(err.message);
        alerterror("Invalid Request!! Please try again after sometime..");
        dispatch(getAPIErrorResponse(err.message));
        dispatch(getUserManagementData(MINI_LOADER));
      });
  };
};

export const deleteUserManagementData = (payload) => {
  return (dispatch) => {
    dispatch(miniLoader());
    axios
      .delete(`${process.env.REACT_APP_ENDPOINT}/deleteUser`, { data: payload })
      .then((response) => {
        dispatch(getUserManagementData(MINI_LOADER));
        alertsuccess("Deleted Successfully!");
      })
      .catch((err) => {
        console.log(err.message);
        alerterror("Invalid Request!! Please try again after sometime..");
        dispatch(getAPIErrorResponse(err.message));
        dispatch(getUserManagementData(MINI_LOADER));
      });
  };
};

export const pageLoader = () => {
  return {
    type: PAGE_LOADER,
  };
};

export const miniLoader = () => {
  return {
    type: MINI_LOADER,
  };
};

export const getUserManagementResponse = (response) => {
  return {
    type: GET_USER_MANAGEMENT_DATA,
    payload: response,
  };
};

export const getAPIErrorResponse = (response) => {
  return {
    type: ERROR_MESSAGE,
    payload: response,
  };
};
