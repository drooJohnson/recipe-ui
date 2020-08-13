import { createSlice, combineReducers } from '@reduxjs/toolkit';
import reduceReducers from 'reduce-reducers';
import playerAttributesReducer from './attributes'
import playerInventoryReducer from './inventory'
import playerPositionReducer from './position'

const playerSlice = createSlice({
  name: 'player',
  initialState: {
    health: null,
    money: null
  },
  reducers: {
    setHealth(state, action) {
      state.health = action.payload
    },
    modifyHealth(state, action) {
      state.health = state.health + action.payload
    },
    setMoney(state,action) {
      state.money = action.payload
    },
    modifyMoney(state, action) {
      state.money = state.money + action.payload
    }
  }
})

const nestedPlayerReducer = combineReducers({
  health: (s = null) => s,
  money: (s = null) => s,
  attributes: playerAttributesReducer,
  inventory: playerInventoryReducer,
  position: playerPositionReducer
})

const playerReducer = reduceReducers(
  playerSlice.reducer,
  nestedPlayerReducer
)

export const { name, actions, reducer } = playerSlice;

export default playerReducer
