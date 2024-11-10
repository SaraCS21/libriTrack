import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class BooksService {

  endpoint = 'http://localhost:8080/api/books';

  constructor(private httpClient: HttpClient, private router: Router) { }

  getAllBooks() {
    return this.httpClient.get(this.endpoint);
  }

  getBook(id: string) {
    return this.httpClient.get(`${this.endpoint}/${id}`);
  }

  addBook(formData: FormData) {  
    this.httpClient.post(this.endpoint, formData)
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

  editBook(id: string, formData: FormData) {
    return this.httpClient.put(`${this.endpoint}/${id}`, formData);
  }

  deleteBook(id: string) {
    return this.httpClient.delete(`${this.endpoint}/${id}`);
  }
}
