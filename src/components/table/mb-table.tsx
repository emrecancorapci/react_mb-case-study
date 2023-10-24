import { Table, TableHeader, TableBody } from '../ui/table';
// eslint-disable-next-line import/named
import { useReactTable, getCoreRowModel, getPaginationRowModel } from '@tanstack/react-table';
import { columns } from './columns';
import MBTableHeader from './mb-table-header';
import MBTableRow from './mb-table-row';
import { MBData } from '@/types/mb-data';

import { dataFormatter } from './data-formatter';

export default function MBTable({ data }: { data: MBData[] }): JSX.Element {
  const table = useReactTable({
    data: dataFormatter(data),
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
  });
  return (
    <div className="rounded-lg border">
      <Table>
        <TableHeader>
          <MBTableHeader table={table} />
        </TableHeader>
        <TableBody>
          <MBTableRow table={table} columns={columns} />
        </TableBody>
      </Table>
    </div>
  );
}
