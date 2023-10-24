import { Table, TableHeader, TableBody } from '../ui/table';
// eslint-disable-next-line import/named
import { useReactTable, getCoreRowModel } from '@tanstack/react-table';
import { columns } from './columns';
import MBTableHeader from './mb-table-header';
import MBTableRow from './mb-table-row';
import { OrganizedMBData } from '@/types/organized-mb-data';
import { MBData } from '@/types/mb-data';

export default function MBTable({ data }: { data: MBData[] }): JSX.Element {
  const organizedData: OrganizedMBData[] = data.map((item: MBData) => {
    return {
      uploaded_variation: item['main.uploaded_variation'],
      existing_variation: item['main.existing_variation'],
      symbol: item['main.symbol'],
      af_vcf: item['main.af_vcf'],
      dp: item['main.dp'],
      dann_score: item['details2.dann_score'],
      pheno_pubmed: item['links.pheno pubmed'],
      mondo: item['links.mondo'],
      provean: item['details2.provean'],
    };
  });
  const table = useReactTable({ data: organizedData, columns, getCoreRowModel: getCoreRowModel() });
  return (
    <Table>
      <TableHeader>
        <MBTableHeader table={table} />
      </TableHeader>
      <TableBody>
        <MBTableRow table={table} columns={columns} />
      </TableBody>
    </Table>
  );
}
