import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';
import { IUser } from 'src/app/shared/models/user.interface';
import { IUserRegister } from 'src/app/shared/models/userRegister.interface';
import { ConfirmPassword } from 'src/app/shared/validators/confirmPassword.validator';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss'],
})
export class RegistrationComponent implements OnInit {
  isSubmitted: boolean = false;
  registerForm!: FormGroup;
  constructor(
    private fb: FormBuilder,
    private userService: UserService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.registerForm = this.fb.group(
      {
        email: ['', [Validators.required, Validators.email]],
        password: ['', [Validators.required, Validators.minLength(4)]],
        confirmPassword: ['', [Validators.required]],
        address: ['', [Validators.required]],
        name: ['', [Validators.required]],
      },
      { validators: ConfirmPassword('password', 'confirmPassword') }
    );
  }

  get fc() {
    return this.registerForm.controls;
  }

  submit() {
    this.isSubmitted = true;
    if (this.registerForm.invalid) return;

    const resultUser = new IUser();
    console.log(this.registerForm.value);
    this.userService.register(this.registerForm.value).subscribe((response) => {
      console.log('aa');
      console.log(response);
    });
  }
}
