import { OrganizedMBData } from '@/types/organized-mb-data';
import { type ColumnDef } from '@tanstack/react-table';
import { Button } from '../ui/button';
import { Link } from 'react-router-dom';
import { LinkIcon } from 'lucide-react';

export const columns: ColumnDef<OrganizedMBData>[] = [
  {
    accessorKey: 'uploaded_variation',
    header: 'Uploaded Variation',
    cell: ({ row }) => {
      return <p className="max-w-xs break-words">{row.getValue('uploaded_variation')}</p>;
    },
  },
  {
    accessorKey: 'existing_variation',
    header: () => (
      <>
        <p className="text-center">Existing</p>
        <p className="text-center">Variation</p>
      </>
    ),
    cell: ({ row }) => {
      return <p className="text-center">{row.getValue('existing_variation')}</p>;
    },
  },
  {
    accessorKey: 'symbol',
    header: () => <p className="text-center">{'Symbol'}</p>,
    cell: ({ row }) => {
      return <p className="text-center">{row.getValue('symbol')}</p>;
    },
  },
  {
    accessorKey: 'af_vcf',
    header: () => <p className="text-center">{'AF VCF'}</p>,
    cell: ({ row }) => {
      return <p className="text-center">{row.getValue('af_vcf')}</p>;
    },
  },
  {
    accessorKey: 'dp',
    header: () => <p className="text-center">{'DP'}</p>,
    cell: ({ row }) => {
      return <p className="text-center">{row.getValue('dp')}</p>;
    },
  },
  {
    accessorKey: 'dann_score',
    header: () => (
      <>
        <p className="text-center">Dann</p>
        <p className="text-center">Score</p>
      </>
    ),
    cell: ({ row }) => {
      return <p className="text-center">{row.getValue('dann_score')}</p>;
    },
  },
  {
    accessorKey: 'mondo',
    header: () => (
      <>
        <p className="text-center">Mondo</p>
      </>
    ),
    cell: ({ row }) => {
      return <p className="max-w-[72px] break-words">{row.getValue('mondo')}</p>;
    },
  },
  {
    accessorKey: 'pheno_pubmed',
    header: () => (
      <>
        <p className="text-center">Pheno</p>
        <p className="text-center">Pubmed</p>
      </>
    ),
    cell: ({ row }) => {
      return (
        <Link className="flex w-full justify-center" to={row.getValue('pheno_pubmed')}>
          <Button className="h-8 px-2 py-0">
            <LinkIcon size={16} />
          </Button>
        </Link>
      );
    },
  },
  {
    accessorKey: 'provean',
    header: () => <p className="text-center">Provean</p>,
    cell: ({ row }) => {
      return (
        <Link className="flex w-full justify-center" to={row.getValue('provean')}>
          <Button className="h-8 px-2 py-0">
            <LinkIcon size={16} />
          </Button>
        </Link>
      );
    },
  },
];
