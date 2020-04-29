import {
  POST_EVENT,
  LOADING_DATA,
  SET_EVENTS,
  SET_EVENT,
  DELETE_EVENT,
} from "../types";

const initialState = {
  events: [],
  event: {},
  loading: false,
};

export default function (state = initialState, action) {
  switch (action.type) {
    case LOADING_DATA:
      return {
        ...state,
        loading: true,
      };
    case SET_EVENTS:
      return {
        ...state,
        events: action.payload,
        loading: false,
      };
    case SET_EVENT:
      return {
        ...state,
        event: action.payload,
      };
    case DELETE_EVENT:
      const index = state.events.findIndex(
        (event) => event.eventId === action.payload
      );
      state.events.splice(index, 1);
      return {
        ...state,
      };
    case POST_EVENT:
      return {
        ...state,
        events: [action.payload, ...state.events],
      };
    default:
      return state;
  }
}
