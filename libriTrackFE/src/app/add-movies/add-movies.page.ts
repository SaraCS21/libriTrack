import { Component, OnInit } from '@angular/core';
import { MoviesService } from '../services/movies.service';
import { PhotoService } from '../services/photo.service';

@Component({
  selector: 'app-add-movies',
  templateUrl: './add-movies.page.html',
  styleUrls: ['./add-movies.page.scss'],
})
export class AddMoviesPage implements OnInit {
  capturedPhoto: string = "";

  errorMessage: string = '';
  titleValid: boolean = true;
  directorValid: boolean = true;
  scoreValid: boolean = true;

  data: any = {
    title: '',
    director: '',
    genre: 'Romance',
    review: '',
    cover: '',
    score: 0,
    favorite: false,
    seen: false,
  }

  isFavorite: boolean = false;
  isSeen: boolean = false;

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
    private moviesService: MoviesService, 
    private photoService: PhotoService,
  ) { }

  ngOnInit() {}

  ionViewWillEnter() {
    this.capturedPhoto = "";
  }

  getGenreClass(genre: string) {
    return genre.normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/\s+/g, '-').toLowerCase();
  }

  changeSeen() {
    this.isSeen = !this.isSeen;
    this.data.seen = this.isSeen;
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
    return this.data.title != "" && this.data.director != "" && this.titleValid && this.directorValid && this.scoreValid;
  }
  
  validateTitle() {
    this.titleValid = !!this.data['title'] || this.data['title'].trim().length !== 0;
    this.errorMessage = this.titleValid ? '' : 'El campo título es obligatorio';
  }

  validateDirector() {
    this.directorValid = !!this.data['director'] || this.data['director'].trim().length !== 0;
    this.errorMessage = this.directorValid ? '' : 'El campo director es obligatorio';
  }

  validateScore() {
    this.scoreValid = this.data.score >= 0 && this.data.score <= 5;
    this.errorMessage = this.scoreValid ? '' : 'La puntuación debe estar entre 0 y 5';
  }

  // CRUD
  async addMovie(data: any) {
    let formData = new FormData();    

    for (const key in data) {
      formData.append(key, data[key]);
    }

    const userEmail = localStorage.getItem('email');
    userEmail && formData.append('userEmail', userEmail);

    if (this.capturedPhoto) {
      const response = await fetch(this.capturedPhoto);
      const blob = await response.blob();
      formData.append('cover', blob, 'photo.jpg');  
    }

    this.moviesService.addMovie(formData);
  }
}