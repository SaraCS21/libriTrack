import { Component, OnInit } from '@angular/core';
import { MoviesService } from '../services/movies.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-edit-movie',
  templateUrl: './edit-movie.page.html',
  styleUrls: ['./edit-movie.page.scss'],
})
export class EditMoviePage implements OnInit {
  movieId: string = "0";

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

  constructor(private moviesService: MoviesService, private route: ActivatedRoute, private router: Router) { }

  ngOnInit() {
    this.movieId = this.route.snapshot.paramMap.get('id') || '';
    this.getMovie();
  }
  
  ionViewWillEnter() {
    this.getMovie();
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
  getMovie() {
    this.moviesService.getMovie(this.movieId).subscribe((data) => {
      this.data = data;
    });
  }

  editMovie(data: any) {
    this.moviesService.editMovie(this.movieId, data).subscribe(() => {
      this.router.navigate(['/tabs/movie', data.id]);
    });
  }
}