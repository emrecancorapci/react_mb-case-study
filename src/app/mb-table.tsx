// eslint-disable-next-line import/named
import { getCoreRowModel, useReactTable } from '@tanstack/react-table';

import { OrganizedMBData } from '@/types/organized-mb-data';

import { columns } from '../components/table/columns';
import MBTableHeader from '../components/table/mb-table-header';
import MBTableRow from '../components/table/mb-table-row';
import { Table } from '../components/ui/table';

export default function MBTable({ data }: { data: OrganizedMBData[] }): JSX.Element {
  const table = useReactTable({
    data: data,
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
    </>
  );
}
