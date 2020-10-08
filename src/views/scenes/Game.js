import React, {useEffect} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {actions as messageActions} from 'store/slices/messages'
import styled from 'styled-components'
import Tile from 'views/components/Tile'
import Message from 'views/components/Message'
import LocationObjects from 'views/components/LocationObjects'
import GameActions from 'views/components/GameActions'
import ExploreActions from 'views/components/ExploreActions'
import TileExtras from 'views/components/TileExtra'
import { useQuery, gql } from '@apollo/client';

import TextPanel from 'views/components/text/TextPanel'


const PLAYER = gql`
  query GetCurrentPlayer {
    me {
      id
      money
      health
      messages
      maxHealth
      strength
      intellect
      dexterity
      race {
        id
        name
        statModifiers {
          maxHealth
          strength
          intellect
          dexterity
        }
        description
      }
      class {
        id
        name
        statModifiers {
          maxHealth
          strength
          intellect
          dexterity
        }
        description
      }
      inventory {
        instanceId
        templateId
        playerId
        name
        description
        iconSet
        iconName
        type
        subtype
        slot
        buyPrice
        sellPrice
        statModifiers {
          maxHealth
          strength
          intellect
          dexterity
        }
        totalCharges
        remainingCharges
        loseOnDeath
      }
      tile {
        id
        x
        y
        description
        extra
        exits {
          id
          text
          destination {
            id
          }
        }
        items {
          instanceId
          templateId
          name
          description
          worldDescription
          iconSet
          iconName
          type
          subtype
          slot
          buyPrice
          sellPrice
          statModifiers {
            maxHealth
            strength
            intellect
            dexterity
          }
          totalCharges
          obtainable
          loseOnDeath
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

  let {tile, inventory, ...player} = gameData?.me;
  return(
    <HomeDiv>
      <GameComponent tile={tile} inventory={inventory} player={player} messages={messages}/>
    </HomeDiv>
  )
}

const GameComponent = ({tile, inventory, player, messages}) => {
  const dispatch = useDispatch();

  useEffect(()=>{
    console.log("TILE ID OR DESCRIPTION CHANGED");
    dispatch(messageActions.clearMessages());
    dispatch(messageActions.pushMessage(tile.description));
  }, [tile.id, tile.description]);

  console.log(messages);
  return(
    <>
    <TextPanel>
      {false && <div key={'tileDescription'}>{tile.description}</div>}
      {tile.items.map((item) => {
        return <div key={item.instanceId}>{item.worldDescription}</div>
      })}
      {/*
        <Message message={gameData.me.lastMessage}/>
        <Tile tile={gameData.me.tile}/>
        <LocationObjects items={gameData.me.tile.items}/>
      */}
      <div key={'messages'}>
        <br/>
        {messages?.map(message => (<div>{message}</div>))}
      </div>
      <TileExtras tile={tile} player={player}/>
    </TextPanel>
    <ActionDiv>
      <ExploreActions exits={tile.exits} player={player}/>
      <GameActions tile={tile} inventory={inventory} player={player}/>
    </ActionDiv>
    </>
  )
}

export default Game;
