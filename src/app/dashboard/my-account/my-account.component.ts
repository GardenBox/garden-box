import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/core/services/auth.service';
import { MyAccountService } from 'src/app/core/services/my-account.service';
import jwt_decode from "jwt-decode";
import { FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-my-account',
  templateUrl: './my-account.component.html',
  styleUrls: ['./my-account.component.scss']
})
export class MyAccountComponent implements OnInit {

  newPassword: FormControl = new FormControl('', [Validators.minLength(6)]);
  email: string = '';
  editMode: boolean = false;

  constructor(private myAccountService: MyAccountService, private authService: AuthService) { }

  ngOnInit(): void {
    const decoded: any = jwt_decode(localStorage.token);
    this.email = decoded?.email;
  }

  save(): void {
    this.editMode = false;
    this.myAccountService.editPassword(this.email, this.newPassword.value)
  }

  logout(): void {
    this.authService.logout();
  }

}
