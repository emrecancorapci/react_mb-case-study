import { type SubmitHandler, useForm } from 'react-hook-form';
import { z } from 'zod';

import { useFilterStore } from '@/stores/use-filter-store';

import { Button } from '../ui/button';
import { Form, FormControl, FormField, FormItem } from '../ui/form';
import { Input } from '../ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { columns } from './columns';

const validFilterTypes = [
  'uploaded_variation',
  'existing_variation',
  'symbol',
  'af_vcf',
  'depth',
  'dann_score',
  'pheno_pubmed',
  'mondo',
  'provean',
] as const;

const InputSchema = z
  .object({
    filterType: z.enum(validFilterTypes), // Ensure filterType is one of the valid values
    filterValue: z.union([z.string(), z.number()]), // filterValue can be a string or a number
  })
  .superRefine((data) => {
    if (data.filterType === 'depth' || data.filterType === 'dann_score' || data.filterType === 'provean') {
      return Number(data.filterValue);
    }

    return true;
  });

type FormattedInput = z.infer<typeof InputSchema>;

export default function FilterSelectorForm() {
  const form = useForm<FormattedInput>();
  const addFilter = useFilterStore((state) => state.addFilter);

  const onSubmit: SubmitHandler<FormattedInput> = ({ filterType, filterValue }) => {
    addFilter({ filterType, filterValue });
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
