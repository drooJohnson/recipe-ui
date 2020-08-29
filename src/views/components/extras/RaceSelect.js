import React,{useState} from 'react';
import { useQuery, useMutation, gql } from '@apollo/client';
import { Card, Button } from 'antd';
import StatModifierTable from '../StatModifierTable'
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

const RaceCard = ({selected, playerRace, player, onSelect}) => {
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

const RaceSelect = ({onComplete}) => {
  const [ setRace, { newData }] = useMutation(SET_RACE);
  const { loading: loadingPlayer, error: errorPlayer, data: dataPlayer } = useQuery(PLAYER);
  const { loading, error, data } = useQuery(RACES);
  const [selectedRace, setSelectedRace] = useState(null);

  if (loading || loadingPlayer) return <p>Loading...</p>
  if (error || errorPlayer) return <p>Error :(</p>

  const handleSelect = (race) => {
    setSelectedRace(race.id)
    setRace({ variables: {raceId:race.id, id:dataPlayer.me.id}}).then( res => {
      console.log(res);
      onComplete();
    }).catch( err => {
      console.log(err);
    })
  }

  return (
    <CardArray>
    {data.races.map((playerRace) => {
      return(
        <RaceCard selected={selectedRace === playerRace.id} playerRace={playerRace} player={dataPlayer.me} onSelect={()=>{
            handleSelect(playerRace);
          }}/>
      )
    })}
  </CardArray>
  )
}

export default RaceSelect;
