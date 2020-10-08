import { createSlice } from '@reduxjs/toolkit';

export const initialState = {messages:[]}

const messagesSlice = createSlice({
  name: 'messages',
  initialState: initialState,
  reducers: {
    pushMessage(state, action) {
      state.messages = [...state.messages, action.payload]
    },
    popMessage(state, action) {
      state.messages = state.messages.splice(-1)
    },
    setMessages(state, action) {
      state.messages = action.payload}
      ,
    clearMessages(state, action) {
      state.messages = []
    }
  }
})

export const { name, actions, reducer } = messagesSlice;

export default messagesSlice.reducer
