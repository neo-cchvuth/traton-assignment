import {
  AsyncStatus,
  StatusState,
  addCaseToBuilderForStatus,
} from '@/redux/utils/reducers';
import {
  ActionReducerMapBuilder,
  CaseReducer,
  PayloadAction,
  createAsyncThunk,
} from '@reduxjs/toolkit';
import axios from 'axios';

import { ChatState, Message } from './models';

const appendChat: CaseReducer<ChatState, PayloadAction<Message>> = (
  state,
  action,
): ChatState => {
  return {
    ...state,
    chat: state.chat.concat([action.payload]),
  };
};

const appendPartial: CaseReducer<ChatState, PayloadAction<string | null>> = (
  state,
  action,
): ChatState => {
  return {
    ...state,
    partial: state.partial + action.payload,
  };
};

const clearPartial: CaseReducer<ChatState> = (state): ChatState => {
  return {
    ...state,
    partial: '',
  };
};

const setStatus: CaseReducer<ChatState, PayloadAction<StatusState>> = (
  state,
  action,
): ChatState => {
  return {
    ...state,
    status: action.payload,
  };
};

const reducers = {
  setStatus,
  appendChat,
  appendPartial,
  clearPartial,
};

const getHistory = createAsyncThunk(
  'chat/history',
  async (): Promise<Message[]> => {
    const response = await axios.get<Message[]>('/message/history');
    return response.data;
  },
);

const clearHistory = createAsyncThunk(
  'chat/history/clear',
  async (): Promise<boolean> => {
    const response = await axios.delete<boolean>('/message/history');
    return response.data;
  },
);

const extraReducers = (builder: ActionReducerMapBuilder<ChatState>) => {
  addCaseToBuilderForStatus(builder, getHistory, (state, action) => {
    state.chat = action.payload;
  });
  addCaseToBuilderForStatus(builder, clearHistory, (state) => {
    state.chat = [];
  });
};

export { reducers, extraReducers, getHistory, clearHistory };
