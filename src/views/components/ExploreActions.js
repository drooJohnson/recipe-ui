import React from 'react';
import { Button } from 'semantic-ui-react';
import { gql, useMutation } from '@apollo/client';

const TAKE_EXIT = gql`
  mutation TakeExit($id:ID!, $exitId:ID!){
    takeExit(id:$id, exitId:$exitId){
      id
      message
      tile{
        id
      }
    }
  }
`

const ExploreActions = ({exits, player}) => {
  let [takeExit, {takeExitData}] = useMutation(TAKE_EXIT);

  const onTakeExit = (exit) => {
    takeExit({variables:{id:player.id, exitId:exit.id}}).then((res)=>{console.log(res)}).catch(error => console.log(error));
  }

  return(
    <>
      {exits.map(exit => {
        return <div><a onClick={()=>{onTakeExit(exit)}}>[{exit.description}]</a></div>
      })}
    </>
  )
}

export default ExploreActions;
