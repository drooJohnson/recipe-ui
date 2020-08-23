import React from 'react';
import { Switch, Route, Link } from 'react-router-dom';

import CharacterCreation from './CharacterCreation'

const Root = () => {
  return(
    <Switch>
      <Route path='/character_creation'><CharacterCreation/></Route>
      <Route path='/profile'><div>PROFILE ROUTE</div></Route>
      <Route path='/inventory'><div>INVENTORY ROUTE</div></Route>
      <Route path='/settings'><div>SETTINGS ROUTE</div></Route>
      <Route path='/'><div>HOME ROUTE</div></Route>
    </Switch>
  )
}

export default Root;
