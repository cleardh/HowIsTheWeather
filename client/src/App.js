import React, { Fragment } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import PrivateRoute from './components/PrivateRoute';
import Signin from './components/Signin';
import Signup from './components/Signup';
import WeatherList from './components/WeatherList';
import Detail from './components/Detail';
import { Provider } from 'react-redux';
import store from './store';
import './App.css';

const App = () => (
  <Provider store={store}>
    <Router>
      <Fragment>
        <Switch>
          <Route exact path='/' component={Signin} />
          <Route exact path='/signup' component={Signup} />

          <PrivateRoute exact path='/weatherlist' component={WeatherList} />
          <PrivateRoute exact path='/detail/:lat/:lng' component={Detail} />
        </Switch>
      </Fragment>
    </Router>
  </Provider>
);

export default App;
