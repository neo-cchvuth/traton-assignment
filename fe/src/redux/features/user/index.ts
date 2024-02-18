import { createSlice } from '@reduxjs/toolkit';

import { UserState } from './models';
import { extraReducers, reducers } from './reducers';

const initialState: UserState = {};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers,
  extraReducers,
});

export const { setUser } = userSlice.actions;
export default userSlice.reducer;
