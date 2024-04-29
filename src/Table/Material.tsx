import { HeaderData } from '@/types/header';
import {MaterialReactTable, MRT_ColumnDef } from 'material-react-table'
import { useMemo } from 'react'

type MaterialProps = {
  data: HeaderData[];
}

export default function Material({data}: MaterialProps) {
  // сигнатура определения колонки немного отличается от React Table
  const columns: MRT_ColumnDef<{}>[] = useMemo(() => [
    {
      header: 'ЗА ПЕРИОД',
      accessorKey: 'rep_beg_period',
    },
    {
      header: 'ГОД',
      accessorKey: 'rep_end_period',
    },
    {
      header: 'ОРГАНИЗАЦИЯ',
      accessorKey: 'org_employee',
    },
  ],[])

  // вуаля!
  return (
    <>
      <h1>Material UI</h1>
      <MaterialReactTable
        columns={columns}
        data={data}
        enableRowSelection
        initialState={{ density: 'compact' }}
      />
    </>

  )
}
