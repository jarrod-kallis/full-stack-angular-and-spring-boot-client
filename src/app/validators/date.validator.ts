import { AbstractControl, ValidatorFn } from '@angular/forms';

export function futureDateValidator(): ValidatorFn {
  return (control: AbstractControl): { [key: string]: any } => {
    const dateStr = control.value;
    // console.log(dateStr);

    // Object to return if date is invalid
    const invalidObj = { invalidDate: true };

    // Today's date (remove the time)
    let now = new Date();
    now = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    // console.log(now);

    // Check if the date is today or in the future
    const date = new Date(dateStr);
    if (date < now) {
      // console.log('Invalid date');
      return invalidObj;
    } else {
      // console.log('Valid date');
      return null;
    }
  };
}
