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
    header: () => <p className="text-center">{'Existing Variation'}</p>,
  },
  {
    accessorKey: 'symbol',
    header: () => <p className="text-center">{'Symbol'}</p>,
  },
  {
    accessorKey: 'af_vcf',
    header: () => <p className="text-center">{'Main Symbol'}</p>,
  },
  {
    accessorKey: 'dp',
    header: () => <p className="text-center">{'DP'}</p>,
  },
  {
    accessorKey: 'dann_score',
    header: () => <p className="text-center">{'Dann Score'}</p>,
  },
  {
    accessorKey: 'mondo',
    header: () => <p className="text-center">{'Mondo Link'}</p>,
    cell: ({ row }) => {
      return <p className="max-w-[72px] break-words">{row.getValue('mondo')}</p>;
    },
  },
  {
    accessorKey: 'pheno_pubmed',
    header: () => <p className="text-center">{'Pheno Pubmed'}</p>,
    cell: ({ row }) => {
      return (
        <Link className="flex w-full justify-center" to={row.getValue('pheno_pubmed')}>
          <Button>
            <LinkIcon size={16} />
          </Button>
        </Link>
      );
    },
  },
  {
    accessorKey: 'provean',
    header: 'Provean',
    cell: ({ row }) => {
      return (
        <Link className="flex w-full justify-center" to={row.getValue('provean')}>
          <Button>
            <LinkIcon size={16} />
          </Button>
        </Link>
      );
    },
  },
];
