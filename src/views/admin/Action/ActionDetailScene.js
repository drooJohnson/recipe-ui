import React, {useReducer, useEffect} from 'react'
import { Header, Form } from 'semantic-ui-react'
import gql from 'graphql-tag'
import { useQuery, useMutation } from '@apollo/client'
import { useParams } from 'react-router-dom'

const ACTION = gql`
  query Action( $id: ID! ){
    action(id:$id){
      id,
      text,
      conditions,
      results
    }
  }
`

const UPDATE_ACTION = gql`
  mutation UpdateAction( $action: UpdateActionInput! ){
    updateAction(action:$action){
      id,
      text,
      conditions,
      results
    }
  }
`

function init(initialState) {
  return initialState
}

const initialState = {
  id: null,
  text: null,
  conditions: null,
  results: null
}

function reducer(state, action) {
    switch(action.type) {
      case 'text':
        return {...state, text: action.data}
      case 'conditions':
        return {...state, conditions: action.data}
      case 'results':
        return {...state, results: action.data}
      case 'loaded':
        return init(action.payload)
      default:
        throw new Error();
    }
}

const ActionDetailScene = () => {
  let {id} = useParams();

  const [state, dispatch] = useReducer(reducer, initialState, init);

  const {data, loading, error} = useQuery(ACTION,{
    variables:{
      id: id
    }
  });

  useEffect(()=>{
    if(data?.action){
      dispatch({type:'loaded', payload:{
        id: data.action.id,
        text: data.action.text,
        conditions: data.action.conditions,
        results: data.action.results
      }})
    }
  }, [data])

  const [updateAction, {data:updatedData, loading:updating, error:updateError}] = useMutation(UPDATE_ACTION);

  const handleSubmit = () => {
    let {id, text, conditions, results} = state;
    updateAction({
      variables: {
        action: {
          id, text, conditions, results
        }
      }
    })
  }

  const formatJsonObjForDisplay = (jsonObj) => {
    let obj = JSON.parse(jsonObj);
    return Object.entries(obj);
    // Returns as an array of ['key',value] arrays;
  }

  if (loading) return "Loading..."
  if (error) return "Error..."

  let {text, conditions, results} = state;

  return(
    <Form onSubmit={handleSubmit}>
      <Form.Input
        placeholder="text"
        name="text"
        value={text}
        onChange={(e,{value,name}) => {
          dispatch({type:name, data:value})
        }}
        />
        <Form.Button loading={updating}/>
    </Form>
  )
}

export default ActionDetailScene;
