import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
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

  addBook(data: any) {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
  
    this.httpClient.post(this.endpoint, JSON.stringify(data), { headers })
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

  editBook(id: string, data: any) {
    return this.httpClient.put(`${this.endpoint}/${id}`, data);
  }

  deleteBook(id: string) {
    return this.httpClient.delete(`${this.endpoint}/${id}`);
  }
}
