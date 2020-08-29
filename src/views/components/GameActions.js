import React from 'react';
import {getResultFunctionArr} from 'actions/result'

const GameActions = ({actions, player}) => {
  return(
    <>
      {actions.map(action => {
        return(
          <Action action={action} player={player}/>
        )
      })}
    </>
  )
}

const Action = ({action, player}) => {
  let resultFunctionArr = getResultFunctionArr(action.results, player);
  console.log(resultFunctionArr);

  const onChooseAction = async () => {
    return Promise.all(resultFunctionArr.map(
      (resultFunction) => {
        console.log(resultFunction);
        resultFunction();
      }
    )).then(res => {
      console.log("Result array complete!")
    }).catch(err => console.log(err));
  }

  return (
    <button onClick={onChooseAction}>{action.text}</button>
  )
}

export default GameActions;
