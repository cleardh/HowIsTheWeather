import React from 'react';

const Weather = ({
  weather: {
    weather: { icon, description },
    dt,
    name
  }
}) => {
  const url = `http://openweathermap.org/img/wn/${icon}@2x.png`;
  const convertToTimestamp = unix_timestamp => {
    const date = new Date(unix_timestamp * 1000);
    const dateArray = date.toString().split(' ');
    let convertedDatetime = '';
    for (let i = 0; i < 4; i++) {
      convertedDatetime += dateArray[i] + ' ';
    }
    return convertedDatetime;
  };
  const initToUpper = desc => {
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
    <div className='blog-post'>
      <div className='blog-post__img'>
        <img src={url} alt='Weather Icon' />
      </div>
      <div className='blog-post__info'>
        <div className='blog-post__date'>{convertToTimestamp(dt)}</div>
        <h1 className='blog-post__title'>{name}</h1>
        <span className='blog-post__text'>{initToUpper(description)}</span>
      </div>
    </div>
  );
};

export default Weather;
