import { TableHeader, TableRow } from '../ui/table';
import { columns } from './columns';
import MBTableHead from './mb-table-head';

export default function MBTableHeader() {
  return (
    <TableHeader>
      <TableRow>
        {columns
          .sort((a, b) => a.order - b.order)
          .map((column) => (
            <MBTableHead key={column.id} column={column} />
          ))}
      </TableRow>
    </TableHeader>
  );
}
