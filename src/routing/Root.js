import React from 'react';
import { Switch, Route, Link } from 'react-router-dom';
import AdminRoutes from './Admin';
import MapGame from 'views/scenes/MapGame';

const Root = () => {
  return(
    <Switch>
      <Route path='/profile'><div>PROFILE ROUTE</div></Route>
      <Route path='/inventory'><div>INVENTORY ROUTE</div></Route>
      <Route path='/settings'><div>SETTINGS ROUTE</div></Route>
      <Route path='/admin'><AdminRoutes/></Route>
      <Route path='/'>
        <MapGame/>
      </Route>
    </Switch>
  )
}

export default Root;
