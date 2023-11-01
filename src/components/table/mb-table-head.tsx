import { ArrowBigDownDashIcon, ArrowBigUpDashIcon } from 'lucide-react';

import { useFilterStore } from '@/stores/filter-store';
import { FormattedDataType } from '@/types/formatted-data';

import { TableHead } from '../ui/table';

interface MBTableHeadProperties {
  id: FormattedDataType;
  headerClass: string | undefined;
  name: string;
}

export default function MBTableHead({ id, headerClass, name }: MBTableHeadProperties) {
  const [setSorting, sorting] = useFilterStore((state) => [state.setSorting, state.sorting]);

  const Icon = () => {
    if (sorting === undefined) return <></>;
    if (Object.keys(sorting)[0] !== id) return <></>;

    return sorting[id] === 'DESC' ? <ArrowBigDownDashIcon size={16} /> : <ArrowBigUpDashIcon size={16} />;
  };

  return (
    <TableHead
      className="cursor-pointer"
      onClick={() => {
        setSorting(id);
      }}
      key={id}
    >
      <span className={`flex items-center ${headerClass}`}>
        <p className="max-w-[96px] text-center font-semibold">{name}</p>
        <Icon />
      </span>
    </TableHead>
  );
}
