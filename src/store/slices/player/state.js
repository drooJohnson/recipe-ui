import { createSlice } from '@reduxjs/toolkit';

export const initialState = {
  health: null,
  money: null
}

const playerStateSlice = createSlice({
  name: 'state',
  initialState: initialState,
  reducers: {
    setRace(state, action)  {state.race = action.payload;},
    setClass(state, action) {state.class = action.payload;},
    setName(state, action) {state.name = action.payload;},
    setMaxHealth(state, action) {state.maxHealth = action.payload;},
    setStrength(state, action) {state.strength = action.payload;},
    setIntellect(state, action) {state.intellect = action.payload;},
    setDexterity(state, action) {state.dexterity = action.payload;},
    setPlayerAttributes(state, action) {state = {...state, ...action.payload}}
  }
})

export const { name, actions, reducer } = playerStateSlice;

export default playerStateSlice.reducer
