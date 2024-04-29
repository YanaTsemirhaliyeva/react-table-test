import { NameSpace, Status } from '../../const';
import { State } from '../../types/state';
import { DataLineData } from '@/types/data-line';

export const getDataByLine = (state: State): DataLineData[] => state[NameSpace.DataByLine].dataLine;
export const isDataLineDataLoading = (state: State): boolean => state[NameSpace.DataByLine].isDataLoading;

export const getFormItem = (state: State): DataLineData | null => state[NameSpace.DataByLine].activeForm;
export const isFormItemStatusLoading = (state: State): boolean => state[NameSpace.DataByLine].isItemDataLoading;

export const isFormActive = (state: State): boolean => state[NameSpace.DataByLine].isFormActive;

export const getActiveLine = (state: State): DataLineData | null => state[NameSpace.DataByLine].activeLine;
export const getActiveIdForm = (state: State): number | null => state[NameSpace.DataByLine].activeIdForm;

export const getPostUpdatesStatus = (state: State): Status => state[NameSpace.DataByLine].status;

export const isWatchButton = (state: State): boolean => state[NameSpace.DataByLine].isWatchButton;
