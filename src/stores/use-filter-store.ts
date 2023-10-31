import { create } from 'zustand';

import { dataMapperReverse } from '@/lib/data-formatter';
import { FormattedDataType } from '@/types/formatted-data';

export interface Filter {
  filterType: string;
  filterValue: string | number;
}
export type Sorting = Record<FormattedDataType, 'ASC' | 'DESC'>;

const defaultFilter = {
  uploaded_variation: [],
  existing_variation: [],
  symbol: [],
  af_vcf: [],
  depth: [],
  dann_score: [],
  pheno_pubmed: undefined,
  mondo: undefined,
  provean: undefined,
};

interface FilterStore {
  filters: FilterData;
  sorting: Sorting | undefined;
  addFilter: (filter: Filter) => void;
  deleteFilter: (filter: Filter) => void;
  setSorting: (sorting: FormattedDataType) => void;
}

export const useFilterStore = create<FilterStore>((set) => ({
  filters: defaultFilter,
  sorting: undefined,
  addFilter: ({ filterType, filterValue }) => {
    const validKeys = Object.keys(defaultFilter);

    if (!validKeys.includes(filterType)) {
      console.error('Invalid filter key:', filterType);
      return;
    }

    set((state) => {
      const newFilters = state.filters;

      switch (filterType) {
        case 'uploaded_variation':
        case 'existing_variation':
        case 'symbol': {
          if (typeof filterValue === 'string') {
            newFilters[filterType]?.push(filterValue);
          } else {
            console.error('Invalid filter value for', filterType);
          }
          break;
        }
        case 'af_vcf':
        case 'depth':
        case 'dann_score': {
          const numericValue = Number(filterValue);
          if (Number.isNaN(numericValue)) {
            console.error('Invalid filter value for', filterType);
          } else {
            newFilters[filterType]?.push(numericValue);
          }
          break;
        }
        case 'pheno_pubmed':
        case 'mondo':
        case 'provean': {
          if (typeof filterValue === 'string') {
            newFilters[filterType] = filterValue;
          } else {
            console.error('Invalid filter value for', filterType);
          }
          break;
        }
        default: {
          console.error('Invalid filter type:', filterType);
        }
      }

      return { filters: newFilters };
    });
  },
  deleteFilter: (filter) => {
    const validKeys = Object.keys(defaultFilter);

    if (!validKeys.includes(filter.filterType)) {
      console.error('Invalid filter key:', filter.filterType);
      return;
    }

    set((state) => {
      const newFilters = state.filters;

      switch (filter.filterType) {
        case 'uploaded_variation':
        case 'existing_variation':
        case 'symbol': {
          newFilters[filter.filterType] = newFilters[filter.filterType]?.filter(
            (value) => value !== filter.filterValue,
          );
          break;
        }
        case 'af_vcf':
        case 'depth':
        case 'dann_score': {
          newFilters[filter.filterType] = newFilters[filter.filterType]?.filter(
            (value) => value !== Number(filter.filterValue),
          );
          break;
        }
        case 'pheno_pubmed':
        case 'mondo':
        case 'provean': {
          newFilters[filter.filterType] = undefined;
          break;
        }
      }

      return { filters: newFilters };
    });
  },
  setSorting: (newSorting) =>
    set((state) => {
      if (!isFormattedDataType(newSorting)) return state;

      const sortingValue = state.sorting?.[newSorting as FormattedDataType];
      const newSortingValue = sortingValue === 'ASC' ? 'DESC' : 'ASC';

      return {
        sorting: {
          ...state.sorting,
          [newSorting as FormattedDataType]: newSortingValue,
        } as Sorting | undefined,
      };
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
