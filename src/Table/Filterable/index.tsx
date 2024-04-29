/* eslint-disable @typescript-eslint/no-unused-vars */
import { Column, useFilters, useGlobalFilter, useTable } from 'react-table'
import {
  DefaultColumnFilter,
  filterGreaterThanOrEqual,
  filterTypes,
  GlobalFilter,
  NumberRangeColumnFilter,
  SelectColumnFilter,
  SliderColumnFilter
} from './filters'
import { useMemo } from 'react'
import { HeaderData } from '@/types/header'


type FilterableProps = {
  data: HeaderData[];
}



// настройки колонки по умолчанию
export const defaultColumn = {
  Filter: DefaultColumnFilter,
  // https://github.com/TanStack/table/issues/2293
  filter: 'text'
}

export default function Filterable({data}: FilterableProps) {

  const columns: Column[] = useMemo(() => [
    {
      Header: 'ЗА ПЕРИОД',
      accessor: 'rep_beg_period',
      filter: 'fuzzyText'
    },
    {
      Header: 'ГОД',
      accessor: 'rep_end_period',
      filter: 'fuzzyText'
    },
    {
      Header: 'ОРГАНИЗАЦИЯ',
      accessor: 'org_employee',
      filter: 'fuzzyText'
    },
  ],[])

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
    // новые штуки
    state,
    visibleColumns,
    preGlobalFilteredRows,
    setGlobalFilter
  } = useTable(
    { columns, data, defaultColumn, filterTypes },
    useGlobalFilter,
    useFilters
  )


  return (
    <>
      <h1>Filterable Table</h1>
      <div className='table-wrapper'>
        <table {...getTableProps()}>
          <thead>
            {headerGroups.map((hG) => (
              <tr {...hG.getHeaderGroupProps()}>
                {hG.headers.map((col) => (
                  <th {...col.getHeaderProps()}>
                    {col.render('Header')}
                    {/* рендерим компонент фильтра колонки в случае, если колонка является фильтруемой */}
                    {col.canFilter ? <div>{col.render('Filter')}</div> : null}
                  </th>
                ))}
              </tr>
            ))}
            <tr>
              <th colSpan={visibleColumns.length}>
                {/* компонент глобального фильтра */}
                <GlobalFilter
                  preGlobalFilteredRows={preGlobalFilteredRows}
                  globalFilter={state.globalFilter}
                  setGlobalFilter={setGlobalFilter}
                />
              </th>
            </tr>
          </thead>
          <tbody {...getTableBodyProps()}>
            {rows.map((row, i) => {
              prepareRow(row)
              return (
                <tr {...row.getRowProps()}>
                  {row.cells.map((cell) => (
                    <td {...cell.getCellProps()}>{cell.render('Cell')}</td>
                  ))}
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>
      <div>
        {/* количество отфильтрованных строк */}
        <p>Filtered rows count: {rows.length}</p>
        {/* выбранные фильтры */}
        <pre>
          <code>{JSON.stringify(state.filters, null, 2)}</code>
        </pre>
      </div>
    </>
  )
}
