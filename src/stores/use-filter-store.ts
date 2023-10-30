import { create } from 'zustand';

import { FormattedDataType } from '@/types/formatted-data';

export type Filter = Record<FormattedDataType, string[] | number[] | string | number>;
export type Sorting = Record<FormattedDataType, 'ASC' | 'DESC'>;

export type FilterType = 'enum' | 'numeric' | 'free_form';

interface FilterStore {
  // filters: Filter[];
  sorting: Sorting | undefined;
  // addFilter: (filter: Record<string, string | number>) => void;
  // deleteFilter: (filter: Record<string, string | number>) => void;
  setSorting: (sorting: FormattedDataType) => void;
}

export const useFilterStore = create<FilterStore>((set) => ({
  filters: [],
  sorting: undefined,
  //   addFilter: (filter) =>
  //   set((state) => {
  // /**
  //  * if(filterType === 'enum') {
  //  *   if(filter NOT exists) create new filter
  //  *   else if(is filter value NOT exist) add value to existing filter
  //  * }
  //  * else if(filterType === 'number') {
  //  *   if(filter NOT exists) create new filter
  //  *   else if(filter value is NOT same) {
  //  *     if(filter value is NOT same AND filter has one member) turn it into array
  //  *     add value to existing filter
  //  *   }
  //  * }
  //  * else if(filterType === 'free_form') {
  //  *  if(filter NOT exists) create new filter
  //  *  else if(filter value is NOT same) change filter value
  //  */
  //   }),
  // deleteFilter: (filter) => {
  //   set((state) => {
  //     const newFilters = new Map(state.filters);
  //     for (const key of Object.keys(filter)) newFilters.delete(key);
  //     return { filters: newFilters };
  //   });
  // },
  setSorting: (newSorting) =>
    // @ts-expect-error - Doesn't makes sense
    set((state) => {
      return state.sorting?.[newSorting] === 'ASC'
        ? { sorting: { [newSorting]: 'DESC' } }
        : { sorting: { [newSorting]: 'ASC' } };
    }),
}));
