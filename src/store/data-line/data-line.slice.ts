import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { DataByLineData } from '../../types/state';
import { NameSpace, Status } from '../../const';
import { fetchFormItemAction, fetchLineDataAction, postUpdatesAction } from '../api-actions';
import { toast } from 'react-toastify';
import { DataLineData } from '@/types/data-line';

const initialState: DataByLineData = {
  dataLine: [],
  isDataLoading: false,
  status: Status.Idle,
  activeForm: null,
  isItemDataLoading: false,
  isFormActive: false,
  activeIdForm: null,
  activeLine: null,
  isWatchButton: false,
};

export const dataLine = createSlice({
  name: NameSpace.DataByLine,
  initialState,
  reducers: {
    setIsFormActive: (state, action: PayloadAction<boolean>) => {
      state.isFormActive = action.payload;
    },
    setActiveIdForm: (state, action: PayloadAction<number | null>) => {
      state.activeIdForm = action.payload;
    },
    setActiveLine: (state, action: PayloadAction<DataLineData>) => {
      state.activeLine = action.payload;
    },
    setUpdatesStatus: (state, action: PayloadAction<Status>) => {
      state.status = action.payload;
    },
    setWatchButton: (state, action: PayloadAction<boolean>) => {
      state.isWatchButton = action.payload;
    },
  },
  extraReducers(builder) {
    builder
      .addCase(fetchLineDataAction.pending, (state) => {
        state.isDataLoading = true;
        state.status = Status.Loading;
      })
      .addCase(fetchLineDataAction.fulfilled, (state, action) => {
        state.dataLine = action.payload;
        state.isDataLoading = false;
        state.status = Status.Success;
      })
      .addCase(fetchLineDataAction.rejected, (state) => {
        state.isDataLoading = false;
        state.status = Status.Error;
      })
      .addCase(fetchFormItemAction.pending, (state) => {
        state.isItemDataLoading = true;
      })
      .addCase(fetchFormItemAction.fulfilled, (state, action) => {
        state.activeForm = action.payload;
        state.isItemDataLoading = false;
      })
      .addCase(fetchFormItemAction.rejected, (state) => {
        state.isItemDataLoading = false;
      })
      .addCase(postUpdatesAction.pending, (state) => {
        state.status = Status.Loading;
      })
      .addCase(postUpdatesAction.fulfilled, (state,) => {
        state.status = Status.Success;
      })
      .addCase(postUpdatesAction.rejected, (state) => {
        state.status = Status.Error;
        toast.warn('Ошибка внесения изменений. Пожалуйста, поробуйте позже');
      });
  }
});


export const {
  setIsFormActive,
  setActiveIdForm,
  setActiveLine,
  setUpdatesStatus,
  setWatchButton,
}  = dataLine.actions;
