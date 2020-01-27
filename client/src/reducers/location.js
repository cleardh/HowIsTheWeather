import {
  GET_LOCATIONS,
  GET_LOCATION,
  GET_LATLNG,
  ADD_LOCATION,
  REMOVE_LOCATION,
  LOCATION_ERROR,
  CLEAR_LOCATION
} from '../actions/types';

const initialState = {
  latlng: {
    lat: 0,
    lng: 0
  },
  location: null,
  locations: [],
  loading: true,
  error: {}
};

export default function(state = initialState, action) {
  const { type, payload } = action;
  switch (type) {
    case GET_LATLNG:
      return {
        ...state,
        latlng: payload,
        loading: false
      };
    case GET_LOCATION:
    case ADD_LOCATION:
      return {
        ...state,
        location: payload,
        loading: false
      };
    case GET_LOCATIONS:
      return {
        ...state,
        locations: payload,
        loading: false
      };
    case LOCATION_ERROR:
      return {
        ...state,
        error: payload,
        loading: false
      };
    case REMOVE_LOCATION:
      return {
        ...state,
        location: null,
        loading: false
      };
    case CLEAR_LOCATION:
      return {
        ...state,
        locations: [],
        loading: false
      };
    default:
      return state;
  }
}
