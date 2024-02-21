import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import _ from 'lodash';

@Component({
  selector: 'app-filters',
  standalone: true,
  imports: [ReactiveFormsModule, MatInputModule, MatFormFieldModule],
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
