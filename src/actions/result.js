import { client } from 'index'
import { gql } from '@apollo/client'
import store from 'store/configureStore'
import { actions } from 'store/slices/messages'

const coerceResults = (results) => {
  let resultsAsObj;
  switch(typeof results){
    case 'string':
      try {
        resultsAsObj = JSON.parse(results)
      } catch (e) {
        console.log("Failed to parse results string as JSON")
        console.log(e);
      }
      break;
    case 'object':
      resultsAsObj = results;
      break;
    default:
      console.log("Results reached default case, not processed");
      break;
  }
  return resultsAsObj;
}

export const getResultFunctionArr = (results, player) => {

  let parsedResults = coerceResults(results);
  let funcArr = [];

  if (parsedResults.hasOwnProperty('addMessage')){
    funcArr.push(()=>{resultAddMessage(parsedResults.addMessage,player.id)})
    funcArr.push(()=>{store.dispatch(actions.pushMessage(parsedResults.addMessage))})
  }
  if (parsedResults.hasOwnProperty('newMessage')){
    funcArr.push(()=>{resultNewMessage(parsedResults.newMessage,player.id)})
  }
  if (parsedResults.hasOwnProperty('clearMessages')){
    funcArr.push(()=>{resultClearMessages(player.id)})
  }
  if (parsedResults.hasOwnProperty('createExit')){
    funcArr.push(()=>{resultCreateExit(parsedResults.createExit)})
  }
  if (parsedResults.hasOwnProperty('take')){
    funcArr.push(()=>{resultTake(parsedResults.take,player.id)})
  }
  if (parsedResults.hasOwnProperty('drop')){
    funcArr.push(()=>{resultDrop(parsedResults.drop,player.tile.id)})
  }
  if (parsedResults.hasOwnProperty('location')){
    funcArr.push(()=>{resultLocation(player.id,parsedResults.location)})
  }
  if (parsedResults.hasOwnProperty('destroy')){
    funcArr.push(()=>{resultDestroy(parsedResults.destroy)})
  }
  if (parsedResults.hasOwnProperty('addMoney')){
    funcArr.push(()=>{resultAddMoney(parsedResults.addMoney,player.id)})
  }
  if (parsedResults.hasOwnProperty('removeMoney')){
    funcArr.push(()=>{resultRemoveMoney(parsedResults.removeMoney,player.id)})
  }
  if (parsedResults.hasOwnProperty('roomDescription')){
    funcArr.push(()=>{resultRoomDescription(parsedResults.roomDescription,player.tile.id)})
  }
  if (parsedResults.hasOwnProperty('destroyExit')){
    funcArr.push(()=>{resultDestroyExit(parsedResults.destroyExit)})
  }
  if (parsedResults.hasOwnProperty('damagePlayer')){
    funcArr.push(()=>{resultDamagePlayer(parsedResults.damagePlayer,player.id)})
  }
  if (parsedResults.hasOwnProperty('healPlayer')){
    funcArr.push(()=>{resultHealPlayer(parsedResults.healPlayer,player.id)})
  }

  return funcArr;
}

const RESULT_ADD_MESSAGE = gql`
  mutation ResultMessage($message:String!, $id: ID!){
    addMessage(message:$message,id:$id){
      id
      messages
    }
  }
`;

export const resultAddMessage = (message, playerId) => {
  return client.mutate({
    mutation: RESULT_ADD_MESSAGE,
    variables:{
      message: message,
      id: playerId
    }
  }).then((res) => {
    console.log("RESULT_MESSAGE MUTATION SUCCEEDED WITH ", res);
  }).catch((err) => {
    console.log(err);
  })
}

const RESULT_NEW_MESSAGE = gql`
  mutation ResultNewMessage($message:String!, $id: ID!){
    newMessage(message:$message,id:$id){
      id
      messages
    }
  }
`;

export const resultNewMessage = (message, playerId) => {
  return client.mutate({
    mutation: RESULT_NEW_MESSAGE,
    variables:{
      message: message,
      id: playerId
    }
  }).then((res) => {
    console.log("RESULT_MESSAGE MUTATION SUCCEEDED WITH ", res);
  }).catch((err) => {
    console.log(err);
  })
}

const RESULT_CLEAR_MESSAGES = gql`
  mutation ResultClearMessages($id: ID!){
    clearMessages(id:$id){
      id
      messages
    }
  }
`;

export const resultClearMessages = (playerId) => {
  return client.mutate({
    mutation: RESULT_CLEAR_MESSAGES,
    variables:{
      id: playerId
    }
  }).then((res) => {
    console.log("RESULT_MESSAGE MUTATION SUCCEEDED WITH ", res);
  }).catch((err) => {
    console.log(err);
  })
}

const RESULT_CREATE_EXIT = gql`
  mutation ResultCreateExit($exit:ExitInput!){
    createExit(exit:$exit){
      id
      exits {
        id
        text
        tile {
          id
        }
        destination {
          id
        }
        result
      }
    }
  }
`

export const resultCreateExit = (exit) => {
  return client.mutate({
    mutation: RESULT_CREATE_EXIT,
    variables:{
      exit: exit
    }
  }).then((res) => {
    console.log("RESULT_CREATE_EXIT MUTATION SUCCEEDED WITH ", res);
  }).catch((err) => {
    console.log(err);
  })
}

const RESULT_TAKE = gql`
  mutation ResultTake($id:ID!, $playerId:ID!){
    pickUpItem(id:$id, playerId:$playerId){
      id
      tile{
        id
        items{
          instanceId
          templateId
        }
        player{
          id
          inventory{
            instanceId
            templateId
          }
        }
      }
    }
  }
`

export const resultTake = (id, playerId) => {
  return client.mutate({
    mutation: RESULT_TAKE,
    variables:{
      id:id,
      playerId:playerId
    }
  }).then((res) => {
    console.log("RESULT_TAKE MUTATION SUCCEEDED WITH ", res);
  }).catch((err) => {
    console.log(err);
  })
}

const RESULT_DROP = gql`
  mutation ResultDrop($id:ID!, $tileId:ID!){
    dropItem(id:$id, tileId:$tileId){
      id
      tile{
        id
        items{
          instanceId
          templateId
        }
        player{
          id
          inventory{
            instanceId
            templateId
          }
        }
      }
    }
  }
`

export const resultDrop = (id, tileId) => {
  return client.mutate({
    mutation: RESULT_DROP,
    variables:{
      id:id,
      tileId:tileId
    }
  }).then((res) => {
    console.log("RESULT_DROP MUTATION SUCCEEDED WITH ", res);
  }).catch((err) => {
    console.log(err);
  })
}

const RESULT_LOCATION = gql`
  mutation ResultLocation($id:ID!, $tileId:ID!){
    move(id:$id, tileId:$tileId){
      id
      tile{
        id
      }
    }
  }
`

export const resultLocation = (id, tileId) => {
  return client.mutate({
    mutation: RESULT_LOCATION,
    variables:{
      id: id,
      tileId: tileId
    }
  }).then((res) => {
    console.log("RESULT_LOCATION MUTATION SUCCEEDED WITH ", res);
  }).catch((err) => {
    console.log(err);
  })
}

const RESULT_DESTROY = gql`
  mutation ResultDestroy($id:ID!){
    destroyItem(id:$id){
      id
    }
  }
`

export const resultDestroy = (id) => {
  return client.mutate({
    mutation: RESULT_DESTROY,
    variables:{
      id:id
    }
  }).then((res) => {
    console.log("RESULT_DESTROY MUTATION SUCCEEDED WITH ", res);
  }).catch((err) => {
    console.log(err);
  })
}

const RESULT_ADD_MONEY = gql`
  mutation ResultAddMoney($money:Int!, $id:ID!){
    addMoney(money:$money, id:$id){
      id
      money
    }
  }
`

export const resultAddMoney = (money, id) => {
  console.log(money);
  return client.mutate({
    mutation: RESULT_ADD_MONEY,
    variables:{
      money:money,
      id:id
    }
  }).then((res) => {
    console.log("RESULT_ADD_MONEY MUTATION SUCCEEDED WITH ", res);
  }).catch((err) => {
    console.log(err);
  })
}

const RESULT_REMOVE_MONEY = gql`
  mutation ResultRemoveMoney($money:Int!, $id:ID!){
    removeMoney(money:$money, id:$id){
      id
      money
    }
  }
`

export const resultRemoveMoney = (money, id) => {
  return client.mutate({
    mutation: RESULT_REMOVE_MONEY,
    variables:{
      money:money,
      id:id
    }
  }).then((res) => {
    console.log("RESULT_REMOVE_MONEY MUTATION SUCCEEDED WITH ", res);
  }).catch((err) => {
    console.log(err);
  })
}

const RESULT_ROOM_DESCRIPTION = gql`
  mutation ResultRoomDescription($description:String!,$id:ID){
    changeTileDescription(description:$description, id:$id){
      id
      description
    }
  }
`

export const resultRoomDescription = (description, id) => {
  return client.mutate({
    mutation: RESULT_ROOM_DESCRIPTION,
    variables:{
      description:description,
      id:id
    }
  }).then((res) => {
    console.log("RESULT_ROOM_DESCRIPTION MUTATION SUCCEEDED WITH ", res);
  }).catch((err) => {
    console.log(err);
  })
}

const RESULT_DESTROY_EXIT = gql`
  mutation ResultDestroyExit($exitId:ID!){
    removeExit(exitId:$exitId){
      id
      exits {
        id
        text
        tile {
          id
        }
        destination {
          id
        }
        result
      }
    }
  }
`

export const resultDestroyExit = (exit) => {
  return client.mutate({
    mutation: RESULT_DESTROY_EXIT,
    variables:{
      exitId: exit.id
    }
  }).then((res) => {
    console.log("RESULT_DESTROY_EXIT MUTATION SUCCEEDED WITH ", res);
  }).catch((err) => {
    console.log(err);
  })
}

const RESULT_DAMAGE_PLAYER = gql`
  mutation ResultDamagePlayer($damage:Int!,$id:ID!){
    damagePlayer(damage:$damage, id:$id){
      id
      health
    }
  }
`

export const resultDamagePlayer = (damage,id) => {
  return client.mutate({
    mutation: RESULT_DAMAGE_PLAYER,
    variables:{
      damage: damage,
      id: id
    }
  }).then((res) => {
    console.log("RESULT_DAMAGE_PLAYER MUTATION SUCCEEDED WITH ", res);
  }).catch((err) => {
    console.log(err);
  })
}

const RESULT_HEAL_PLAYER = gql`
  mutation ResultHealPlayer($healing:Int!,$id:ID!){
    healPlayer(healing:$healing, id:$id){
      id
      health
    }
  }
`

export const resultHealPlayer = (healing,id) => {
  return client.mutate({
    mutation: RESULT_HEAL_PLAYER,
    variables:{
      healing: healing,
      id: id
    }
  }).then((res) => {
    console.log("RESULT_HEAL_PLAYER MUTATION SUCCEEDED WITH ", res);
  }).catch((err) => {
    console.log(err);
  })
}
