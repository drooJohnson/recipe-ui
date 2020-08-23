import React from "react";
import { Navigation } from './Navigation'
import { PLAYER } from 'data/player';

export default {
  title: 'Layout/Navigation',
  component: Navigation
}

export const Default = () => <Navigation loading={false} error={false} player={PLAYER}/>
export const NewPlayer = () => <Navigation loading={false} error={false} player={{...PLAYER, class:null, race:null, name:null, inventory:[]}}/>
