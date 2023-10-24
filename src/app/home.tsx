import axios from 'axios';
import { useQuery } from '@tanstack/react-query';
import { ResponseModel } from '@/types/response-model';
import { MBData } from '@/types/mb-data';
import { useState } from 'react';
import MBTable from '@/components/table/mb-table';

export default function Home(): JSX.Element {
  const [dataPerPage, setDataPerPage] = useState<number>(10);
  const [filter, setFilter] = useState<string>('');
  const { data, error, isError, isLoading, isFetching } = useQuery<ResponseModel<MBData>, Error>({
    queryKey: ['data'],
    queryFn: getData,
  });

  return (
    <div className="w-full max-w-screen-xl">
      {/* <input onChange={(event) => setFilter(event.target.value)}>{filter}</input> */}
      <MBTable data={data?.results ?? []} />
    </div>
  );
}

const getData = async () => {
  const api = 'https://api-dev.massbio.info/assignment/query';
  const response = await axios.post<ResponseModel<MBData>>(api);
  return response.data;
};
