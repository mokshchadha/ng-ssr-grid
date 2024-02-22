import { Component, OnInit, inject } from '@angular/core';
import { FilterColumn, DataService } from '../data.service';

@Component({
  selector: 'app-table',
  standalone: true,
  imports: [],
  templateUrl: './table.component.html',
  styleUrl: './table.component.css',
})
export class TableComponent implements OnInit {
  dataService = inject(DataService);
  ngOnInit(): void {}
}
