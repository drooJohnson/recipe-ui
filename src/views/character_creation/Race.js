import React from 'react';
import {withRouter} from 'react-router-dom'
import { useQuery, useMutation, gql } from '@apollo/client';
// import { Card, Button, Elevation } from '@blueprintjs/core';
import { Card, Button } from 'antd';
import StatModifierTable from './StatModifierTable'
import styled from 'styled-components'

const RACES = gql`
  query races {
    races {
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
  }
`

const PLAYER = gql`
  query me {
    me {
      id
      name
      maxHealth
      strength
      intellect
      dexterity
    }
  }
`

const SET_RACE = gql`
  mutation setRace($raceId: ID!, $id: ID!) {
    setRace(raceId: $raceId, id: $id) {
      id
      name
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
    }
  }
`

const RaceCard = ({playerRace, player, onSelect}) => {
  return(
    <StyledRaceCard actions={[
      <Button type="link" onClick={onSelect}>{"Choose " + playerRace.name}</Button>
    ]}>
      <h2><a href="#">{playerRace.name}</a></h2>
      <p>{playerRace.description}</p>
      <StatModifierTable baseStats={player} statModifierBlock={playerRace.statModifiers}/>
    </StyledRaceCard>
  )
}

const CardArray = styled.div`
  display:flex;
`

const StyledRaceCard = styled(Card)`
  margin:0 0.5em;
  &:first-child{
    margin-left: 0;
  }
  &:last-child{
    margin-right: 0;
  }
`

const Race = ({history}) => {
  const [ setRace, { newData }] = useMutation(SET_RACE);
  const { loading: loadingPlayer, error: errorPlayer, data: dataPlayer } = useQuery(PLAYER);
  const { loading, error, data } = useQuery(RACES);

  if (loading || loadingPlayer) return <p>Loading...</p>
  if (error || errorPlayer) return <p>Error :(</p>

console.log(data);
  return (
    <CardArray>
    {data.races.map((playerRace) => {
      return(
        <RaceCard playerRace={playerRace} player={dataPlayer.me} onSelect={()=>{
            setRace({ variables: { raceId: playerRace.id, id: dataPlayer.me.id }}).then(
              res => {
                history.push('class');
              }
            )
          }}/>
      )
    })}
  </CardArray>
  )
}

export default withRouter(Race);
