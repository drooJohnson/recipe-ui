import { createSlice } from '@reduxjs/toolkit';

export const initialState = {
  equipment: [],
  bag: []
}

const playerAttributesSlice = createSlice({
  name: 'inventory',
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

export const { name, actions, reducer } = playerAttributesSlice;

export default playerAttributesSlice.reducer
