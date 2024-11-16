import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class MoviesService {

  endpoint = 'http://localhost:8080/api/movies';

  constructor(private httpClient: HttpClient, private router: Router) { }

  getAllMovies() {
    const email = localStorage.getItem('email');
    return this.httpClient.get(`${this.endpoint}/${email}`);
  }

  getMovie(id: string) {
    const email = localStorage.getItem('email');
    return this.httpClient.get(`${this.endpoint}/${email}/${id}`);
  }

  addMovie(formData: FormData) {      
    this.httpClient.post(this.endpoint, formData)
      .subscribe(
        response => {
          console.log('Success', response);
          this.router.navigate(['/tabs/homeMovies']);
        },
        error => {
          console.error('Error', error);
        }
      );
  }

  editMovie(id: string, formData: FormData) {
    return this.httpClient.put(`${this.endpoint}/${id}`, formData);
  }

  deleteMovie(id: string) {
    return this.httpClient.delete(`${this.endpoint}/${id}`);
  }
}
