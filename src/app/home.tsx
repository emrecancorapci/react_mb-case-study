import { keepPreviousData, useQuery } from '@tanstack/react-query';
import { LoaderIcon } from 'lucide-react';
import { useEffect, useState } from 'react';

import MBTable from '@/app/mb-table';
import TableHeader from '@/components/table/table-header';
import TableFooter from '@/components/table-footer';
import { dataFetcher } from '@/lib/data-fetcher';
import { dataFormatter } from '@/lib/data-formatter';
import { useFilterStore } from '@/stores/use-filter-store';
import { MBData } from '@/types/mb-data';
import { ResponseModel } from '@/types/response-model';

export default function Home(): JSX.Element {
  const fetchSize = 100;

  const [{ pageIndex, pageSize, currentServerPageIndex }, setPagination] = useState<Pagination>({
    pageIndex: 0,
    pageSize: 10,
    currentServerPageIndex: 0,
  });

  const [filters, sorting] = useFilterStore((state) => [state.filters, state.sorting]);

  const [shownData, setShownData] = useState<MBData[]>([]);

  const { data, error, isError, isLoading, isFetching } = useQuery<ResponseModel<MBData>, Error>({
    queryKey: ['data', { index: currentServerPageIndex, size: fetchSize, filters, sorting }],
    queryFn: () => dataFetcher(currentServerPageIndex, fetchSize, filters, sorting),
    placeholderData: keepPreviousData,
  });

  const nextPage = () => {
    const nextFirstItem = (pageIndex + 1) * pageSize;
    const currentFirstAvailableItem = currentServerPageIndex * fetchSize;
    const isRequestedItemsAvailable =
      nextFirstItem >= currentFirstAvailableItem && nextFirstItem + pageSize <= currentFirstAvailableItem + fetchSize;

    if (isRequestedItemsAvailable) {
      setPagination((previous) => ({
        ...previous,
        pageIndex: previous.pageIndex + 1,
      }));
    } else {
      setPagination((previous) => ({
        ...previous,
        pageIndex: previous.pageIndex + 1,
        currentServerPageIndex: previous.currentServerPageIndex + 1,
      }));
    }
  };

  const previousPage = () => {
    const previousFirstItem = (pageIndex - 1) * pageSize;
    const currentFirstAvailableItem = currentServerPageIndex * fetchSize;

    const isRequestedItemsAvailable =
      previousFirstItem >= currentFirstAvailableItem &&
      previousFirstItem + pageSize <= currentFirstAvailableItem + fetchSize;

    if (isRequestedItemsAvailable && pageIndex > 0) {
      setPagination((previous) => ({
        ...previous,
        pageIndex: previous.pageIndex - 1,
      }));
    } else {
      setPagination((previous) => ({
        ...previous,
        pageIndex: previous.pageIndex - 1,
        currentServerPageIndex: previous.currentServerPageIndex - 1,
      }));
    }
  };

  const changeItemPerPage = (value: string) => {
    setPagination((previous) => ({ ...previous, pageIndex: 0, pageSize: Number(value), currentServerPageIndex: 0 }));
  };

  useEffect(() => {
    const startIndex = pageIndex * pageSize - currentServerPageIndex * fetchSize;

    setShownData(data?.results.slice(startIndex, startIndex + pageSize) ?? []);
  }, [data, pageIndex, pageSize, currentServerPageIndex]);

  return (
    <div className="w-full max-w-screen-xl">
      <TableHeader />

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
          (data?.page ?? 1) * (data?.page_size ?? fetchSize) <
            (data?.count ?? fetchSize * currentServerPageIndex + 1) ?? false
        }
        changeItemPerPage={changeItemPerPage}
        nextPage={nextPage}
        previousPage={previousPage}
      />
    </div>
  );
}

interface Pagination {
  pageIndex: number;
  pageSize: number;
  currentServerPageIndex: number;
}
