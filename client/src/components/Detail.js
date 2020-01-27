import React, { useEffect, Fragment } from 'react';
import { getWeatherByLatLng } from '../actions/weather';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Spinner from './Spinner';

const Detail = ({ match, getWeatherByLatLng, weather }) => {
  const latlng = {
    lat: match.params.lat,
    lng: match.params.lng
  };
  useEffect(() => {
    getWeatherByLatLng(latlng);
  }, []);

  const toCelsius = temperature => {
    return (temperature - 273.15).toFixed(0);
  };

  const getUrl = icon => {
    return `http://openweathermap.org/img/wn/${icon}@2x.png`;
  };

  const toPascal = desc => {
    let output = '';
    desc.split(' ').forEach(element => {
      output +=
        element.substring(0, 1).toUpperCase() +
        element.substring(1).toLowerCase() +
        ' ';
    });
    return output;
  };

  return (
    <Fragment>
      {weather === null || weather === undefined ? (
        <Spinner />
      ) : (
        <div className='cardBox'>
          <img
            src={getUrl(weather.weather.icon)}
            className='cardBox-img'
            alt='Weather Icon'
          />
          <h1>{weather.name}</h1>
          <h3>{toPascal(weather.weather.description)}</h3>
          <h3>
            {toCelsius(weather.main.temp)}&nbsp;&deg;C{' '}
            <small>
              (feels like {toCelsius(weather.main.feels_like)}
              &nbsp;&deg;C)
            </small>
          </h3>
          <h3>{weather.main.pressure}&nbsp;hPa</h3>
          <h3>{weather.main.humidity}&nbsp;%</h3>
        </div>
      )}
    </Fragment>
  );
};

Detail.propTypes = {
  weather: PropTypes.object
  // description: PropTypes.string,
  // icon: PropTypes.string,
  // temp: PropTypes.number,
  // feels_like: PropTypes.number,
  // pressure: PropTypes.number,
  // humidity: PropTypes.number,
  // dt: PropTypes.number,
  // name: PropTypes.string,
  // l_loading: PropTypes.bool.isRequired,
  // w_loading: PropTypes.bool.isRequired
};

const mapStateToProps = state => ({
  weather: state.weather.weather
  // description: state.weather.weather.description,
  // icon: state.weather.weather.icon,
  // temp: state.weather.main.temp,
  // feels_like: state.weather.main.feels_like,
  // pressure: state.weather.main.pressure,
  // humidity: state.weather.main.humidity,
  // dt: state.weather.dt,
  // name: state.weather.name,
  // l_loading: state.location.loading,
  // w_loading: state.weather.loading
});

export default connect(mapStateToProps, {
  getWeatherByLatLng
})(Detail);
