import { useEffect, useState } from 'react';

interface Pagination {
  pageIndex: number;
  pageSize: number;
  serverPageIndex: number;
}

interface Properties {
  defaults?: {
    pageSize?: number;
    fetchSize?: number;
  };
}

interface UsePagination {
  pageIndex: number;
  serverPageIndex: number;
  startIndex: number;
  endIndex: number;
  nextPage: () => void;
  previousPage: () => void;
  setPageSize: (value: string | number) => void;
}

export default function usePagination({ defaults }: Properties): UsePagination {
  const fetchSize = defaults?.fetchSize ?? 100;
  const [{ pageIndex, pageSize, serverPageIndex }, setPagination] = useState<Pagination>({
    pageIndex: 0,
    pageSize: defaults?.pageSize ?? 10,
    serverPageIndex: 0,
  });
  const [startIndex, setStartIndex] = useState(pageIndex * pageSize - serverPageIndex * fetchSize);

  const nextPage = () => {
    const nextFirstItem = (pageIndex + 1) * pageSize;
    const currentFirstAvailableItem = serverPageIndex * fetchSize;
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
        serverPageIndex: previous.serverPageIndex + 1,
      }));
    }
  };

  const previousPage = () => {
    const previousFirstItem = (pageIndex - 1) * pageSize;
    const currentFirstAvailableItem = serverPageIndex * fetchSize;

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
        serverPageIndex: previous.serverPageIndex - 1,
      }));
    }
  };

  useEffect(() => {
    setStartIndex(pageIndex * pageSize - serverPageIndex * fetchSize);
  }, [pageIndex, pageSize, serverPageIndex, fetchSize]);

  const setPageSize = (value: string | number) => {
    setPagination((previous) => ({ ...previous, pageIndex: 0, pageSize: Number(value), serverPageIndex: 0 }));
  };

  return {
    pageIndex,
    serverPageIndex,
    startIndex,
    endIndex: startIndex + pageSize,
    nextPage,
    previousPage,
    setPageSize,
  };
}
