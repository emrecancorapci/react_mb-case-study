export interface ResponseModel<T> {
  page: number;
  pageSize: number;
  pageCount: number;
  results: T[];
}
