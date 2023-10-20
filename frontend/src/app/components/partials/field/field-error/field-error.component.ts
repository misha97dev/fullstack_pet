import {
  Component,
  Input,
  OnChanges,
  OnInit,
  SimpleChanges,
} from '@angular/core';
import { AbstractControl } from '@angular/forms';

const messagesArr: any = {
  required: 'Field is required!',
  email: 'Invalid email format',
};

@Component({
  selector: 'app-field-error',
  templateUrl: './field-error.component.html',
  styleUrls: ['./field-error.component.scss'],
})
export class FieldErrorComponent implements OnInit, OnChanges {
  @Input() control!: AbstractControl;
  @Input() errorToggler: boolean = true;

  errorArr: string[] = [];

  ngOnInit(): void {
    this.control.statusChanges.subscribe(() => {
      this.setErrorArr();
    });
    this.control.valueChanges.subscribe(() => {
      this.setErrorArr();
    });
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.setErrorArr();
  }

  setErrorArr() {
    const errors = this.control.errors;
    if (!errors) {
      this.errorArr = [];
      return;
    }
    const errorKeys = Object.keys(errors);
    this.errorArr = errorKeys.map((key) => messagesArr[key]);
  }
}
