import { keepPreviousData, useQuery } from '@tanstack/react-query';
import { LoaderIcon } from 'lucide-react';
import { useEffect, useState } from 'react';

import MBTable from '@/app/mb-table';
import TableHeader from '@/components/table/table-header';
import TableFooter from '@/components/table-footer';
import usePagination from '@/hooks/usePagination';
import { dataFetcher } from '@/lib/data-fetcher';
import { dataFormatter } from '@/lib/data-formatter';
import { useFilterStore } from '@/stores/use-filter-store';
import { MBData } from '@/types/mb-data';
import { ResponseModel } from '@/types/response-model';

export default function Home(): JSX.Element {
  const fetchSize = 100;
  const { pageIndex, serverPageIndex, startIndex, endIndex, nextPage, previousPage, setPageSize } = usePagination({
    defaults: { fetchSize },
  });

  const [filters, sorting] = useFilterStore((state) => [state.filters, state.sorting]);
  const [shownData, setShownData] = useState<MBData[]>([]);

  const { data, error, isError, isLoading, isFetching } = useQuery<ResponseModel<MBData>, Error>({
    queryKey: ['data', { index: serverPageIndex, size: fetchSize, filters, sorting }],
    queryFn: () => dataFetcher(serverPageIndex, fetchSize, filters, sorting),
    placeholderData: keepPreviousData,
  });

  useEffect(() => {
    setShownData(data?.results.slice(startIndex, endIndex) ?? []);
  }, [data, startIndex, endIndex]);

  return (
    <div className="w-full max-w-screen-xl">
      {/* <TableHeader /> */}

      {isLoading || isFetching ? (
        <div className="flex w-full justify-center py-60">
          <LoaderIcon className="animate-spin" size={64} />
        </div>
      ) : isError ? (
        <p className="flex w-full rounded border border-destructive-foreground bg-destructive p-4">{error.message}</p>
      ) : (
        <MBTable data={dataFormatter(shownData)} />
      )}

      <TableFooter
        currentPage={pageIndex + 1}
        isNextPageAvailable={
          (data?.page ?? 1) * (data?.page_size ?? fetchSize) < (data?.count ?? fetchSize * serverPageIndex + 1) ?? false
        }
        setPageSize={setPageSize}
        nextPage={nextPage}
        previousPage={previousPage}
      />
    </div>
  );
}
