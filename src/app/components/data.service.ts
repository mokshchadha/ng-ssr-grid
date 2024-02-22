import { Injectable, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, tap } from 'rxjs';
import { DEFAULT_COLUMNS } from '../constants';

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
  private filtersData = signal<FilterColumn[]>(DEFAULT_COLUMNS);

  tablesData = [];
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
      this.tablesData = data;
    });

    return this.http.get<any>(this.baseUrl).pipe(
      //TODO: use proper http client in standalone component
      tap((data) => {
        console.log('tables data ', data);
        this.tablesData = data;
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
}
