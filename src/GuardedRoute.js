import React, {useState, useEffect} from 'react';
import {Route} from 'react-router-dom';
import auth from './Auth';

function GuardedRoute(props) {
  const { component: Component, path, exact} = props;
  const [idToken, setIdToken] = useState(null);
  useEffect(()=>{
      if(!auth.isAuthenticated()){
        auth.loginToRoute(props.location.pathname);
      }
      if(auth.getIdToken() === undefined){
        auth.silentAuth()
        .then(res => {
          setIdToken(auth.getIdToken());
        })
        .catch(err => console.log(err));
      } else {
        setIdToken(auth.getIdToken());
      }
    },[props.location.pathname]);
  if (!idToken) {
    return "Authenticating..."
  }
  return (
    <Route exact={exact ?? false} path={path} render={(props) => {
      if (!auth.isAuthenticated()) return auth.loginToRoute(props.location.pathname);
      return <Component {...props} />
    }} />
  )
}

export default GuardedRoute;
