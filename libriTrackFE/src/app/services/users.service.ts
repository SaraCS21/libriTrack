import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  endpoint = 'http://localhost:8080/api/users';

  constructor(private httpClient: HttpClient, private router: Router) { }

  getUser(email: string, token: string) {
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.httpClient.get(`${this.endpoint}/${email}`, { headers });
  }

  addUser(data: any, token: string) {  
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    headers.set('Authorization', `Bearer ${token}`);
    
    const body = JSON.stringify(data);

    this.httpClient.post(this.endpoint, body, {headers})
      .subscribe(
        response => {
          console.log('Success', response);
          this.router.navigate(['']);
        },
        error => {
          console.error('Error', error);
        }
      );
  }

  editUser(email: string, formData: FormData, token: string) {
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    
    this.httpClient.put(`${this.endpoint}/${email}`, formData, { headers })
      .subscribe(
        response => {
          console.log('Success', response);
          this.router.navigate(['/tabs/userSettings']);
        },
        error => {
          console.error('Error', error);
        }
      );
  }

  deleteUser(email: string, token: string) {
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);

    return this.httpClient.delete(`${this.endpoint}/${email}`, { headers })
      .subscribe(
        response => {
          console.log('Success', response);
          this.router.navigate(['']);
        },
        error => {
          console.error('Error', error);
        }
      );
  }

  login(email: string, password: string) {
    const encodedCredentials = btoa(`${email}:${password}`);

    this.httpClient.post(`${this.endpoint}/login`, {}, {
        headers: {
            Authorization: `Basic ${encodedCredentials}`
        }
    }).subscribe(
        (response: any) => {
            localStorage.setItem('email', email);
            localStorage.setItem('token', response.token);  
            this.router.navigate(['/tabs/home']);
        },
        error => {
            console.error('Authentication failed:', error);
        }
    );
  }
}
