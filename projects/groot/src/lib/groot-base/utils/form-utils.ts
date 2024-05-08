import {UntypedFormControl, UntypedFormGroup, NgForm} from '@angular/forms';

/**
 * Marks each control in the form recursively as touched, for validation
 * @return If the form is valid (after the validation)
 */
export function validateForm(formGroup: UntypedFormGroup | NgForm): boolean {
  Object.keys(formGroup.controls).forEach(field => {
    const control = formGroup.controls[field];
    if (control instanceof UntypedFormControl) {
      control.markAsTouched();
      control.markAsDirty();
      control.updateValueAndValidity();
    } else if (control instanceof UntypedFormGroup) {
      validateForm(control);
    }
  });
  return formGroup.valid;
}

/**
 * Marks each control in the form as untouched, recursively
 */
export function unTouchForm(formGroup: UntypedFormGroup | NgForm): void {
  Object.keys(formGroup.controls).forEach(field => {
    const control = formGroup.controls[field];
    if (control instanceof UntypedFormControl) {
      control.markAsUntouched();
      control.markAsPristine();
      control.setErrors(null);
    } else if (control instanceof UntypedFormGroup) {
      unTouchForm(control);
    }
  });
}
