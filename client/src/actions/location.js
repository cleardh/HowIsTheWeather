import axios from 'axios';
import {
  GET_LOCATIONS,
  GET_LOCATION,
  GET_LATLNG,
  ADD_LOCATION,
  REMOVE_LOCATION,
  LOCATION_ERROR,
  CLEAR_LOCATION,
  CLEAR_WEATHER
} from './types';
import { getWeathers } from './weather';
import { loadUser } from './auth';

// Get all saved locations
export const getSavedLocations = () => async dispatch => {
  dispatch({
    type: CLEAR_LOCATION
  });
  dispatch(loadUser());
  try {
    const res = await axios.get('/api/location');
    dispatch({
      type: GET_LOCATIONS,
      payload: res.data
    });
    dispatch(getWeathers(res.data));
  } catch (err) {
    dispatch({
      type: LOCATION_ERROR,
      payload: {
        msg: err.response.statusText,
        status: err.response.status
      }
    });
  }
};

// Get location by id
export const getLocationById = id => async dispatch => {
  try {
    const res = await axios.get(`/api/location/my/${id}`);
    dispatch({
      type: GET_LOCATION,
      payload: res.data
    });
  } catch (err) {
    dispatch({
      type: LOCATION_ERROR,
      payload: {
        msg: err.response.statusText,
        status: err.response.status
      }
    });
  }
};

// Get location by address
export const getLocationByAddress = address => async dispatch => {
  try {
    const res = await axios.get(`/api/location/${address}`);
    dispatch({
      type: GET_LATLNG,
      payload: res.data
    });
  } catch (err) {
    dispatch({
      type: LOCATION_ERROR,
      payload: {
        msg: err.response.statusText,
        status: err.response.status
      }
    });
  }
};

// Add a location
export const addLocation = (formData, history) => async dispatch => {
  try {
    const config = {
      headers: {
        'Content-Type': 'application/json'
      }
    };

    const res = await axios.post('/api/location', formData, config);

    dispatch({
      type: ADD_LOCATION,
      payload: res.data
    });

    history.push('/weatherlist');
  } catch (err) {
    dispatch({
      type: LOCATION_ERROR,
      payload: {
        msg: err.response.statusText,
        status: err.response.status
      }
    });
  }
};

// Delete a location
export const deleteLocation = id => async dispatch => {
  try {
    const res = await axios.delete(`/api/location/${id}`);
    dispatch({
      type: REMOVE_LOCATION,
      payload: res.data
    });
    dispatch({
      type: CLEAR_WEATHER
    });
  } catch (err) {
    dispatch({
      type: LOCATION_ERROR,
      payload: {
        msg: err.response.statusText,
        status: err.response.status
      }
    });
  }
};
