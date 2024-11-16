import { Component, OnInit } from '@angular/core';
import { UsersService } from '../services/users.service';
import { Router } from '@angular/router'; 

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  
  errorMessage: string = '';
  emailValid: boolean = true;
  passwordValid: boolean = true;

  data: any = {
    email: '',
    username: '',
    password: '',
  }

  constructor(  
    private usersService: UsersService,
    private router: Router 
  ) { }

  ngOnInit() {
  }

  login() {
    const { email, password } = this.data;
    this.usersService.login(email, password)
  }

  // Validate form
  isFormValid() {
    return this.emailValid && this.passwordValid;
  }

  validateEmail() {
    if (this.data.email.includes('@') && this.data.email.includes('.')) {
      this.emailValid = true;
      this.errorMessage = "";
      
    } else {
      this.emailValid = false;
      this.errorMessage = "El email no es válido";

    }
  }

  validatePassword() {
    if (!this.data.password.length) {
      this.passwordValid = false;
      this.errorMessage = "La contraseña no puede estar vacía";

    } else {
      this.passwordValid = true;
      this.errorMessage = "";
    }

  }

}
