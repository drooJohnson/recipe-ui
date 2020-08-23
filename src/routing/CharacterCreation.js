import React from 'react';
import { Switch, Route, useRouteMatch } from 'react-router-dom';

import Intro from 'views/character_creation/Intro'
import Name from 'views/character_creation/Name'
import Race from 'views/character_creation/Race'
import Class from 'views/character_creation/Class'

const CharacterCreation = () => {
  let { path, url } = useRouteMatch();
  return(
    <Switch>
      <Route exact path={`${path}/name`}><Name/></Route>
      <Route exact path={`${path}/race`}><Race/></Route>
      <Route exact path={`${path}/class`}><Class/></Route>
      <Route path={path}><Intro/></Route>
    </Switch>
  )
}

export default CharacterCreation;
