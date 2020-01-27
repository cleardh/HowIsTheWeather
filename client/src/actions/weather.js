import axios from 'axios';
import {
  GET_WEATHERS,
  GET_WEATHER,
  WEATHER_ERROR,
  REMOVE_WEATHER,
  CLEAR_WEATHER
} from './types';

// Get weathers
export const getWeathers = locations => async dispatch => {
  try {
    let weathers = [];
    locations.map(async location => {
      const { lat, lng } = location.latlng;
      const res = await axios.get(`/api/weather/${lat}/${lng}`);
      weathers.push(res.data);
      if (weathers.length === locations.length) {
        dispatch({
          type: GET_WEATHERS,
          payload: weathers
        });
      }
    });
  } catch (err) {
    dispatch({
      type: WEATHER_ERROR,
      payload: {
        msg: err.response.statusText,
        status: err.response.status
      }
    });
  }
};

// Get weather by latlng
export const getWeatherByLatLng = latlng => async dispatch => {
  dispatch({
    type: CLEAR_WEATHER
  });

  try {
    const { lat, lng } = latlng;
    const res = await axios.get(`/api/weather/${lat}/${lng}`);
    dispatch({
      type: GET_WEATHER,
      payload: res.data
    });
  } catch (err) {
    dispatch({
      type: WEATHER_ERROR,
      payload: {
        msg: err.response.statusText,
        status: err.response.status
      }
    });
  }
};

// Remove weather from weathers
export const deleteWeather = (weathers, index) => dispatch => {
  try {
    const updatedWeathers = weathers.splice(index, 1);
    console.log('weathers', weathers.length);
    dispatch({
      type: REMOVE_WEATHER,
      payload: weathers
    });
  } catch (err) {
    dispatch({
      type: WEATHER_ERROR,
      payload: {
        msg: err.response.statusText,
        status: err.response.status
      }
    });
  }
};
