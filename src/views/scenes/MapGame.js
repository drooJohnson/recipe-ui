import React, {useEffect} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {actions as messageActions} from 'store/slices/messages'
import styled from 'styled-components'
//import Tile from 'views/components/Tile'
//import Message from 'views/components/Message'
//import LocationObjects from 'views/components/LocationObjects'
import GameActions from 'views/components/GameActions'
import ExploreActions from 'views/components/ExploreActions'
import TileExtras from 'views/components/TileExtra'
import { useQuery, gql } from '@apollo/client';

import TextPanel from 'views/components/text/TextPanel'


const PLAYER = gql`
  query GetCurrentPlayer {
    me {
      id
      message
      tile {
        id
        x
        y
        description
        extra
        exits {
          id
          description
          destination {
            id
          }
        }
        zone {
          id
          name
          description
          actions {
            text
            conditions
            results
          }
        }
      }
      name
    }
  }
`

const HomeDiv = styled.div`
  display:flex;
  flex:1;
  justify-self:stretch;
  align-self:stretch;
  justify-items:center;
  align-items:center;
  flex-direction:column;
  padding: 48px;
`

const ActionDiv = styled.div`
  display:flex;
  flex:2;
  flex-direction:column;
`

const Game = () => {
  const messages = useSelector(state => state.gameState.messages);
  console.log(messages);
  let {loading, error, data: gameData} = useQuery(PLAYER);

  if (loading) return <div>"Loading..."</div>;
  if (error) return <div>"Error..."</div>;

  console.log(gameData);
  let {tile, ...player} = gameData?.me;
  return(
    <HomeDiv>
      <GameComponent tile={tile} player={player}/>
    </HomeDiv>
  )
}

const Headline = styled.div`
  font-weight:bold;
`

const Underline = styled.div`
  background-color:black;
  height:1px;
`

const HeaderWrapper = styled.div`
  display:flex;
  flex-direction:column;
  align-items:stretch;
  justify-content:stretch;
`

const UnderlinedHeader = ({children}) => {
  return(
    <HeaderWrapper>
      <Headline>{children}</Headline>
      <Underline/>
    </HeaderWrapper>
  )
}

const GameComponent = ({tile, player}) => {
  console.log(tile, player);
  return(
    <div style={{textAlign:'left'}}>
      <div style={{fontStyle:'italic'}}>{player.message}</div>
      <br/>
      <div>
        <UnderlinedHeader>This Room</UnderlinedHeader>
        {tile.description}
      </div>
      <br/>
      <div>
        <UnderlinedHeader>Exits</UnderlinedHeader>
        <ExploreActions exits={tile.exits} player={player}/>
      </div>
    </div>
  )
}

export default Game;
