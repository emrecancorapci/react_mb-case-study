import { v4 as uuidv4 } from 'uuid';

import { MBColumn } from '@/types/mb-column';
import { OrganizedMBData } from '@/types/organized-mb-data';

import { TableBody, TableCell, TableRow } from '../ui/table';
import MBTableRow from './mb-table-row';

export default function MBTableBody({
  data,
  columns,
}: {
  data: OrganizedMBData[];
  columns: MBColumn<OrganizedMBData>[];
}) {
  return (
    <TableBody>
      {data.length > 0 ? (
        data.map((row) => <MBTableRow key={uuidv4()} row={row} />)
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
