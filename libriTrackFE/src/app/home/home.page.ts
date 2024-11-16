import { Component } from '@angular/core';
import { BooksService } from '../services/books.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss']
})
export class HomePage {
  searchTerm: string = '';
  segmentValue: string = 'single';

  books: any = []
  filteredBooks: any[] = [...this.books];

  constructor(private booksService: BooksService) {}

  ngOnInit() {
    this.getAllBooks();
  }
  
  ionViewWillEnter() {
    this.getAllBooks();
  }

  // Método trackBy para optimizar el *ngFor
  trackByBookId(index: number, book: any): number {
    return book.id;
  }

  segmentChanged(event: any) {
    this.segmentValue = event.detail.value; 
  }

  getProgress(book: any) {
      if (book.numberPages === 0) return 0;
  
      return book.readPages / book.numberPages;
  }

  filterBooks(event: any) {
    const searchValue = event.target.value.toLowerCase();

    if (searchValue && searchValue.trim() !== '') {
      this.filteredBooks = this.books.filter((book: any) =>
        book.title.toLowerCase().includes(searchValue) ||
        book.author.toLowerCase().includes(searchValue)
      );

    } else {
      this.filteredBooks = [...this.books];
    }
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

  // CRUD
  getAllBooks() {
    this.booksService.getAllBooks().subscribe((data) => {
      this.books = data;
      this.filteredBooks = [...this.books];
    });
  }
  
  editBook(id: string, data: any) {
    this.booksService.editBook(id, data).subscribe(() => {
      this.getAllBooks();
    });
  }
}
