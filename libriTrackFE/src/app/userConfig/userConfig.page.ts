import { Component, OnInit } from '@angular/core';
import { UsersService } from '../services/users.service';

@Component({
  selector: 'app-userConfig',
  templateUrl: './userConfig.page.html',
  styleUrls: ['./userConfig.page.scss'],
})
export class UserConfigPage implements OnInit {
  userEmail = localStorage.getItem('email') || '';

  confirmPassword: string = '';
  errorMessage: string = '';

  nameValid: boolean = true;
  emailValid: boolean = true;
  passwordValid: boolean = true;

  data: any = {
    email: '',
    name: '',
    password: '',
  }

  constructor(
    private usersService: UsersService
  ) { }

  ngOnInit() {
    this.getUser(this.userEmail)
  }

  ionViewWillEnter() {
    this.getUser(this.userEmail);
  }

  updateUser(data: any) {
    const token = localStorage.getItem('token') || '';

    this.usersService.editUser(data.email, data, token);
  }

  getUser(email: string) {
    const token = localStorage.getItem('token') || '';

    this.usersService.getUser(email, token).subscribe((data: any) => {
      this.data = data;
    });
  }

  // Validate form
  isFormValid() {
    return this.nameValid && this.emailValid && this.passwordValid;
  }

  validateName() {
    if (this.data.name.length < 4) {
      this.nameValid = false;
      this.errorMessage = "El nombre debe tener al menos 4 caracteres";

    } else {
      this.nameValid = true;
      this.errorMessage = "";
    }

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
    if (this.data.password === this.confirmPassword) {
      this.passwordValid = true;
      this.errorMessage = "";

    } else {
      this.passwordValid = false;
      this.errorMessage = "Las contraseñas no coinciden";
    }
  }
}
