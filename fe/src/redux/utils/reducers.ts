import {
  ActionReducerMapBuilder,
  CaseReducer,
  PayloadAction,
  createAsyncThunk,
} from '@reduxjs/toolkit';

export enum StatusState {
  LOADING = 'loading',
  SUCCESS = 'success',
  FAIL = 'fail',
}
export type AsyncStatus = {
  status?: StatusState;
  error?: string;
};

type FullfilledMeta<P> = {
  arg: P;
  requestId: string;
  requestStatus: 'fulfilled';
};

export const addCaseToBuilderForStatus = <
  State extends AsyncStatus,
  Return,
  Payload,
>(
  builder: ActionReducerMapBuilder<State>,
  thunk: ReturnType<typeof createAsyncThunk<Return, Payload>>,
  onFullfilledExtra?: CaseReducer<
    State,
    PayloadAction<Return, string, FullfilledMeta<Payload>, never>
  >,
) => {
  return builder
    .addCase(thunk.pending, (state) => {
      state.status = StatusState.LOADING;
    })
    .addCase(thunk.fulfilled, (state, action) => {
      state.status = StatusState.SUCCESS;
      onFullfilledExtra && onFullfilledExtra(state, action);
    })
    .addCase(thunk.rejected, (state, action) => {
      state.status = StatusState.FAIL;
      state.error = (action as any).payload.message || action.error?.message;
    });
};
