import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { UsersService } from '../services/users.service';

@Component({
  selector: 'app-userSettings',
  templateUrl: 'userSettings.page.html',
  styleUrls: ['userSettings.page.scss']
})
export class userSettingsPage {

  public alertButtons = [
    {
      text: 'Cancelar',
      role: 'cancel',
      handler: () => {},
    },
    {
      text: 'Eliminar',
      role: 'confirm',
      cssClass: 'alert-delete-button-confirm',
      handler: () => {
        this.deleteUser();
      },
    },
  ];

  constructor(
    private router: Router, 
    private usersService: UsersService
  ) {}

  logOut() {
    localStorage.removeItem('email');
    this.router.navigate(['']);
  }

  deleteUser() {
    const email = localStorage.getItem('email') || '';
    const token = localStorage.getItem('token') || '';

    this.usersService.deleteUser(email, token);

    localStorage.removeItem('email');
    this.router.navigate(['']);
  }

}
