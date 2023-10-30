import { v4 as uuidv4 } from 'uuid';

import { FormattedData } from '@/types/formatted-data';

import { TableBody, TableCell, TableRow } from '../ui/table';
import { columns } from './columns';
import MBTableRow from './mb-table-row';

export default function MBTableBody({ data }: { data: FormattedData[] }) {
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
