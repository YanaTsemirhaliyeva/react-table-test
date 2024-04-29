export enum NameSpace {
  Headers = 'HEADERS',
  Lines = 'LINES',
  DataByLine = 'DATA_LINE',
}

export enum Status {
  Idle = 'idle',
  Loading = 'loading',
  Success = 'success',
  Error = 'error'
}

export enum AppRoute {
  Index = '/',
}

export enum APIRoute {
  Headers = '/f_pers_young_spec/',
  Lines = '/nsi_pers_young_spec/',
  DataLine = '/f_pers_young_spec_line/',
  FormItem = '/f_pers_young_spec_line/:lineId',
}
