import axios from 'axios';

import { type FilterData, getFormattedFilters, type Sorting } from '@/stores/use-filter-store';
import type { FormattedDataType } from '@/types/formatted-data';
import { ResponseModel } from '@/types/response-model';
import { UnformattedData, UnformattedDataType } from '@/types/unformatted-data';

import { dataMapperReverse } from './data-formatter';

export const dataFetcher = async (
  lastServerPageIndex: number,
  fetchSize: number,
  filters: FilterData,
  sorting: Sorting | undefined,
) => {
  const api = `https://api-dev.massbio.info/assignment/query?page=${lastServerPageIndex + 1}&page_size=${fetchSize}`;
  const formattedSorting =
    sorting === undefined
      ? undefined
      : {
          [dataMapperReverse(Object.keys(sorting)[0] as FormattedDataType) as UnformattedDataType]:
            sorting[Object.keys(sorting)[0] as keyof Sorting],
        };

  const formattedFilters = getFormattedFilters();

  const request =
    filters === undefined ? { ordering: formattedSorting } : { filters: formattedFilters, ordering: formattedSorting };

  const response = await axios.post<ResponseModel<UnformattedData>>(api, request);
  console.log('Response:', response.request);
  return response.data;
};
