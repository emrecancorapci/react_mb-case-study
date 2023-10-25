export interface ResponseModel<T> {
  page: number;
  page_size: number;
  count: number;
  results: T[];
}
