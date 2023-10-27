import { keepPreviousData, useQuery } from '@tanstack/react-query';
import { LoaderIcon } from 'lucide-react';
import { useEffect, useState } from 'react';

import MBTable from '@/app/mb-table';
import TableControllers from '@/components/table-controllers';
import { dataFetcher } from '@/lib/data-fetcher';
import { dataFormatter } from '@/lib/data-formatter';
import { MBData } from '@/types/mb-data';
import { ResponseModel } from '@/types/response-model';

export default function Home(): JSX.Element {
  const fetchSize = 100;

  const [{ pageIndex, pageSize, currentServerPageIndex }, setPagination] = useState<Pagination>({
    pageIndex: 0,
    pageSize: 10,
    currentServerPageIndex: 0,
  });

  const [shownData, setShownData] = useState<MBData[]>([]);

  const { data, error, isError, isLoading, isFetching } = useQuery<ResponseModel<MBData>, Error>({
    queryKey: ['data', { index: currentServerPageIndex, size: fetchSize }],
    queryFn: () => dataFetcher(currentServerPageIndex, fetchSize, filters, sorting),
    placeholderData: keepPreviousData,
  });

  const nextPage = () => {
    const [nextFirstItem, nextLastItem] = [(pageIndex + 1) * pageSize, (pageIndex + 2) * pageSize];
    const [currentFirstAvailableItem, currentLastAvailableItem] = [
      currentServerPageIndex * fetchSize,
      (currentServerPageIndex + 1) * fetchSize,
    ];

    const isRequestedItemsAvailable =
      nextFirstItem >= currentFirstAvailableItem && nextLastItem <= currentLastAvailableItem;

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
    const [previousFirstItem, previousLastItem] = [(pageIndex - 1) * pageSize, pageIndex * pageSize];
    const [currentFirstAvailableItem, currentLastAvailableItem] = [
      currentServerPageIndex * fetchSize,
      (currentServerPageIndex + 1) * fetchSize,
    ];

    const isRequestedItemsAvailable =
      previousFirstItem >= currentFirstAvailableItem && previousLastItem <= currentLastAvailableItem;

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
    const endIndex = (pageIndex + 1) * pageSize - currentServerPageIndex * fetchSize;

    console.log({ startIndex, endIndex, pageIndex, pageSize, currentServerPageIndex });

    setShownData(data?.results.slice(startIndex, endIndex) ?? []);
  }, [data, pageIndex, pageSize, currentServerPageIndex]);

  return (
    <div className="w-full max-w-screen-xl">
      {isLoading || isFetching ? (
        <div className="flex w-full justify-center py-60">
          <LoaderIcon className="animate-spin" size={64} />
        </div>
      ) : isError ? (
        <p className="flex w-full rounded border border-destructive-foreground bg-destructive p-4">{error.message}</p>
      ) : (
        <MBTable data={dataFormatter(shownData)} />
      )}

      <TableControllers
        pageSize={pageSize}
        currentPage={pageIndex + 1}
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
