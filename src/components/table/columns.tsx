import { LinkIcon } from 'lucide-react';
import { Link } from 'react-router-dom';

import { FormattedData } from '@/types/formatted-data';
import { MBColumn } from '@/types/mb-column';

import { Button } from '../ui/button';

export const columns: MBColumn<FormattedData>[] = [
  {
    order: 1,
    id: 'uploaded_variation',
    name: 'Uploaded Variation',
    CellWrapper: ({ children }: { children: string | number | null | undefined }) => (
      <p className="max-w-xs break-words">{children}</p>
    ),
  },
  {
    order: 2,
    id: 'existing_variation',
    name: 'Existing Variation',
  },
  {
    order: 3,
    id: 'symbol',
    name: 'Symbol',
    headerClass: 'justify-center',
    CellWrapper: ({ children }: { children: string | number | null | undefined }) => {
      return <p className="text-center">{children}</p>;
    },
  },
  {
    order: 4,
    id: 'af_vcf',
    name: 'Allele Frequency',
    CellWrapper: ({ children }: { children: string | number | null | undefined }) => {
      return <p className="text-center">{children}</p>;
    },
  },
  {
    order: 5,
    id: 'depth',
    name: 'Depth',
    headerClass: 'justify-center',
    CellWrapper: ({ children }: { children: string | number | null | undefined }) => {
      return <p className="text-center">{children}</p>;
    },
  },
  {
    order: 6,
    id: 'dann_score',
    name: 'Dann Score',
    headerClass: 'justify-center',
    CellWrapper: ({ children }: { children: string | number | null | undefined }) => {
      return <p className="text-center">{children}</p>;
    },
  },
  {
    order: 7,
    id: 'mondo',
    name: 'Mondo',
    CellWrapper: ({ children }: { children: string | number | null | undefined }) => {
      return <p className="max-w-[72px] break-words">{children}</p>;
    },
  },
  {
    order: 8,
    id: 'pheno_pubmed',
    name: 'Pheno Pubmed',
    headerClass: 'justify-center',
    CellWrapper: ({ children }: { children: string | number | null | undefined }) => {
      return typeof children === 'string' ? (
        <Link className="flex w-full justify-center" to={children}>
          <Button className="h-8 px-2 py-0">
            <LinkIcon size={16} />
          </Button>
        </Link>
      ) : (
        <p>{children}</p>
      );
    },
  },
  {
    order: 9,
    id: 'provean',
    name: 'Provean',
    headerClass: 'justify-center',
    CellWrapper: ({ children }: { children: string | number | null | undefined }) => {
      return typeof children === 'string' ? (
        <Link className="flex w-full justify-center" to={children}>
          <Button className="h-8 px-2 py-0">
            <LinkIcon size={16} />
          </Button>
        </Link>
      ) : (
        <p>{children}</p>
      );
    },
  },
];
