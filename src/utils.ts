import { DefaultColumnFilter } from "./Table/Filterable/filters"

const createType = () => {
  return {
    'f_pers_young_spec_id': 0,
    'insert_date': 'string',
    'insert_user': 'string',
    'org_employee': 'string',
    'rep_beg_period': 'string',
    'rep_end_period': 'string',
    'update_date': 'string',
    'update_user': 'string',
  }
}
export type TableType = ReturnType<typeof createType>


// настройки колонки по умолчанию
export const defaultColumn = {
  Filter: DefaultColumnFilter,
  // https://github.com/TanStack/table/issues/2293
  filter: 'text'
}

