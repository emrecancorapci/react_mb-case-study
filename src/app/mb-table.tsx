// eslint-disable-next-line import/named
import { getCoreRowModel, useReactTable } from '@tanstack/react-table';

import { MBData } from '@/types/mb-data';

import { columns } from '../components/table/columns';
import { dataFormatter } from '../components/table/data-formatter';
import MBTableHeader from '../components/table/mb-table-header';
import MBTableRow from '../components/table/mb-table-row';
import { Button } from '../components/ui/button';
import { Table } from '../components/ui/table';

export default function MBTable({ data }: { data: MBData[] }): JSX.Element {
  const table = useReactTable({
    data: dataFormatter(data),
    columns,
    getCoreRowModel: getCoreRowModel(),
  });
  return (
    <>
      <div className="rounded-lg border">
        <Table>
          <MBTableHeader table={table} />
          <MBTableRow table={table} columns={columns} />
        </Table>
      </div>
      <div className="flex flex-row justify-end gap-4 p-4">
        <Button onClick={() => table.previousPage()} disabled={!table.getCanPreviousPage()}>
          Önceki
        </Button>
        <Button onClick={() => table.nextPage()} disabled={!table.getCanNextPage()}>
          Sonraki
        </Button>
      </div>
    </>
  );
}
