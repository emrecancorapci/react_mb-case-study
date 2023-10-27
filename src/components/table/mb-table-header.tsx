import { MBColumn } from '@/types/mb-column';
import { OrganizedMBData } from '@/types/organized-mb-data';

import { TableHeader, TableRow } from '../ui/table';
import MBTableHead from './mb-table-head';

export default function MBTableHeader({ columns }: { columns: MBColumn<OrganizedMBData>[] }) {
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
