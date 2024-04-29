import { HeaderData } from '@/types/header';
import { NameSpace, Status } from '../../const';
import { State } from '../../types/state';

export const getHeaders = (state: State): HeaderData[] => state[NameSpace.Headers].headers;
export const isHeadersDataLoading = (state: State): boolean => state[NameSpace.Headers].isDataLoading;

export const getRowActive = (state: State): number | null => state[NameSpace.Headers].rowActive;
export const getActiveHeader = (state: State): HeaderData | null => state[NameSpace.Headers].activeHeader;

export const isNewForm = (state: State): boolean => state[NameSpace.Headers].isNewForm;

export const getPostNewFormStatus = (state: State): Status => state[NameSpace.Headers].newFormPostStatus;
