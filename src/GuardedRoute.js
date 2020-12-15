import React from 'react';
import {Route} from 'react-router-dom';
import auth from './Auth';

function GuardedRoute(props) {
  const { component: Component, path, exact} = props;
  return (
    <Route exact={exact ?? false} path={path} render={(props) => {
      if (!auth.isAuthenticated()) return auth.login();
      return <Component {...props} />
    }} />
  )
}

export default GuardedRoute;
