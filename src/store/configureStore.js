import { configureStore } from '@reduxjs/toolkit'

import playerReducer from './slices/player/';
import messagesReducer from './slices/messages';
import {loadState, saveState} from './localStorage';
import {throttle} from 'lodash';

const persistedState = loadState();

const store = configureStore({
  reducer: {
    player: playerReducer,
    gameState: messagesReducer
  },
  preloadedState: persistedState
})

store.subscribe(throttle(()=> {
  saveState({
    player: store.getState().player,
    gameState: store.getState().gameState
  })
}, 1000));

export default store;
