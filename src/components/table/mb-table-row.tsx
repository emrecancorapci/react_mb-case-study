import { type Table, type ColumnDef, flexRender } from '@tanstack/react-table';

import { TableRow, TableCell } from '../ui/table';
import { OrganizedMBData } from '@/types/organized-mb-data';

export default function MBTableRow({
  table,
  columns,
}: {
  table: Table<OrganizedMBData>;
  columns: ColumnDef<OrganizedMBData>[];
}) {
  return (
    <>
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
    </>
  );
}
