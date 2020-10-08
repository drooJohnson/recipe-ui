import React, { useEffect } from 'react';
import ClassSelect from './extras/ClassSelect';
import NameSelect from './extras/NameSelect';
import RaceSelect from './extras/RaceSelect';

import {getResultFunctionArr} from 'actions/result'

const TileExtra = ({tile, player}) => {
  if (!tile.extra) {
    return "NO EXTRA"
  }
  let extra = JSON.parse(tile.extra);
  let resultFunctionArr = getResultFunctionArr(extra.onComplete, player);

  const onComplete = async () => {
    return Promise.all(resultFunctionArr.map(
      (resultFunction) => {
        console.log(resultFunction);
        resultFunction();
      }
    )).then(res => {
      console.log("Result array complete")
    }).catch(err => console.log(err));
  }

  const renderComponent = () => {
    switch (extra.component) {
      case 'NAME_SELECT':
        return <NameSelect onComplete={onComplete}/>
      case 'RACE_SELECT':
        return <RaceSelect onComplete={onComplete}/>
      case 'CLASS_SELECT':
        return <ClassSelect onComplete={onComplete}/>
      default:
        console.log(tile.extra, "Not being rendered!");
        return null;
    }
  }


  return(
    <>
      {renderComponent()}
    </>
  )
}

export default TileExtra;
