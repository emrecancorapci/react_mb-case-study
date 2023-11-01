import { TableHeader, TableRow } from '../ui/table';
import { columns } from './columns';
import MBTableHead from './mb-table-head';

export default function MBTableHeader() {
  return (
    <TableHeader>
      <TableRow>
        {columns
          .sort((a, b) => a.order - b.order)
          .map(({ id, headerClass, name }) => (
            <MBTableHead key={id} id={id} headerClass={headerClass} name={name} />
          ))}
      </TableRow>
    </TableHeader>
  );
}
