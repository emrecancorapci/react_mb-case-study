import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

interface Properties {
  pageSize: number;
  changeItemPerPage: (value: string) => void;
  nextPage: () => void;
  previousPage: () => void;
}

export default function TableControllers({
  pageSize,
  changeItemPerPage,
  nextPage,
  previousPage,
}: Properties): JSX.Element {
  return (
    <div className="flex flex-row justify-between p-4">
      <div className="flex w-80 items-center gap-4">
        <p className="w-full">Items per page :</p>
        <Select onValueChange={(value) => changeItemPerPage(value)}>
          <SelectTrigger>
            <SelectValue placeholder={pageSize} />
          </SelectTrigger>
          <SelectContent>
            {[5, 10, 20, 50, 100].map((number) => (
              <SelectItem key={number} value={String(number)}>
                {number}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      <div className="grid grid-cols-2 gap-4">
        <Button onClick={() => previousPage()}>Önceki</Button>
        <Button onClick={() => nextPage()}>Sonraki</Button>
      </div>
    </div>
  );
}
