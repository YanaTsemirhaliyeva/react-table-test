/* eslint-disable @typescript-eslint/no-explicit-any */
import { BiSortAlt2, BiSortDown, BiSortUp } from 'react-icons/bi'
import {
  Row,
  useFilters,
  useGlobalFilter,
  usePagination,
  useRowSelect,
  useSortBy,
  useTable,
  Column,
  SortByFn,
  // CellProps,
  // HeaderGroup,
  // Meta,
  // Cell
} from 'react-table'

import {
  filterTypes,
  GlobalFilter,
} from './Filterable/filters'
import { defaultColumn } from '@/utils'
import Pagination from './Paginated/Pagination'
import { IndeterminateCheckbox } from './Selectable'
import { useMemo } from 'react'
import { HeaderData } from '@/types/header'
import Layout from '@/components/layout/layout'
import { useAppDispatch, useAppSelector } from '@/hooks'
import { setActiveHeader, setRowActive } from '@/store/headers/headers.slice'
import { getRowActive } from '@/store/headers/headers.selectors'
import './styles.css'
import { setActiveIdForm } from '@/store/data-line/data-line.slice'
import { TableType } from '@/utils'


// типы сортировок
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const sortTypes: Record<string, SortByFn<any>> = {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  string: (rowA, rowB, columnId) => {
    const [a, b] = [rowA.values[columnId], rowB.values[columnId]] as [
      string,
      string
    ]

    return a.localeCompare(b, 'ru')
  }
}

type ComplexProps = {
  data: HeaderData[];
}

export default function Complex({data}: ComplexProps) {
  const dispatch = useAppDispatch();
  const activeRowId = useAppSelector(getRowActive);

  const columns: Column<TableType>[] = useMemo(() => [
    {
      Header: 'ЗА ПЕРИОД',
      accessor: ({rep_beg_period, rep_end_period}) =>
        new Date(rep_beg_period).toLocaleString('ru', { month: 'long' })
        === new Date(rep_end_period).toLocaleString('ru', { month: 'long' })
        ? new Date(rep_beg_period).toLocaleString('ru', { month: 'long' })
        : new Date(rep_beg_period).toLocaleString('ru', { month: 'long' }) + '-' + new Date(rep_end_period).toLocaleString('ru', { month: 'long' }),
      sortType: 'string',
      filter: 'fuzzyText'
    },
    {
      Header: 'ГОД',
      accessor: ({rep_end_period}) =>  new Date(rep_end_period).toLocaleString('ru', {year: 'numeric' }),
      sortType: 'string',
      filter: 'fuzzyText'
    },
    {
      Header: 'ОРГАНИЗАЦИЯ',
      accessor: 'org_employee',
      sortType: 'string',
      filter: 'fuzzyText'
    },
  ],[])

  const {
    // обязательные штуки
    getTableProps,
    getTableBodyProps,
    headerGroups,
    prepareRow,
    // состояние
    state: { globalFilter, pageIndex, pageSize, filters },
    // фильтрация
    visibleColumns,
    preGlobalFilteredRows,
    setGlobalFilter,
    // пагинация
    page,
    canPreviousPage,
    canNextPage,
    pageCount,
    gotoPage,
    nextPage,
    previousPage,
    setPageSize,
    // выбор строк
    selectedFlatRows
  } = useTable(
    // настройки
    {
      columns,
      data,
      sortTypes,
      defaultColumn,
      filterTypes,
      initialState: {
        pageSize: 10
      }
    },
    // плагины
    useGlobalFilter,
    useFilters,
    useSortBy,
    usePagination,
    useRowSelect,
    // встроенные хуки
    ({ visibleColumns }) => {
      visibleColumns.push((cols) => [
        {
          id: 'selection',
          Header: ({ getToggleAllRowsSelectedProps }) => (
            <IndeterminateCheckbox {...getToggleAllRowsSelectedProps()} />
          ),
          Cell: ({ row }: {row: Row<TableType>} ) => (
            <IndeterminateCheckbox {...row.getToggleRowSelectedProps()} />
          )
        },
        ...cols
      ])
    }
  )

  const onRowClickHandler = (row: HeaderData) => {
    dispatch(setRowActive(row.f_pers_young_spec_id));
    dispatch(setActiveIdForm(row.f_pers_young_spec_id));
    dispatch(setActiveHeader(row));
  }

  return (
    <Layout>
      <div className='table-wrapper'>
        <table {...getTableProps()}>
          <thead>
            {headerGroups.map((hG) => (
              <tr {...hG.getHeaderGroupProps()}>
                {hG.headers.map((col) => (
                  <th {...col.getHeaderProps(col.getSortByToggleProps())}>
                    {col.render('Header')}
                    {/* иконка сортировки */}
                    {col.canSort && (
                      <span>
                        {col.isSorted ? (
                          col.isSortedDesc ? (
                            <BiSortUp />
                          ) : (
                            <BiSortDown />
                          )
                        ) : (
                          <BiSortAlt2 />
                        )}
                      </span>
                    )}
                    {/* UI фильтра */}
                    {col.canFilter ? <div>{col.render('Filter')}</div> : null}
                  </th>
                ))}
              </tr>
            ))}
            <tr>
              <th colSpan={visibleColumns.length}>
                {/* глобальный фильтр */}
                <GlobalFilter
                  preGlobalFilteredRows={preGlobalFilteredRows}
                  globalFilter={globalFilter}
                  setGlobalFilter={setGlobalFilter}
                />
              </th>
            </tr>
          </thead>
          <tbody {...getTableBodyProps()}>
            {page.map((row) => {
              prepareRow(row)
              const activeRow = activeRowId === row.original.f_pers_young_spec_id;
              const className = activeRow ? 'row--active' : '';

              return (
                <tr className={className} {...row.getRowProps()} onClick={()=> onRowClickHandler(row.original)}>
                  {row.cells.map((cell) => (
                    <td {...cell.getCellProps()}>{cell.render('Cell')}</td>
                  ))}
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>
      <br />
      {/* пагинация */}
      <Pagination
        gotoPage={gotoPage}
        canPreviousPage={canPreviousPage}
        canNextPage={canNextPage}
        pageCount={pageCount}
        nextPage={nextPage}
        previousPage={previousPage}
        setPageSize={setPageSize}
        pageIndex={pageIndex}
        pageSize={pageSize}
      />
      {/* информация */}
      <div>
        {/* выбранные фильтры */}
        <p>Filters</p>
        <pre>
          <code>{JSON.stringify(filters, null, 2)}</code>
        </pre>
        {/* состояние пагинации */}
        {/* <p>Pagination state</p>
        <pre>
          <code>
            {JSON.stringify(
              {
                pageIndex,
                pageSize,
                pageCount,
                canNextPage,
                canPreviousPage
              },
              null,
              2
            )}
          </code>
        </pre> */}
        {/* выбранные строки */}
        <p>Selected rows</p>
        <pre>
          <code>
            {JSON.stringify(
              selectedFlatRows.map((d) => d.original),
              null,
              2
            )}
          </code>
        </pre>
      </div>
    </Layout>
  )
}

