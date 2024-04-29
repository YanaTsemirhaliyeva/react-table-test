import { combineReducers } from '@reduxjs/toolkit';
import { NameSpace } from '../const';
import { headers } from './headers/headers.slice';
import { lines } from './lines/lines.slice';
import { dataLine } from './data-line/data-line.slice';

export const rootReducer = combineReducers({
  [NameSpace.Headers]: headers.reducer,
  [NameSpace.Lines]: lines.reducer,
  [NameSpace.DataByLine]: dataLine.reducer,
});
