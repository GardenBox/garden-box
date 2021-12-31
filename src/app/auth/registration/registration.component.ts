import { Component } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/core/services/auth.service';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss']
})
export class RegistrationComponent {

  form: FormGroup;
  errorMessage: string = '';

  constructor(private fb: FormBuilder, private authService: AuthService, private router: Router) { 
    this.form = this.fb.group({
      email: ['', Validators.compose([Validators.required, Validators.email])],
      password: ['', Validators.required],
      confirm:['']
   });
  }

  get email(): AbstractControl {
    return this.form.controls.email;
  }

  get password(): AbstractControl {
    return this.form.controls.password;
  }

  get confirm(): AbstractControl {
    return this.form.controls.confirm;
  }

  onSubmit(): void {
    this.form.markAllAsTouched();

    const {email, password} = this.form.value;

    if (this.form.valid) {
      this.authService.registration(email, password).subscribe(
        () => {
          this.authService.registrationInfo$.next(true);
          this.router.navigateByUrl('/zaloguj');
        }),
        (err: any) => {
        this.errorMessage = err.error.message;
      };
    }

  }

}
