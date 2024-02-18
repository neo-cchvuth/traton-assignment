import { addCaseToBuilderForStatus } from '@/redux/utils/reducers';
import {
  ActionReducerMapBuilder,
  CaseReducer,
  PayloadAction,
  createAsyncThunk,
} from '@reduxjs/toolkit';
import axios from 'axios';

import { postLogout } from '../auth/reducers';
import { UserResponse, UserState } from './models';

const setUser: CaseReducer<UserState, PayloadAction<UserState>> = (
  state,
  action,
) => {
  return {
    ...state,
    ...action.payload,
  };
};

const reducers = {
  setUser,
};

const getUser = createAsyncThunk('user/me', async (_, { dispatch }) => {
  try {
    const response = await axios.get<UserResponse>('/user');
    return response.data;
  } catch (e) {
    dispatch(postLogout());
    location.reload();
  }
});

const extraReducers = (builder: ActionReducerMapBuilder<UserState>) => {
  addCaseToBuilderForStatus(builder, getUser, (state, action) => {
    state.user = action.payload;
  });
};

export { reducers, extraReducers, getUser };
