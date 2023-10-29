import { create } from 'zustand';

import { FormattedData } from '@/lib/data-formatter';

// export type Filter = Record<FormattedData, string[] | number[] | string | number>;
// export type FilterType = 'enum' | 'number' | 'free_form';

export type Sorting = Record<FormattedData, 'ASC' | 'DESC'>;

interface FilterStore {
  // filters: Filter[];
  sorting: Sorting | undefined;
  // addFilter: (filter: Record<string, string | number>) => void;
  // deleteFilter: (filter: Record<string, string | number>) => void;
  setSorting: (sorting: FormattedData) => void;
}

export const useFilterStore = create<FilterStore>((set) => ({
  filters: [],
  sorting: undefined,
  //   addFilter: (filter) =>
  //   set((state) => {
  //     const newFilters = new Map(state.filters);
  //     newFilters.set(Object.keys(filter)[0], Object.values(filter)[0]);
  //     return {
  //       filters: newFilters,
  //     };
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
