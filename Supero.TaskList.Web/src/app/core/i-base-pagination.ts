export interface IBasePagination {

  rowsPerPage: number;
  selectedPage: number;
  lastPage: number;
  
  changePage(newPage: number); 
  changePageSize(newSize: number);
  pageNumbers(filter?: any): number[];
  
}
