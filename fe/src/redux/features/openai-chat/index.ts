import { createSlice } from '@reduxjs/toolkit';

import { ChatState } from './models';
import { extraReducers, reducers } from './reducers';

const initialState: ChatState = {
  chat: [],
  partial: '',
};

const chatSlice = createSlice({
  name: 'chat',
  initialState,
  reducers,
  extraReducers,
});

export const { appendChat, appendPartial, clearPartial, setStatus } =
  chatSlice.actions;
export default chatSlice.reducer;
