import { Button } from '@/components/ui/button';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';

import FilterSelectorForm from './filter-selector-form';

export default function FilterSelector() {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button className="w-[120px]">Filtre Ekle</Button>
      </PopoverTrigger>
      <PopoverContent align="start" sideOffset={8} collisionPadding={20} className="w-full">
        <FilterSelectorForm />
      </PopoverContent>
    </Popover>
  );
}
