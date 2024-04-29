import { Column, usePagination, useTable } from 'react-table'
import Pagination from './Pagination'
import { useMemo } from 'react'
import { HeaderData } from '@/types/header';

type PaginatedProps = {
  data: HeaderData[];
}


export default function Paginated({data}: PaginatedProps) {

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
    prepareRow,
    state: { pageIndex, pageSize },
    page,
    canPreviousPage,
    canNextPage,
    pageCount,
    gotoPage,
    nextPage,
    previousPage,
    setPageSize
  } = useTable(
    {
      columns,
      data,
      // начальный размер страницы
      initialState: {
        pageSize: 10
      }
    },
    usePagination
  )

  return (
    <>
      <h1>Paginated Table</h1>
      <div className='table-wrapper'>
        <table {...getTableProps()}>
          <thead>
            {headerGroups.map((hG) => (
              <tr {...hG.getHeaderGroupProps()}>
                {hG.headers.map((col) => (
                  <th {...col.getHeaderProps()}>{col.render('Header')}</th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody {...getTableBodyProps()}>
            {page.map((row) => {
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
      <br />
      <div>
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
        {/* информация о пагинации */}
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
        </pre>
      </div>
    </>
  )
}
