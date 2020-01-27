import React, { Fragment, useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, withRouter } from 'react-router-dom';
import {
  getSavedLocations,
  getLocationByAddress,
  addLocation,
  deleteLocation
} from '../actions/location';
import { getWeatherByLatLng, deleteWeather } from '../actions/weather';
import Weather from './Weather';
import Spinner from './Spinner';
import PropTypes from 'prop-types';
import { logout } from '../actions/auth';

const WeatherList = ({
  getSavedLocations,
  getLocationByAddress,
  addLocation,
  getWeatherByLatLng,
  locations,
  loading,
  lat,
  lng,
  weathers,
  history,
  logout,
  deleteWeather,
  deleteLocation
}) => {
  useEffect(() => {
    getSavedLocations();
  }, [getSavedLocations]);

  const [formData, setFormData] = useState({
    address: '',
    latlng: { lat, lng }
  });

  const { address } = formData;

  useEffect(() => {
    getLocationByAddress(address);
    setFormData({
      address,
      latlng: { lat, lng }
    });
  }, [getLocationByAddress, address, lat, lng]);

  const onChange = e => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };
  const onSubmit = async e => {
    e.preventDefault();
    setFormData({
      ...formData,
      address: ''
    });
    getWeatherByLatLng(formData.latlng);
    await addLocation(formData, history);
    getSavedLocations();
  };

  const findLocationId = coord => {
    locations.forEach(location => {
      const { lat, lng } = location.latlng;
      if (
        Math.round(lat * 100) / 100 === coord.lat &&
        Math.round(lng * 100) / 100 === coord.lon
      ) {
        return location._id;
      }
    });
  };

  const remove = async coord => {
    let id = '';
    locations.forEach(location => {
      const { lat, lng } = location.latlng;
      if (
        Math.round(lat * 100) / 100 === coord.lat &&
        Math.round(lng * 100) / 100 === coord.lon
      ) {
        id = location._id;
      }
    });
    // console.log(id);
    await deleteLocation(id);
    getSavedLocations();
  };

  console.log(weathers);
  console.log(locations.length);
  return (
    <Fragment>
      {loading ? (
        <Spinner />
      ) : (
        <Fragment>
          <div className='center'>
            <div className='search'>
              <form onSubmit={e => onSubmit(e)}>
                <input
                  type='text'
                  className='search_text'
                  name='address'
                  value={address}
                  placeholder='Add Address'
                  onChange={e => onChange(e)}
                  autoFocus
                />
                <button type='submit' className='search_btn'>
                  <i className='fas fa-plus'></i>
                </button>
              </form>
            </div>
            <div className='weathers'>
              {weathers.length > 0 &&
                weathers.map((weather, index) => (
                  <Fragment key={weather._id}>
                    <Link
                      className='location_link'
                      to={`/detail/${weather.coord.lat}/${weather.coord.lon}`}
                    >
                      <Weather weather={weather} />
                    </Link>
                    <div
                      onClick={() => remove(weather.coord)}
                      className='remove_weather'
                    >
                      <i className='fas fa-trash'></i>
                    </div>
                  </Fragment>
                ))}
            </div>
          </div>
          <Link to='/' onClick={logout} className='signout'>
            <i className='fas fa-sign-out-alt fa-2x'></i>
          </Link>
        </Fragment>
      )}
    </Fragment>
  );
};

WeatherList.propTypes = {
  getSavedLocations: PropTypes.func.isRequired,
  getLocationByAddress: PropTypes.func.isRequired,
  addLocation: PropTypes.func.isRequired,
  getWeatherByLatLng: PropTypes.func.isRequired,
  locations: PropTypes.array.isRequired,
  loading: PropTypes.bool.isRequired,
  lat: PropTypes.number,
  lng: PropTypes.number,
  weather: PropTypes.object,
  weathers: PropTypes.array,
  logout: PropTypes.func.isRequired,
  deleteWeather: PropTypes.func.isRequired,
  deleteLocation: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  locations: state.location.locations,
  loading: state.location.loading,
  lat: state.location.latlng.lat,
  lng: state.location.latlng.lng,
  weather: state.weather.weather,
  weathers: state.weather.weathers
});

export default connect(mapStateToProps, {
  getSavedLocations,
  getLocationByAddress,
  getWeatherByLatLng,
  addLocation,
  logout,
  deleteLocation,
  deleteWeather
})(withRouter(WeatherList));
