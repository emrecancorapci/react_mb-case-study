import { type SubmitHandler, useForm } from 'react-hook-form';

import { Filter, useFilterStore } from '@/stores/use-filter-store';
import { FormattedDataType } from '@/types/formatted-data';

import { Button } from '../ui/button';
import { Form, FormControl, FormField, FormItem } from '../ui/form';
import { Input } from '../ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { columns } from './columns';

interface Inputs {
  filterType: FormattedDataType;
  filterValue: string;
}

export default function FilterSelectorForm() {
  const form = useForm<Inputs>();
  const addFilter = useFilterStore((state) => state.addFilter);

  const onSubmit: SubmitHandler<Inputs> = (data) => {
    const key = data.filterType as FormattedDataType;
    const value = data.filterValue;
    addFilter({ [key]: value } as Filter);
  };

  return (
    <Form {...form}>
      <form className="flex flex-col gap-8" onSubmit={form.handleSubmit(onSubmit)}>
        <div className="flex flex-col gap-2">
          <FormField
            control={form.control}
            name="filterType"
            render={({ field }) => (
              <FormItem>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Filtre Seç" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {columns.map((column) => (
                      <SelectItem key={column.id} value={column.id}>
                        {column.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="filterValue"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input onChange={field.onChange} defaultValue={''} placeholder="Filtre Değeri" />
                </FormControl>
              </FormItem>
            )}
          />
        </div>
        <Button type="submit">Ekle</Button>
      </form>
    </Form>
  );
}
