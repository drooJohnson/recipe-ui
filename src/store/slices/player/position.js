import { createSlice } from '@reduxjs/toolkit';

export const initialState = {
  x:null,
  y:null,
  zone:null
}

const playerPositionSlice = createSlice({
  name: 'position',
  initialState: initialState,
  reducers: {
    setCoords(state, action) {state = {...state, ...{x: action.payload.x || action.payload[0], y: action.payload.y || action.payload[1]}}},
    setZone(state, action) {state.zone = action.payload;},
    setX(state, action) {state.x = action.payload;},
    setY(state, action) {state.y = action.payload;},
    setPosition(state, action) {state = {...state, ...action.payload}}
  }
})

export const { name, actions, reducer } = playerPositionSlice;

export default playerPositionSlice.reducer
