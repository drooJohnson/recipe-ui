import React from 'react';
import styled from 'styled-components'
import Tile from 'views/components/Tile'
import Message from 'views/components/Message'
import LocationObjects from 'views/components/LocationObjects'
import GameActions from 'views/components/GameActions'
import ExploreActions from 'views/components/ExploreActions'
import TileExtras from 'views/components/TileExtra'
import { useQuery, gql } from '@apollo/client';

import TextPanel from 'views/components/text/TextPanel'

import getAllowedActions from '../../actions/getAllowedActions'

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

  let {loading, error, data: gameData} = useQuery(PLAYER);

  if (loading) return <div>"Loading..."</div>;
  if (error) return <div>"Error..."</div>;

  let {tile, inventory, class: playerClass, race, lastMessage, ...player} = gameData?.me;
  let gameActions = getAllowedActions(tile.zone.actions, inventory, tile, player);
  console.log(gameActions);
  return(
    <HomeDiv>
      <TextPanel>
        <div key={'messages'}>
          {gameData.me.messages?.map(message => (<div>{message}</div>))}
        </div>
        <div key={'tileDescription'}>{gameData.me.tile.description}</div>
        {gameData.me.tile.items.map((item) => {
          return <div key={item.instanceId}>{item.worldDescription}</div>
        })}
        {/*
          <Message message={gameData.me.lastMessage}/>
          <Tile tile={gameData.me.tile}/>
          <LocationObjects items={gameData.me.tile.items}/>
        */}
        <TileExtras tile={gameData.me.tile} player={player}/>
      </TextPanel>
      <ActionDiv>
        <ExploreActions exits={gameData.me.tile.exits} player={player}/>
        <GameActions actions={gameActions} player={player}/>
      </ActionDiv>
    </HomeDiv>
  )
}

export default Game;
