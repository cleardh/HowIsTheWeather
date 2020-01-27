import React, { Fragment, useState } from 'react';
import { Link, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { login } from '../actions/auth';

const Signin = ({ login, isAuthenticated }) => {
  const [formData, setFormData] = useState({
    username: '',
    password: ''
  });
  const { username, password } = formData;
  const onChange = e =>
    setFormData({ ...formData, [e.target.name]: e.target.value });
  const onSubmit = async e => {
    e.preventDefault();
    login(username, password);
  };
  if (isAuthenticated) {
    return <Redirect to='/weatherlist' />;
  }

  return (
    <Fragment>
      <div className='signin'>
        <form className='box' onSubmit={e => onSubmit(e)}>
          <h1>Sign in</h1>
          <input
            type='text'
            name='username'
            placeholder='Username'
            value={username}
            onChange={e => onChange(e)}
            autoFocus
          />
          <input
            type='password'
            name='password'
            placeholder='Password'
            value={password}
            onChange={e => onChange(e)}
          />
          <input type='submit' name='btnLogin' value='Login' />
          <p className='small'>
            <small>
              Click here to&nbsp;
              <Link to='/signup'>sign up</Link>
            </small>
          </p>
        </form>
      </div>
    </Fragment>
  );
};

Signin.propTypes = {
  login: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool
};

const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated
});

export default connect(mapStateToProps, { login })(Signin);
