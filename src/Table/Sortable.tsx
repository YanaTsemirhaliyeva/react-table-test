import { DataLineData } from '@/types/data-line'
import { HeaderData } from '@/types/header'
import { LineData } from '@/types/lines'
import { useMemo } from 'react'
import { BiSortAlt2, BiSortDown, BiSortUp } from 'react-icons/bi'
import { Column, SortByFn, useSortBy, useTable } from 'react-table'


type SortableProps = {
  headers: HeaderData[];
  lines: LineData[];
  dataLine: DataLineData[];
}


export default function Sortable({headers}: SortableProps) {
  const data = useMemo(() => headers, [headers]);

// типы сортировок
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const sortTypes: Record<string, SortByFn<any>> = {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  string: (rowA, rowB, columnId, desc) => {
    const [a, b] = [rowA.values[columnId], rowB.values[columnId]] as [
      string,
      string
    ]

    return a.localeCompare(b, 'ru')
  }
}

    // определения колонок
  const columns: Column[] = useMemo(() => [
    {
      Header: 'ЗА ПЕРИОД',
      accessor: 'rep_beg_period',
      sortType: 'string'
    },
    {
      Header: 'ГОД',
      accessor: 'rep_end_period',
      sortType: 'string'
    },
    {
      Header: 'ОРГАНИЗАЦИЯ',
      accessor: 'org_employee',
      sortType: 'string'
    },
  ],[])

  // создаем экземпляр таблицы
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow
  } = useTable({ columns, data, sortTypes }, useSortBy)

  return (
    <>
      <h1>Sortable Table</h1>
      <div className='table-wrapper'>
        <table {...getTableProps()}>
          <thead>
            {headerGroups.map((hG) => (
              <tr {...hG.getHeaderGroupProps()}>
                {hG.headers.map((col) => (
                  <th {...col.getHeaderProps(col.getSortByToggleProps())}>
                    {col.render('Header')}{' '}
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
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody {...getTableBodyProps()}>
            {rows.map((row) => {
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
    </>
  )
}
