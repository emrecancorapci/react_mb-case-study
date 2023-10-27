import { create } from 'zustand';

export type Filter = Map<string, string | number>;

export type Sorting = Record<string, 'ASC' | 'DESC'>;

interface FilterStore {
  filters: Filter;
  sorting: Sorting | undefined;
  addFilter: (filter: Record<string, string | number>) => void;
  deleteFilter: (filter: Record<string, string | number>) => void;
  setSorting: (sorting: string) => void;
}

export const useFilterStore = create<FilterStore>((set) => ({
  filters: new Map(),
  sorting: undefined,
  addFilter: (filter) =>
    set((state) => ({
      filters: new Map([...state.filters, ...Object.entries(filter)]),
    })),
  deleteFilter: (filter) =>
    set((state) => {
      const newFilters = new Map(state.filters);
      for (const key of Object.keys(filter)) newFilters.delete(key);
      return { filters: newFilters };
    }),
  setSorting: (newSorting) =>
    set((state) => {
      return state.sorting?.[newSorting] === 'ASC'
        ? { sorting: { [newSorting]: 'DESC' } }
        : { sorting: { [newSorting]: 'ASC' } };
    }),
}));
