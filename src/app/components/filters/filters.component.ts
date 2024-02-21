import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-filters',
  standalone: true,
  imports: [],
  templateUrl: './filters.component.html',
  styleUrl: './filters.component.css',
})
export class FiltersComponent implements OnInit {
  columns = [{ label: 'order No', field: 'order', sorting: 'ASC' }];

  ngOnInit(): void {}
}
