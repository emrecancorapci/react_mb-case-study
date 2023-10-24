import { type Table, flexRender } from '@tanstack/react-table';

import { TableRow, TableHead } from '../ui/table';
import { OrganizedMBData } from '@/types/organized-mb-data';

export default function MBTableHeader({ table }: { table: Table<OrganizedMBData> }) {
  return (
    <>
      {table.getHeaderGroups().map((headerGroup) => (
        <TableRow key={headerGroup.id}>
          {headerGroup.headers.map((header) => (
            <TableHead key={header.id}>
              {header.isPlaceholder ? undefined : flexRender(header.column.columnDef.header, header.getContext())}
            </TableHead>
          ))}
        </TableRow>
      ))}
    </>
  );
}
