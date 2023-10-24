import { OrganizedMBData } from '@/types/organized-mb-data';
import { type ColumnDef } from '@tanstack/react-table';

export const columns: ColumnDef<OrganizedMBData>[] = [
  {
    accessorKey: 'uploaded_variation',
    header: 'Uploaded Variation',
  },
  {
    accessorKey: 'existing_variation',
    header: 'Existing Variation',
  },
  {
    accessorKey: 'symbol',
    header: 'Symbol',
  },
  {
    accessorKey: 'af_vcf',
    header: 'Main Symbol',
  },
  {
    accessorKey: 'dp',
    header: 'DP',
  },
  {
    accessorKey: 'dann_score',
    header: 'Dann Score',
  },
  {
    accessorKey: 'mondo',
    header: 'Mondo Link',
  },
  {
    accessorKey: 'pheno_pubmed',
    header: 'Pheno Pubmed',
  },
  {
    accessorKey: 'provean',
    header: 'Provean',
  },
];
