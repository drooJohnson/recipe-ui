import React from "react";
import styled from 'styled-components';
import { useSelector, useDispatch } from 'react-redux';
import { Navbar, Alignment, Button } from '@blueprintjs/core';
import { actions } from '../../store/slices/player/attributes'

export const Navigation = () => {
  const playerAttributes = useSelector(state => state.player.attributes);
  const dispatch = useDispatch();

  const setPlayerName = (name) => {
    dispatch(actions.setName(name));
  }

  return(
    <Navbar>
      <Navbar.Group align={Alignment.LEFT}>
        <Navbar.Heading>RPG</Navbar.Heading>
        <Navbar.Divider/>
        <Button icon="pencil" text="Set Name to 'Andrew'" onClick={()=>{setPlayerName('Andrew')}}/>
        <Button icon="pencil" text="Set Name to 'Nameless'" onClick={()=>{setPlayerName('Nameless')}}/>
      </Navbar.Group>
    </Navbar>
  )
}

export const Viewport = () => {
  const playerAttributes = useSelector(state => state.player.attributes);
  console.log(playerAttributes);
  return(
    <div>{JSON.stringify(playerAttributes)}</div>
  )
}
