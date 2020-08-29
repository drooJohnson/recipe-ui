import * as _ from 'lodash';

const getAllowedActions = (actions, inventory, tile, player) => {
  console.log(actions);
  let allowedActions = [];
  let actionsToCheck = actions;

  for (let i=0; i < actions.length; i++) {
    let conditions = JSON.parse(actions[i].conditions);
    let allowed = true;

    if (conditions.hasOwnProperty('areCarrying')){
      let isCarrying = 0;
      for(let j=0; j < conditions.areCarrying.length; j++) {
        if (_.find(inventory, {'templateId':conditions.areCarrying[j]})) {
          isCarrying++;
        }
      }
      if(isCarrying !== conditions.areCarrying.length){
        allowed = false;
      }
    }

    if (conditions.hasOwnProperty('tileContains')){
      let tileContains = 0;
      for(let j=0; j < conditions.tileContains.length; j++) {
        if (_.find(tile.items, {'templateId':conditions.tileContains[j]})) {
          tileContains++;
        }
      }
      if(tileContains !== conditions.tileContains.length){
        allowed = false;
      }
    }

    if (conditions.hasOwnProperty('tileHasExit')){
      let tileHasExit = false;
      for(let j=0; j < conditions.tileHasExit.length; j++) {
        if (_.find(tile.exits, {'id':conditions.tileHasExit[j]})){
          tileHasExit = true;
        }
      }
      if (tileHasExit === false){
        allowed = false;
      }
    }

    if (conditions.hasOwnProperty('tileLacksExit')){
      let tileLacksExit = true;
      for(let j=0; j < conditions.tileLacksExit.length; j++) {
        if (_.find(tile.exits, {'id':conditions.tileLacksExit[j]})){
          tileLacksExit = false;
        }
      }
      if (tileLacksExit === false){
        allowed = false;
      }
    }

    if (conditions.hasOwnProperty('location')){
      let isValidLocation = false;
      for(let j=0; j < conditions.location.length; j++) {
        if (conditions.location[j] === tile.id) {
          isValidLocation = true;
        }
      }
      if (isValidLocation === false){
        allowed = false;
      }
    }

    if (conditions.hasOwnProperty('haveMoney')){
      let hasMoney = false;
      if (player.money >= conditions.haveMoney) {
        hasMoney = true;
      }
      if (hasMoney === false){
        allowed = false
      }
    }

    if (conditions.hasOwnProperty('playerHas')){
      let playerHas = false;
      if (player.hasOwnProperty(conditions.playerHas) && (player[conditions.playerHas] !== null) && (player[conditions.playerHas] !== undefined)){
        playerHas = true;
      }

      if(playerHas === false){
        allowed = false;
      }
    }

    if (allowed === true){
      allowedActions.push(actionsToCheck[i]);
    }
  }
  console.log(allowedActions);
  return allowedActions;
}

export default getAllowedActions;
