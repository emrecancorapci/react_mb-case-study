import axios from 'axios';

import type { Filter, Sorting } from '@/stores/use-filter-store';
import { MBData } from '@/types/mb-data';
import { ResponseModel } from '@/types/response-model';

import { dataMapperReverse, FormattedData } from './data-formatter';

export const dataFetcher = async (
  lastServerPageIndex: number,
  fetchSize: number,
  filters: Filter[],
  sorting: Sorting | undefined,
) => {
  const api = `https://api-dev.massbio.info/assignment/query?page=${lastServerPageIndex + 1}&page_size=${fetchSize}`;
  const formattedSorting =
    sorting === undefined
      ? undefined
      : // @ts-expect-error - Doesn't makes sense
        { [dataMapperReverse(Object.keys(sorting)[0] as FormattedData)]: sorting[Object.keys(sorting)[0]] };

  // let formattedFilters;
  // if (filters) {
  //   if (filters.size > 1) {
  //     for (const filter of filters) {
  //       formattedFilters = [];
  //       formattedFilters.push({ [dataMapperReverse(filter[0])]: filter[1] });
  //     }
  //   } else if (filters.size === 1) {
  //     formattedFilters = { f}
  //   } else {
  //     formattedFilters = undefined;
  //   }
  // }

  // const request =
  //   filters === undefined || filters?.size < 1
  //     ? { ordering: formattedSorting }
  //     : { filters: formattedFilters, ordering: formattedSorting };

  const request = { ordering: formattedSorting };

  const response = await axios.post<ResponseModel<MBData>>(api, request);
  console.log('Response:', response.request);
  return response.data;
};
