import React, {useState} from 'react';
import {useMutation, useQuery, gql} from '@apollo/client'

const GET_PLAYER_ID = gql`
  query GetCurrentPlayer {
    me {
      id
      name
    }
  }
`
const SET_NAME = gql`
  mutation setName($name: String!, $id: ID!) {
    setName(name: $name, id: $id) {
      id
      money
      health
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
      name
    }
  }
`

const NameSelect = ({onComplete}) => {
  let {loading, error, data} = useQuery(GET_PLAYER_ID);
  let [submitName, {mutationData}] = useMutation(SET_NAME);
  let [name, setName] = useState(null);
  let [isComplete, setIsComplete] = useState(data?.me?.name);

  if (loading || error) return null;

  const handleSubmit = (event) => {
    event.preventDefault();
    if (name) {
      console.log(name + " submitted");
      submitName({ variables: {name: name, id: data.me.id}}).then( res => {
        setIsComplete(true);
        onComplete();
      }).catch( err => {
        console.log(err);
      })
    } else {
      console.log("No name entered");
    }
  }

  const handleChange = (event) => {
    setName(event.target.value);
  }

  if (isComplete) {
    return (
      <strong>{data.me.name}</strong>
    )
  }

  return (
    <form onSubmit={handleSubmit}>
      <input type='text' value={name} onChange={handleChange} required/>
      <input type='submit' value='Submit'/>
    </form>
  )
}

export default NameSelect;
