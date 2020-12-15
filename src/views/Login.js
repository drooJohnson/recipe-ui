import React from 'react';
import auth from '../Auth';

const Login =  () => {
  return <div onClick={()=>{auth.login()}}>Login</div>
}

export default Login;
