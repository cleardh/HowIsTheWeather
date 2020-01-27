import {
  GET_WEATHERS,
  GET_WEATHER,
  WEATHER_ERROR,
  REMOVE_WEATHER,
  CLEAR_WEATHER
} from '../actions/types';

const initialState = {
  weathers: [],
  weather: null,
  loading: true,
  error: {}
};

export default function(state = initialState, action) {
  const { type, payload } = action;
  switch (type) {
    case GET_WEATHERS:
      return {
        ...state,
        weathers: payload,
        loading: false
      };
    case GET_WEATHER:
      return {
        ...state,
        weather: payload,
        loading: false
      };
    case REMOVE_WEATHER:
      return {
        ...state,
        weathers: payload,
        loading: false
      };
    case WEATHER_ERROR:
      return {
        ...state,
        error: payload,
        loading: false
      };
    case CLEAR_WEATHER:
      return {
        ...state,
        weather: null,
        weathers: [],
        loading: false
      };
    default:
      return state;
  }
}
