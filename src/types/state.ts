import { Status } from '../const';
import { store } from '../store';
import { DataLineData } from './data-line';
import { HeaderData } from './header';
import { LineData } from './lines';


export type State = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;


export type HeadersData = {
  headers: HeaderData[];
  isDataLoading: boolean;
  status: Status;
  rowActive: number | null;
  activeHeader: HeaderData | null;
  isNewForm: boolean;
  newFormPostStatus: Status;
};

export type LinesData = {
  lines: LineData[];
  isDataLoading: boolean;
  status: Status;
};

export type DataByLineData = {
  dataLine: DataLineData[];
  isDataLoading: boolean;
  status: Status;
  activeForm: DataLineData | null;
  isItemDataLoading: boolean;
  isFormActive: boolean;
  activeIdForm: number | null;
  activeLine: DataLineData | null;
  isWatchButton: boolean;
};

