import RACES from './race'
import CLASSES from './class'
import ITEMS, {ITEM_ARR} from './item'

let PLAYER_INVENTORY = ITEM_ARR.map(item => { return {...item, playerId: "TEST_PLAYER"}});

export const PLAYER = {
  id: "TEST_PLAYER",
  money: 0,
  health: 3,
  maxHealth: 5,
  strength: 5,
  intellect: 4,
  dexterity: 3,
  race: RACES.HUMAN,
  class: CLASSES.CRUSADER,
  inventory: PLAYER_INVENTORY,
  position: {
    x: 0,
    y: 0,
    zone: "TEST_ZONE"
  },
  name: "Storybook Player"
}
