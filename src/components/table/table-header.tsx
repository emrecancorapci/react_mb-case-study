import { useFilterStore } from '@/stores/use-filter-store';

import { Button } from '../ui/button';
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover';
import FilterSelectorForm from './filter-selector-form';

export default function TableHeader(): JSX.Element {
  const [filters] = useFilterStore((state) => [state.filters, state.addFilter]);

  return (
    <div className="w-full pb-4 ps-4">
      <Popover>
        <PopoverTrigger asChild>
          <Button>Filtre Ekle</Button>
        </PopoverTrigger>
        <PopoverContent>
          <FilterSelectorForm />
        </PopoverContent>
      </Popover>
      {[...filters].map((key) => (
        <div key={Object.keys(key)[0]} className="flex gap-2">
          <span>{key}</span>
          <span>{filters.get(Object.keys(key)[0])}</span>
        </div>
      ))}
    </div>
  );
}
