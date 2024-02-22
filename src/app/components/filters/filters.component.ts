import {
  Component,
  Input,
  OnDestroy,
  OnInit,
  WritableSignal,
  inject,
  signal,
} from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import _ from 'lodash';
import { FilterColumn, DataService } from '../data.service';

@Component({
  selector: 'app-filters',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    MatInputModule,
    MatFormFieldModule,
    MatIconModule,
  ],
  templateUrl: './filters.component.html',
  styleUrl: './filters.component.css',
})
export class FiltersComponent implements OnInit, OnDestroy {
  @Input() debounceInterval: number = 750;
  signUpForm: FormGroup = new FormGroup({});
  columns: Array<FilterColumn> = [];

  constructor(private dataService: DataService) {}

  toggleSortOrder(field: string) {
    const newColumns: FilterColumn[] = this.columns
      .slice()
      .map((e: FilterColumn) => {
        return e.field === field
          ? { ...e, sorting: e.sorting === 'ASC' ? 'DESC' : 'ASC' }
          : e;
      });
    this.dataService.updateFilters(newColumns);
  }

  getControllers(columns: FilterColumn[]) {
    let controllers: any = {};
    for (let c of columns) {
      const fieldName = c.field;
      controllers[fieldName] = new FormControl();
    }
    return controllers;
  }

  ngOnInit(): void {
    this.columns = this.dataService.getFilters();
    const controllers = this.getControllers(this.columns);
    this.signUpForm = new FormGroup(controllers);

    const debounceSearch = _.debounce((formValues) => {
      const newFilters = this.columns.map((e) => ({
        ...e,
        sorting: e.sorting,
        value: formValues[e.field],
      }));
      this.dataService.updateFilters(newFilters);
    }, this.debounceInterval);

    this.signUpForm.valueChanges.subscribe((e) => {
      debounceSearch(e);
    });
  }

  ngOnDestroy(): void {}
}
