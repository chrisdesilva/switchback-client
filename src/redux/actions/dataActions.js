import {
  POST_EVENT,
  LOADING_UI,
  CLEAR_ERRORS,
  SET_ERRORS,
  LOADING_DATA,
  SET_EVENTS,
  SET_EVENT,
  STOP_LOADING_UI,
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

export const getEvent = (eventId) => (dispatch) => {
  dispatch({ type: LOADING_UI });
  axios
    .get(`/event/${eventId}`)
    .then((res) => {
      dispatch({ type: SET_EVENT, payload: res.data });
      dispatch({ type: STOP_LOADING_UI });
    })
    .catch((err) => console.log(err));
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
