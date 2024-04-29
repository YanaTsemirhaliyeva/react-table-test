import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { NameSpace, Status } from '../../const';
import { fetchHeadersAction, postNewFormAction, postUpdatesAction } from '../api-actions';
import { HeadersData } from '@/types/state';
import { toast } from 'react-toastify';
import { HeaderData } from '@/types/header';

const initialState: HeadersData = {
  headers: [],
  isDataLoading: false,
  status: Status.Idle,
  rowActive: null,
  activeHeader: null,
  isNewForm: false,
  newFormPostStatus: Status.Idle,
};

export const headers = createSlice({
  name: NameSpace.Headers,
  initialState,
  reducers: {
    setRowActive: (state, action: PayloadAction<number | null>) => {
      state.rowActive = action.payload;
    },
    setActiveHeader: (state, action: PayloadAction<HeaderData>) => {
      state.activeHeader = action.payload;
    },
    setIsNewForm: (state, action: PayloadAction<boolean>) => {
      state.isNewForm = action.payload;
    },
    setNewFormPostStatus: (state, action: PayloadAction<Status>) => {
      state.newFormPostStatus = action.payload;
    }
  },
  extraReducers(builder) {
    builder
      .addCase(fetchHeadersAction.pending, (state) => {
        state.isDataLoading = true;
        state.status = Status.Loading;
      })
      .addCase(fetchHeadersAction.fulfilled, (state, action) => {
        state.headers = action.payload;
        state.isDataLoading = false;
        state.status = Status.Success;
      })
      .addCase(fetchHeadersAction.rejected, (state) => {
        state.isDataLoading = false;
        state.status = Status.Error;
      })
      .addCase(postUpdatesAction.pending, (state) => {
        state.status = Status.Loading;
      })
      .addCase(postUpdatesAction.fulfilled, (state,) => {
        state.status = Status.Success;
      })
      .addCase(postUpdatesAction.rejected, (state) => {
        state.status = Status.Error;
        // toast.warn('Ошибка отпраки формы. Пожалуйста, поробуйте позже');
      })
      .addCase(postNewFormAction.pending, (state) => {
        state.newFormPostStatus = Status.Loading;
      })
      .addCase(postNewFormAction.fulfilled, (state) => {
        state.newFormPostStatus = Status.Success;
      })
      .addCase(postNewFormAction.rejected, (state) => {
        state.newFormPostStatus = Status.Error;
        toast.warn('Ошибка создания формы. Пожалуйста, поробуйте позже');
      });
  }
});

export const {
  setRowActive,
  setActiveHeader,
  setIsNewForm,
  setNewFormPostStatus,
}  = headers.actions;
