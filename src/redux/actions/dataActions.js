import {
  POST_EVENT,
  LOADING_UI,
  CLEAR_ERRORS,
  SET_ERRORS,
  LOADING_DATA,
  SET_EVENTS,
} from "../types";
import axios from "axios";

export const getEvents = () => (dispatch) => {
  dispatch({ type: LOADING_DATA });
  axios
    .get("/events")
    .then((res) => {
      dispatch({ type: SET_EVENTS, payload: res.data });
    })
    .catch((err) => {
      dispatch({
        type: SET_EVENTS,
        payload: [],
      });
    });
};

export const postEvent = (eventData) => (dispatch) => {
  dispatch({ type: LOADING_UI });
  axios
    .post("/event", eventData)
    .then((res) => {
      dispatch({ type: POST_EVENT, payload: res.data });
      dispatch(clearErrors());
    })
    .catch((err) => {
      dispatch({ type: SET_ERRORS, payload: err.response.data });
    });
};

export const clearErrors = () => (dispatch) => {
  dispatch({ type: CLEAR_ERRORS });
};
