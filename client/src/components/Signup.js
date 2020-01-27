import React, { Fragment, useState } from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { register } from '../actions/auth';
import PropTypes from 'prop-types';

const Signup = ({ register, isAuthenticated }) => {
  const [formData, setFormData] = useState({
    username: '',
    password: ''
  });
  const { username, password } = formData;
  const onChange = e =>
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  const onSubmit = e => {
    e.preventDefault();
    register({ username, password });
  };
  if (isAuthenticated) {
    return <Redirect to='/weatherlist' />;
  }
  return (
    <Fragment>
      <div className='signup'>
        <form className='box' onSubmit={e => onSubmit(e)}>
          <h1>Sign up</h1>
          <input
            type='text'
            name='username'
            placeholder='Username'
            value={username}
            onChange={e => onChange(e)}
          />
          <input
            type='password'
            name='password'
            placeholder='Password'
            value={password}
            onChange={e => onChange(e)}
          />
          <input type='submit' name='submit' value='Submit' />
        </form>
      </div>
    </Fragment>
  );
};

Signup.propTypes = {
  register: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool
};

const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated
});

export default connect(mapStateToProps, { register })(Signup);
