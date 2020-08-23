import React from 'react';
import {withRouter} from 'react-router-dom'
import { useQuery, useMutation, gql } from '@apollo/client';
import { Card, Button } from 'antd';
import StatModifierTable from './StatModifierTable';
import styled from 'styled-components';

const CLASSES = gql`
  query classes {
    classes {
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

const SET_CLASS = gql`
  mutation setClass($classId: ID!, $id: ID!) {
    setClass(classId: $classId, id: $id) {
      id
      name
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
    }
  }
`

const GRANT_GEAR = gql`
  mutation grantClassStarterGear($classId: ID!, $id: ID!) {
    grantClassStarterGear(classId: $classId, id: $id) {
      id
      name
      inventory {
        id
        itemInstanceId
        itemTemplateId
        playerId
        name
        description
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
    }
  }
`

const ClassCard = ({playerClass, player, onSelect}) => {
  return(
    <StyledClassCard bodyStyle={{paddingBottom:'1em'}} hoverable actions={[
      <Button type="link" text={"Choose " + playerClass.name} onClick={onSelect}>{"Choose " + playerClass.name}</Button>
    ]}>
      <h2><a href="#">{playerClass.name}</a></h2>
      <p>{playerClass.description}</p>
      <StatModifierTable baseStats={player} statModifierBlock={playerClass.statModifiers}/>
    </StyledClassCard>
  )
}

const CardArray = styled.div`
  display:flex;
`;

const StyledClassCard = styled(Card)`
  margin:0 0.5em;
  &:first-child{
    margin-left: 0;
  }
  &:last-child{
    margin-right: 0;
  }
`

const Class = ({history}) => {
  const [ setClass, { newData }] = useMutation(SET_CLASS);
  const [ grantClassStarterGear, { gearedData }] = useMutation(GRANT_GEAR);
  const { loading: loadingPlayer, error: errorPlayer, data: dataPlayer } = useQuery(PLAYER);
  const { loading, error, data } = useQuery(CLASSES);

  if (loading || loadingPlayer) return <p>Loading...</p>
  if (error || errorPlayer) return <p>Error :(</p>

  return (
    <CardArray>
    {data.classes.map((playerClass) => {
      return(
        <ClassCard playerClass={playerClass} player={dataPlayer.me} onSelect={()=>{
            setClass({ variables: { classId: playerClass.id, id:dataPlayer.me.id }}).then(
              res => {
                grantClassStarterGear({ variables: { classId: playerClass.id, id:dataPlayer.me.id }}).then(
                  res => {
                    history.push('/');
                  }
                )
              }
            )
          }}/>
      )
    })}
  </CardArray>
  )
}

export default withRouter(Class);
