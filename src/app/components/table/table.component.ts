import { Component, OnInit, computed, inject } from '@angular/core';
import { DataService } from '../data.service';
import { MatTableModule } from '@angular/material/table';

@Component({
  selector: 'app-table',
  standalone: true,
  imports: [MatTableModule],
  templateUrl: './table.component.html',
  styleUrl: './table.component.css',
})
export class TableComponent implements OnInit {
  dataService = inject(DataService);
  displayedColumns = ['orderNo', 'quantity', 'name', 'age', 'gender'];
  ngOnInit(): void {}
}
