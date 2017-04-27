import React from 'react';
import { Router, browserHistory, Redirect } from 'react-router';
// Import App
import App from './components/App';
import Home from './pages/home/';

require('es6-promise').polyfill();

function loadRoute(cb) {
  return module => cb(null, module.default);
}

function errorLoading(err) {
  console.error('Dynamic page loading failed', err);
}

const componentRoutes = {
  component: App,
  path: '/',
  indexRoute: { component: Home },
  childRoutes: [
    {
      path: 'loginController',
      getComponent(location, cb) {
        System.import('./components/Login/loginController')
          .then(loadRoute(cb)).catch(errorLoading);
      },
    }, {
      path: 'dashboard',
      getComponent(location, cb) {
        System.import('./pages/Dashboard')
          .then(loadRoute(cb)).catch(errorLoading);
      },
    }, {
      path: 'event',
      childRoutes: [
        {
          path: 'new',
          getComponent(location, cb) {
            System.import('./pages/NewEvent/')
              .then(loadRoute(cb)).catch(errorLoading);
          },
        }, {
          path: ':uid',
          getComponent(location, cb) {
            System.import('./pages/EventDetails/EventDetails')
              .then(loadRoute(cb)).catch(errorLoading);
          },
        },
      ],
    },
  ],
};

const Routes = () => {
  return (
    <Router history={browserHistory} routes={componentRoutes}>
      <Redirect from="*" to="/" />
    </Router>
  );
};

export default Routes;
