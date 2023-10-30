import { FormattedData } from '@/types/formatted-data';

import MBTableBody from '../components/table/mb-table-body';
import MBTableHeader from '../components/table/mb-table-header';
import { Table } from '../components/ui/table';

export default function MBTable({ data }: { data: FormattedData[] }): JSX.Element {
  return (
    <div className="rounded-lg border">
      <Table>
        <MBTableHeader />
        <MBTableBody data={data} />
      </Table>
    </div>
  );
}
