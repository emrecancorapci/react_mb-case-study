import { ArrowBigDownDashIcon, ArrowBigUpDashIcon } from 'lucide-react';

import { useFilterStore } from '@/stores/use-filter-store';
import { MBColumn } from '@/types/mb-column';
import { OrganizedMBData } from '@/types/organized-mb-data';

import { TableHead } from '../ui/table';

export default function MBTableHead({ column }: { column: MBColumn<OrganizedMBData> }) {
  const [setSorting, sorting] = useFilterStore((state) => [state.setSorting, state.sorting]);
  return (
    <TableHead
      className="cursor-pointer"
      onClick={() => {
        setSorting(column.id);
      }}
      key={column.id}
    >
      <span className={`flex font-semibold ${column.headerClass}`}>
        {column.name}
        {sorting === undefined ? undefined : Object.keys(sorting)[0] === column.id ? (
          sorting[column.id] === 'DESC' ? (
            <ArrowBigDownDashIcon size={16} />
          ) : (
            <ArrowBigUpDashIcon size={16} />
          )
        ) : (
          <div className="w-16"></div>
        )}
      </span>
    </TableHead>
  );
}