import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { filter } from 'rxjs/operators';
import { AuthService } from 'src/app/core/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  form: FormGroup;
  errorMessage: string = '';
  registrationInfo$: Observable<boolean>;
  get email(): AbstractControl {
    return this.form.controls.email;
  }

  get password(): AbstractControl {
    return this.form.controls.password;
  }
  
  constructor(private fb: FormBuilder, private authService: AuthService, private router: Router) {
    this.form = this.fb.group({
      email: ['', Validators.compose([Validators.required, Validators.email])],
      password: ['', Validators.required]
   });
  }

  ngOnInit(): void {
    this.registrationInfo$ = this.authService.registrationInfo$
      .pipe(
        filter(info => info === true)
      )
  }

  onSubmit() {
    this.form.markAllAsTouched();
    const {email, password} = this.form.value;
    if (this.form.status == 'VALID') {
      this.authService.login(email, password)
        .subscribe((response)=> {
          window.localStorage.setItem('token', response.token);
          this.router.navigateByUrl('/panel');
          this.authService.registrationInfo$.next(false);
      },
      () => {
        this.errorMessage = 'Nieprawidłowe dane. Spróbuj ponownie.';
      });
    }
  }

}
