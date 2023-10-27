import axios from 'axios';

import type { Sorting } from '@/stores/use-filter-store';
import { MBData } from '@/types/mb-data';
import { ResponseModel } from '@/types/response-model';

import { dataMapperReverse } from './data-formatter';

export const dataFetcher = async (
  lastServerPageIndex: number,
  fetchSize: number,
  filters: Map<string, string | number> | undefined,
  sorting: Sorting | undefined,
) => {
  const api = `https://api-dev.massbio.info/assignment/query?page=${lastServerPageIndex + 1}&page_size=${fetchSize}`;
  const convertedSorting =
    sorting === undefined
      ? undefined
      : { [dataMapperReverse(Object.keys(sorting)[0])]: sorting[Object.keys(sorting)[0]] };

  const request =
    filters === undefined || filters?.size < 1
      ? { ordering: convertedSorting }
      : { filters: [...filters], ordering: convertedSorting };

  const response = await axios.post<ResponseModel<MBData>>(api, request);
  return response.data;
};
