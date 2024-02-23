import { Component, OnInit, ViewChild, computed, inject } from '@angular/core';
import { DataService } from '../data.service';
import { MatTableModule } from '@angular/material/table';
import {
  MatPaginator,
  MatPaginatorModule,
  PageEvent,
} from '@angular/material/paginator';

@Component({
  selector: 'app-table',
  standalone: true,
  imports: [MatTableModule, MatPaginatorModule],
  templateUrl: './table.component.html',
  styleUrl: './table.component.css',
})
export class TableComponent implements OnInit {
  dataService = inject(DataService);
  displayedColumns = computed(() =>
    this.dataService.filtersData().map((e) => e.field)
  );

  length = 50;
  pageSize = 10;
  pageIndex = 0;
  pageSizeOptions = [5, 10, 25];

  handlePageChange(e: PageEvent) {
    console.log(e);
    this.length = e.length;
    this.pageSize = e.pageSize;
    this.pageIndex = e.pageIndex;
  }

  ngOnInit(): void {}
}
