import React from 'react';
import { Button } from 'semantic-ui-react';
import { gql, useMutation } from '@apollo/client';

const MOVE = gql`
  mutation Move($id:ID!, $tileId:ID!){
    move(id:$id, tileId:$tileId){
      id
      tile{
        id
      }
    }
  }
`

const ExploreActions = ({exits, player}) => {
  let [move, {moveData}] = useMutation(MOVE);

  const onMove = (exit) => {
    move({variables:{id:player.id, tileId:exit.destination.id}}).then((res)=>{console.log(res)}).catch(error => console.log(error));
  }

  return(
    <>
      {exits.map(exit => {
        return <Button onClick={()=>{onMove(exit)}}>{exit.text}</Button>
      })}
    </>
  )
}

export default ExploreActions;
