import { Component, OnInit } from '@angular/core';
import { BooksService } from '../services/books.service';
import { PhotoService } from '../services/photo.service';

@Component({
  selector: 'app-add-books',
  templateUrl: './add-books.page.html',
  styleUrls: ['./add-books.page.scss'],
})
export class AddBooksPage implements OnInit {
  capturedPhoto: string = "";

  errorMessage: string = '';
  titleValid: boolean = true;
  authorValid: boolean = true;
  numPagesValid: boolean = true;
  readPagesValid: boolean = true;
  scoreValid: boolean = true;

  data: any = {
    title: '',
    author: '',
    genre: 'Romance',
    review: '',
    cover: '',
    numberPages: 0,
    readPages: 0,
    score: 0,
    favorite: false,
    read: false,
  }

  isFavorite: boolean = false;
  isRead: boolean = false;

  genresObj = {
    Romance: 'Romance',
    CienciaFiccion: 'Ciencia ficción',
    Historica: 'Histórica',
    Aventura: 'Aventura',
    Terror: 'Terror',
    Infantil: 'Infantil',
    Fantasia: 'Fantasía',
  }
  
  genres = Object.entries(this.genresObj);

  constructor(
    private booksService: BooksService, 
    private photoService: PhotoService,
  ) { }

  ngOnInit() {}

  ionViewWillEnter() {
    this.capturedPhoto = "";
  }

  getGenreClass(genre: string) {
    return genre.normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/\s+/g, '-').toLowerCase();
  }

  changeRead() {
    this.isRead = !this.isRead;
    this.data.read = this.isRead;
  }

  changeFavorite() {
    this.isFavorite = !this.isFavorite;
    this.data.favorite = this.isFavorite;
  }

  takePhoto() {
    this.photoService.takePhoto().then(data => {
      this.capturedPhoto = data.webPath? data.webPath : "";
    });
  }

  pickImage() {
    this.photoService.pickImage().then(data => {
      this.capturedPhoto = data.webPath;
    });
  }

  discardImage() {
    this.capturedPhoto = "";
  }
  
  // Validate form
  isFormValid() {
    return this.data.title != "" && this.data.author != "" && this.titleValid && this.authorValid && this.numPagesValid && this.readPagesValid && this.scoreValid;
  }
  
  validateTitle() {
    this.titleValid = !!this.data['title'] || this.data['title'].trim().length !== 0;
    this.errorMessage = this.titleValid ? '' : 'El campo título es obligatorio';
  }

  validateAuthor() {
    this.authorValid = !!this.data['author'] || this.data['author'].trim().length !== 0;
    this.errorMessage = this.authorValid ? '' : 'El campo autor es obligatorio';
  }

  validatePages() {  
    if (this.data.numberPages <= 0) {
      this.numPagesValid = false;
      this.errorMessage = 'El número de páginas debe ser mayor que 0';

    } else if (this.data.readPages < 0) {
      this.readPagesValid = false;
      this.errorMessage = 'El número de páginas leídas no puede ser menor que 0';

    } else if (this.data.readPages > this.data.numberPages) {
      this.numPagesValid = false;
      this.readPagesValid = false;
      this.errorMessage = 'El número de páginas leídas no puede ser mayor que el número de páginas totales';

    } else {
      this.numPagesValid = true;
      this.readPagesValid = true;
      this.errorMessage = '';
    }
  }

  validateScore() {
    this.scoreValid = this.data.score >= 0 && this.data.score <= 5;
    this.errorMessage = this.scoreValid ? '' : 'La puntuación debe estar entre 0 y 5';
  }

  // CRUD
  async addBook(data: any) {
    let formData = new FormData();    

    for (const key in data) {
      formData.append(key, data[key]);
    }

    if (this.capturedPhoto) {
      const response = await fetch(this.capturedPhoto);
      const blob = await response.blob();
      formData.append('cover', blob, 'photo.jpg');  
    }

    this.booksService.addBook(formData);
  }
}