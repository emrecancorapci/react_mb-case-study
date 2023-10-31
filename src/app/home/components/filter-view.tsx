import { XIcon } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { useFilterStore } from '@/stores/filter-store';
export default function FilterView() {
  const [filters, deleteFilter] = useFilterStore((state) => [state.filters, state.deleteFilter]);
  const filterNames = Object.keys(filterUndefinedProperties(filters));
  const filterEntries = Object.entries(filterUndefinedProperties(filters));

  const FilterBadge = ({ children }: { children: React.ReactNode }) => (
    <div className="flex h-10 flex-row items-center gap-2 rounded-xl bg-primary px-4 py-2 ring-offset-background transition-colors hover:bg-primary/90">
      {children}
    </div>
  );
  const FilterTitle = ({ children }: { children: React.ReactNode }) => (
    <p className="text-sm text-primary-foreground">{children}</p>
  );
  const FilterValue = ({ children }: { children: React.ReactNode }) => (
    <div className="flex flex-row items-center gap-1 rounded-md bg-white px-3 py-1 text-sm text-black hover:bg-primary/90 dark:bg-zinc-900 dark:text-white">
      {children}
    </div>
  );

  return (
    <div>
      {filterNames.length > 0 && (
        <div className="flex flex-wrap items-center gap-1 px-4">
          <p>Filtreler :</p>
          {filterEntries.map(([filterName, filterValue]) => (
            <div key={filterName} className="flex items-center gap-2">
              {filterValue !== undefined && (
                <FilterBadge>
                  <FilterTitle>{filterName}</FilterTitle>
                  {Array.isArray(filterValue) ? (
                    <div className="flex gap-2">
                      {filterValue.map((value: string) => (
                        <FilterValue key={value}>
                          {value}
                          <Button
                            onClick={() => deleteFilter({ filterType: filterName, filterValue: value })}
                            className="h-5 w-5 bg-white/0 p-0 text-white hover:bg-white/10 hover:text-red-500"
                            size={'icon'}
                          >
                            <XIcon size={16} />
                          </Button>
                        </FilterValue>
                      ))}
                    </div>
                  ) : (
                    <FilterValue>{filterValue}</FilterValue>
                  )}
                </FilterBadge>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

const filterUndefinedProperties = (object: Record<string, any>) =>
  Object.fromEntries(Object.entries(object).filter(([, value]) => value !== undefined && value.length > 0));
