import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BooksService } from '../services/books.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-book',
  templateUrl: './book.page.html',
  styleUrls: ['./book.page.scss'],
})
export class BookPage implements OnInit {
  bookId: string = "0";

  data: any = {}

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
        this.deleteBook(this.data.id);
      },
    },
  ];

  constructor(private route: ActivatedRoute, private booksService: BooksService, private router: Router) { }

  ngOnInit() {
    this.bookId = this.route.snapshot.paramMap.get('id') || '';
    this.getBook();
  }
  
  ionViewWillEnter() {
    this.getBook();
  }

  getProgress(book: any) {
    if (book.numberPages === 0) return 0;

    return book.readPages / book.numberPages;
  }

  changeRead(book: any) {
    book.read = !book.read;

    const data = {
      read: book.read
    }
    
    this.editBook(book.id, data);
  }

  changeFavorite(book: any) {
    book.favorite = !book.favorite;

    const data = {
      favorite: book.favorite
    }
    
    this.editBook(book.id, data);
  }

  openEditBook(id: string) {
    this.router.navigate(['/tabs/edit-book', id]);
  }

  // CRUD
  getBook() {
    this.booksService.getBook(this.bookId).subscribe((data) => {
      this.data = data;
    });
  }

  editBook(id: string, data: any) {
    this.booksService.editBook(id, data).subscribe(() => {
      this.getBook();
    });
  }

  deleteBook(id: string) {
    this.booksService.deleteBook(id).subscribe(() => {
      this.router.navigate(['']);
    });
  }
}
