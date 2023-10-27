export interface MBColumn<TData> {
  order: number;
  id: keyof TData;
  name: string;
  headerClass?: string;
  CellWrapper?: ({ children }: { children: string | number | null | undefined }) => React.ReactNode;
}
