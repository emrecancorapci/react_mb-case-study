import { type ColumnDef, flexRender, type Table } from '@tanstack/react-table';

import { OrganizedMBData } from '@/types/organized-mb-data';

import { TableBody, TableCell, TableRow } from '../ui/table';

export default function MBTableRow({
  table,
  columns,
}: {
  table: Table<OrganizedMBData>;
  columns: ColumnDef<OrganizedMBData>[];
}) {
  return (
    <TableBody>
      {table.getRowModel().rows.length > 0 ? (
        table.getRowModel().rows.map((row) => (
          <TableRow key={row.id} data-state={row.getIsSelected() && 'selected'}>
            {row.getVisibleCells().map((cell) => (
              <TableCell key={cell.id}>{flexRender(cell.column.columnDef.cell, cell.getContext())}</TableCell>
            ))}
          </TableRow>
        ))
      ) : (
        <TableRow>
          <TableCell colSpan={columns.length} className="h-24 text-center">
            No data
          </TableCell>
        </TableRow>
      )}
    </TableBody>
  );
}
