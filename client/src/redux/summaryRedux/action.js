import {
  ERROR_MESSAGE,
  GET_SUMMARY_DATA,
  MINI_LOADER,
  PAGE_LOADER,
} from "./type";
import axios from "axios";
import { alerterror, alertsuccess, alertinfo } from "../../components/Alert";

export const getSummaryData = (loader) => {
  return (dispatch) => {
    dispatch(pageLoader());
    axios
      .get(`${process.env.REACT_APP_ENDPOINT}/summary`)
      .then((response) => {
        let summaryData = (response?.data?.code === 200 && response?.data?.data) ? response?.data?.data : [];
        dispatch(getSummaryResponse(summaryData));
      })
      .catch((err) => {
        console.log(err.message);
        alerterror("Invalid Request!! Please try again after sometime..");
        dispatch(getAPIErrorResponse(err.message));
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

export const getSummaryResponse = (response) => {
  return {
    type: GET_SUMMARY_DATA,
    payload: response,
  };
};

export const getAPIErrorResponse = (response) => {
  return {
    type: ERROR_MESSAGE,
    payload: response,
  };
};
