import { OrganizedMBData } from '@/types/organized-mb-data';

import { columns } from '../components/table/columns';
import MBTableHeader from '../components/table/mb-table-header';
import MBTableRow from '../components/table/mb-table-row';
import { Table } from '../components/ui/table';

export default function MBTable({ data }: { data: OrganizedMBData[] }): JSX.Element {
  return (
    <>
      <div className="rounded-lg border">
        <Table>
          <MBTableHeader columns={columns} />
          <MBTableRow data={data} columns={columns} />
        </Table>
      </div>
    </>
  );
}
