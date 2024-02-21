import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import _ from 'lodash';

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
  signUpForm: FormGroup = new FormGroup({});
  columns = [
    {
      label: 'Order No',
      field: 'order',
      sorting: 'ASC',
      type: 'text',
      defaultValue: '',
    },
    {
      label: 'Quantity',
      field: 'quantity',
      sorting: 'ASC',
      type: 'number',
      defaultValue: '',
    },
  ];

  toggleSortOrder(field: string) {
    console.log({ field });
    const selectedField = this.columns.filter((e) => e.field === field);
    console.log({ selectedField });
    this.columns = this.columns.slice().map((e) => {
      if (e.field === field) {
        return { ...e, sorting: e.sorting === 'ASC' ? 'DESC' : 'ASC' };
      }
      return e;
    });
  }

  ngOnInit(): void {
    let controllers: any = {};
    for (let c of this.columns) {
      const fieldName = c.field;
      controllers[fieldName] = new FormControl();
    }

    console.log({ controllers });
    this.signUpForm = new FormGroup(controllers);

    this.signUpForm.valueChanges.subscribe((e) => {
      function search() {
        console.log('Searching for:', e);
      }
      const debounceSearch = _.debounce(search, 1500);
      debounceSearch();
    });
  }

  ngOnDestroy(): void {}
}
