import { combineReducers } from 'redux';
import auth from './auth';
import location from './location';
import weather from './weather';

export default combineReducers({
  auth,
  location,
  weather
});
