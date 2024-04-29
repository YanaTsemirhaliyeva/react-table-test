import { createAsyncThunk } from '@reduxjs/toolkit';
import { AppDispatch, State } from '../types/state';
import { AxiosInstance } from 'axios';
import { APIRoute } from '../const';
import { HeaderData } from '@/types/header';
import { LineData } from '@/types/lines';
import { DataLineData } from '@/types/data-line';
import { generatePath } from 'react-router-dom';
import { PostUpdates } from '@/types/updates-post';
import { PostNewForm } from '@/types/new-form-post';

export const fetchHeadersAction = createAsyncThunk<HeaderData[], undefined, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'DATA/fetchHeaders',
  async (_arg, {extra: api}) => {
    const {data} = await api.get<HeaderData[]>(APIRoute.Headers);
    return data;
  }
);

export const fetchLinesAction = createAsyncThunk<LineData[], undefined, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'DATA/fetchLines',
  async (_arg, {extra: api}) => {
    const {data} = await api.get<LineData[]>(APIRoute.Lines);
    return data;
  }
);

export const fetchLineDataAction = createAsyncThunk<DataLineData[], undefined, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'DATA/fetchLineData',
  async (_arg, {extra: api}) => {
    const {data} = await api.get<DataLineData[]>(APIRoute.DataLine);
    return data;
  }
);

export const fetchFormItemAction = createAsyncThunk<DataLineData, string, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'DATA/fetchFormItem',
  async (lineId, {extra: api}) => {
    const {data} = await api.get<DataLineData>(generatePath(APIRoute.FormItem, {lineId: lineId}));
    return data;
  }
);

export const postUpdatesAction = createAsyncThunk<PostUpdates, PostUpdates, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'DATA/postUpdates',
  async ({target_count, distribution_count, update_date, update_user, nsi_pers_indicate_id, f_pers_young_spec_id}, {dispatch,extra: api}) => {
    const {data} = await api.post<PostUpdates>(APIRoute.DataLine, {target_count, distribution_count, update_date, update_user, nsi_pers_indicate_id, f_pers_young_spec_id});
    dispatch(fetchLineDataAction());
    return data;
  }
);

export const postNewFormAction = createAsyncThunk<PostNewForm, PostNewForm, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'DATA/postNewForm',
  async ({insert_date, insert_user, org_employee, rep_beg_period, rep_end_period, update_date, update_user}, {extra: api}) => {
    const {data} = await api.post<PostNewForm>(APIRoute.Headers, {insert_date, insert_user, org_employee, rep_beg_period, rep_end_period, update_date, update_user});
    return data;
  }
);
