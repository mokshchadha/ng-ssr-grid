import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { FiltersComponent } from './components/filters/filters.component';
import { TableComponent } from './components/table/table.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, FiltersComponent, TableComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  title = 'ng-ssr-grid';
}
