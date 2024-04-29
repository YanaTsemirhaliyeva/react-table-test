import { LineData } from '@/types/lines';
import { NameSpace } from '../../const';
import { State } from '../../types/state';

export const getLines = (state: State): LineData[] => state[NameSpace.Lines].lines;
export const isLinesDataLoading = (state: State): boolean => state[NameSpace.Lines].isDataLoading;
