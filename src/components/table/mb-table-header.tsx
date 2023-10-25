import { flexRender, type Table } from '@tanstack/react-table';

import { OrganizedMBData } from '@/types/organized-mb-data';

import { TableHead, TableHeader, TableRow } from '../ui/table';

export default function MBTableHeader({ table }: { table: Table<OrganizedMBData> }) {
  return (
    <TableHeader>
      {table.getHeaderGroups().map((headerGroup) => (
        <TableRow key={headerGroup.id}>
          {headerGroup.headers.map((header) => (
            <TableHead key={header.id}>
              {header.isPlaceholder ? undefined : flexRender(header.column.columnDef.header, header.getContext())}
            </TableHead>
          ))}
        </TableRow>
      ))}
    </TableHeader>
  );
}
