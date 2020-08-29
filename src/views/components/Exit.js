import React from 'react';
import { Button } from 'semantic-ui-react';

const Exit = ({onExit, exit}) => {
  return(
    <Button onClick={()=>{onExit(exit.destination.id)}}>
      {exit.text}
    </Button>
  )
}

export default Exit;
