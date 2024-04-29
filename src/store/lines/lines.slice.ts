import { createSlice } from '@reduxjs/toolkit';
import { LinesData } from '../../types/state';
import { NameSpace, Status } from '../../const';
import { fetchLinesAction } from '../api-actions';

const initialState: LinesData = {
  lines: [],
  isDataLoading: false,
  status: Status.Idle,
};

export const lines = createSlice({
  name: NameSpace.Lines,
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(fetchLinesAction.pending, (state) => {
        state.isDataLoading = true;
        state.status = Status.Loading;
      })
      .addCase(fetchLinesAction.fulfilled, (state, action) => {
        state.lines = action.payload;
        state.isDataLoading = false;
        state.status = Status.Success;
      })
      .addCase(fetchLinesAction.rejected, (state) => {
        state.isDataLoading = false;
        state.status = Status.Error;
      });
  }
});
