import { Injectable, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, tap } from 'rxjs';
import { DEFAULT_COLUMNS } from '../constants';
import { TableRow } from '../models/table-row.model';

export interface FilterColumn {
  label: string;
  field: string;
  sorting: string;
  type: string;
  defaultValue: string | number | null;
  value: string | number | null;
}

@Injectable({
  providedIn: 'root',
})
export class DataService {
  filtersData = signal<FilterColumn[]>(DEFAULT_COLUMNS);
  tablesData = signal<TableRow[]>([]);
  currentPage = signal<number>(0);

  private baseUrl: string = '';

  constructor(private http: HttpClient) {
    this.baseUrl = 'http://127.0.0.1:3000/query';
  }

  getQueryParams(newFilters: FilterColumn[]) {
    const searchFilters = newFilters
      .filter((e) => e.value && e.value)
      .map((e) => ({ field: e.field, value: e.value }));
    return searchFilters.map((obj) => `${obj.field}=${obj.value}`).join('&');
  }

  fetchData(newFilters: FilterColumn[]): Observable<any> {
    const url = this.baseUrl + '?' + this.getQueryParams(newFilters);

    fetch(url).then(async (e) => {
      const data = await e.json();
      console.log('data in fetch ', data);
      this.tablesData.set(data);
      console.log({ data: this.tablesData() });
    });

    return this.http.get<any>(this.baseUrl).pipe(
      //TODO: use proper http client in standalone component
      tap((data) => {
        console.log('tables data ', data);
        this.tablesData.set(data);
      })
    );
  }

  updateFilters(newFilters: FilterColumn[]) {
    this.filtersData.set(newFilters);
    this.fetchData(newFilters);
  }

  getFilters() {
    return this.filtersData().slice();
  }

  incrementPage() {
    this.currentPage.update((e) => e + 1);
  }

  decrementPage() {
    if (this.currentPage() > 0) {
      this.currentPage.update((e) => e - 1);
    }
  }
}
