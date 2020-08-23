import { createSlice } from '@reduxjs/toolkit';

export const initialState = {
  race: null,
  class: null,
  max_health: null,
  strength: null,
  intellect: null,
  dexterity: null
}

const playerAttributesSlice = createSlice({
  name: 'attributes',
  initialState: initialState,
  reducers: {
    setRace(state, action)  {state.race = action.payload;},
    setClass(state, action) {state.class = action.payload;},
    setMaxHealth(state, action) {state.maxHealth = action.payload;},
    setStrength(state, action) {state.strength = action.payload;},
    setIntellect(state, action) {state.intellect = action.payload;},
    setDexterity(state, action) {state.dexterity = action.payload;},
    setPlayerAttributes(state, action) {state = {...state, ...action.payload}}
  }
})

export const { name, actions, reducer } = playerAttributesSlice;

export default playerAttributesSlice.reducer
