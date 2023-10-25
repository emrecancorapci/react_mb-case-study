import { keepPreviousData, useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { LoaderIcon } from 'lucide-react';
import { useEffect, useState } from 'react';

import MBTable from '@/app/mb-table';
import { dataFormatter } from '@/components/table/data-formatter';
import TableControllers from '@/components/table-controllers';
import { MBData } from '@/types/mb-data';
import { ResponseModel } from '@/types/response-model';

export default function Home(): JSX.Element {
  const fetchSize = 100;

  const [{ pageIndex, pageSize, serverPageIndex }, setPagination] = useState<Pagination>({
    pageIndex: 0,
    pageSize: 10,
    serverPageIndex: 0,
  });

  const [shownData, setShownData] = useState<MBData[]>([]);

  const { data, error, isError, isLoading, isFetching } = useQuery<ResponseModel<MBData>, Error>({
    queryKey: ['data', { index: serverPageIndex, size: fetchSize }],
    queryFn: () => getData(serverPageIndex, fetchSize),
    placeholderData: keepPreviousData,
  });

  const nextPage = () => {
    const nextItemsMax = (pageIndex + 2) * pageSize;
    const fetchedItemsMax = (serverPageIndex + 1) * fetchSize;

    if (nextItemsMax > fetchedItemsMax) {
      setPagination((previous) => ({
        ...previous,
        pageIndex: previous.pageIndex + 1,
        serverPageIndex: previous.serverPageIndex + 1,
      }));
    } else {
      setPagination((previous) => ({ ...previous, pageIndex: previous.pageIndex + 1 }));
    }
  };

  const previousPage = () => {
    if (pageIndex === 0) return;
    setPagination((previous) => ({ ...previous, pageIndex: previous.pageIndex - 1 }));
  };

  const changeItemPerPage = (value: string) => setPagination((previous) => ({ ...previous, pageSize: Number(value) }));

  useEffect(() => {
    const startIndex = pageIndex * pageSize - serverPageIndex * fetchSize;
    const endIndex = (pageIndex + 1) * pageSize - serverPageIndex * fetchSize;

    setShownData(data?.results.slice(startIndex, endIndex) ?? []);
  }, [data, pageIndex, pageSize, serverPageIndex]);

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
        changeItemPerPage={changeItemPerPage}
        nextPage={nextPage}
        previousPage={previousPage}
      />
    </div>
  );
}

const getData = async (serverPageIndex: number, fetchSize: number) => {
  const api = `https://api-dev.massbio.info/assignment/query` + `?page=${serverPageIndex + 1}&page_size=${fetchSize}`;
  console.log(api);
  const response = await axios.post<ResponseModel<MBData>>(api);
  console.log(response.data);
  return response.data;
};

interface Pagination {
  pageIndex: number;
  pageSize: number;
  serverPageIndex: number;
}
