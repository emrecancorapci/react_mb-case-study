import { create } from 'zustand';

import { dataFormatterReverse } from '@/lib/data-formatter';
import { FormattedDataType } from '@/types/formatted-data';

export type Filter = Record<FormattedDataType, string[] | number[] | string | number>;
export type Sorting = Record<FormattedDataType, 'ASC' | 'DESC'>;

const defaultFilter = {
  uploaded_variation: [],
  existing_variation: [],
  symbol: [],
  af_vcf: undefined,
  depth: undefined,
  dann_score: undefined,
  pheno_pubmed: undefined,
  mondo: undefined,
  provean: undefined,
};

interface FilterStore {
  filters: FilterData;
  sorting: Sorting | undefined;
  addFilter: (filter: Filter) => void;
  // deleteFilter: (filter: Record<string, string | number>) => void;
  setSorting: (sorting: FormattedDataType) => void;
}

export const useFilterStore = create<FilterStore>((set) => ({
  filters: defaultFilter,
  sorting: undefined,
  addFilter: (filter) => {
    console.log('Filter:', filter);
    const filterKey = Object.keys(filter)[0];
    const validKeys = Object.keys(defaultFilter);

    if (!validKeys.includes(filterKey)) {
      console.error('Invalid filter key:', filterKey);
      return;
    }

    set((state) => {
      const newFilters = state.filters;
      const filterValue = filter[filterKey as FormattedDataType];

      switch (filterKey) {
        case 'uploaded_variation' || 'existing_variation' || 'symbol': {
          if (newFilters[filterKey] === undefined) newFilters[filterKey] = [];
          newFilters[filterKey]?.push(String(filterValue));
          break;
        }
        case 'af_vcf' || 'depth' || 'dann_score': {
          if (newFilters[filterKey] === undefined) newFilters[filterKey] = [];
          newFilters[filterKey]?.push(Number(filterValue));
          break;
        }
        case 'pheno_pubmed' || 'mondo' || 'provean': {
          newFilters[filterKey] = String(filterValue);
          break;
        }
      }

      return { filters: newFilters };
    });
  },
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
      if (!isFormattedDataType(newSorting)) return;

      return state.sorting?.[newSorting as FormattedDataType] === 'ASC'
        ? { sorting: { [newSorting as FormattedDataType]: 'DESC' } }
        : { sorting: { [newSorting as FormattedDataType]: 'ASC' } };
    }),
}));

export interface FilterData {
  uploaded_variation: string[] | undefined;
  existing_variation: string[] | undefined;
  symbol: string[] | undefined;
  af_vcf: number[] | undefined;
  depth: number[] | undefined;
  dann_score: number[] | undefined;
  pheno_pubmed: string | undefined;
  mondo: string | undefined;
  provean: string | undefined;
}

function isFormattedDataType(argument: string): argument is FormattedDataType {
  return argument in defaultFilter;
}

export function filterUndefinedProperties(object: FilterData): unknown {
  const newObject: any = {};
  for (const key of Object.keys(object)) {
    if (object[key as FormattedDataType] !== undefined && object[key as FormattedDataType]?.length !== 0)
      newObject[key as FormattedDataType] = object[key as FormattedDataType];
  }
  return newObject;
}

export const getFilters = () => filterUndefinedProperties(useFilterStore.getState().filters);

/** ADD FILTER
 * if(filterType === 'enum') {
 *   if(filter NOT exists) create new filter
 *   else if(is filter value NOT exist) add value to existing filter
 * }
 * else if(filterType === 'number') {
 *   if(filter NOT exists) create new filter
 *   else if(filter value is NOT same) {
 *     if(filter value is NOT same AND filter has one member) turn it into array
 *     add value to existing filter
 *   }
 * }
 * else if(filterType === 'free_form') {
 *  if(filter NOT exists) create new filter
 *  else if(filter value is NOT same) change filter value
 */
