import React from 'react';
import { Switch, Route, Link } from 'react-router-dom';
import Game from 'views/scenes/Game';

const Root = () => {
  return(
    <Switch>=
      <Route path='/profile'><div>PROFILE ROUTE</div></Route>
      <Route path='/inventory'><div>INVENTORY ROUTE</div></Route>
      <Route path='/settings'><div>SETTINGS ROUTE</div></Route>
      <Route path='/'>
        <Game/>
      </Route>
    </Switch>
  )
}

export default Root;
