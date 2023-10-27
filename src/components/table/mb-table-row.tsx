import { v4 as uuidv4 } from 'uuid';

import { MBColumn } from '@/types/mb-column';
import { OrganizedMBData } from '@/types/organized-mb-data';

import { TableBody, TableCell, TableRow } from '../ui/table';

export default function MBTableRow({
  data,
  columns,
}: {
  data: OrganizedMBData[];
  columns: MBColumn<OrganizedMBData>[];
}) {
  return (
    <TableBody>
      {data.length > 0 ? (
        data.map((row) => (
          <TableRow key={uuidv4()}>
            {columns
              .sort((a, b) => a.order - b.order)
              .map((cell) => (
                <TableCell key={cell.id}>
                  {cell.CellWrapper === undefined ? (
                    <>{row[cell.id]}</>
                  ) : (
                    <cell.CellWrapper>{row[cell.id]}</cell.CellWrapper>
                  )}
                </TableCell>
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
