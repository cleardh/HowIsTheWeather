import React, { Fragment } from 'react';
import spinner from '../img/spinner.gif';

export default () => (
  <Fragment>
    <img
      src={spinner}
      style={{
        width: '200px',
        margin: '25% auto',
        display: 'block'
      }}
      alt='Loading...'
    />
  </Fragment>
);
