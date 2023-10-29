import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

interface Properties {
  currentPage: number;
  isNextPageAvailable: boolean;
  setPageSize: (value: string | number) => void;
  nextPage: () => void;
  previousPage: () => void;
}

export default function TableFooter({
  currentPage,
  isNextPageAvailable,
  setPageSize,
  nextPage,
  previousPage,
}: Properties): JSX.Element {
  return (
    <div className="flex flex-row justify-between p-4">
      <Select onValueChange={(value) => setPageSize(value)}>
        <SelectTrigger className=" max-w-[100px]">
          <SelectValue placeholder="10 Ürün" />
        </SelectTrigger>
        <SelectContent>
          {[5, 10, 20, 50, 100].map((number) => (
            <SelectItem key={number} value={String(number)}>
              {`${String(number)} Öğe`}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
      <div className="grid grid-cols-5 items-center gap-2">
        <Button className="col-span-2" onClick={() => previousPage()} disabled={currentPage <= 1}>
          Önceki
        </Button>
        <p className="h-full w-full rounded-md border border-border bg-background py-2 text-center transition-all">
          {currentPage}
        </p>
        <Button className="col-span-2" onClick={() => nextPage()} disabled={!isNextPageAvailable}>
          Sonraki
        </Button>
      </div>
    </div>
  );
}
