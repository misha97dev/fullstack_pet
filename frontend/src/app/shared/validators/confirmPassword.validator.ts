import { AbstractControl } from '@angular/forms';

export const ConfirmPassword = (
  password: string,
  confirmedPassword: string
) => {
  const validator = (form: AbstractControl) => {
    const passwordControl = form.get(password);
    const confirmPasswordControl = form.get(confirmedPassword);

    if (!passwordControl || !confirmPasswordControl) return;

    if (passwordControl.value !== confirmPasswordControl.value) {
      confirmPasswordControl.setErrors({ notMatch: true });
    } else {
      const errors = confirmPasswordControl.errors;
      if (!errors) return;

      delete errors.notMatch;

      confirmPasswordControl.setErrors(errors);
    }
  };
  return validator;
};
