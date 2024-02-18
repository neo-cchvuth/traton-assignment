import { configureStore } from '@reduxjs/toolkit';

import authReducer from './features/auth';
import userReducer from './features/user';
import openAiChatReducer from './features/openai-chat';

export const makeStore = () => {
  return configureStore({
    reducer: {
      authReducer,
      userReducer,
      openAiChatReducer
    },
  });
};

export type AppStore = ReturnType<typeof makeStore>;
export type RootState = ReturnType<AppStore['getState']>;
export type AppDispatch = AppStore['dispatch'];
