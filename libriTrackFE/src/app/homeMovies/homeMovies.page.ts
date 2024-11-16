import { Component } from '@angular/core';
import { MoviesService } from '../services/movies.service';

@Component({
  selector: 'app-homeMovies',
  templateUrl: 'homeMovies.page.html',
  styleUrls: ['homeMovies.page.scss']
})
export class HomeMoviesPage {

  searchTerm: string = '';
  segmentValue: string = 'single';

  movies: any = []
  filteredMovies: any[] = [...this.movies];

  constructor(private moviesService: MoviesService) {}

  ngOnInit() {
    this.getAllMovies();
  }
  
  ionViewWillEnter() {
    this.getAllMovies();
  }

  // Método trackBy para optimizar el *ngFor
  trackByMovieId(index: number, movie: any): number {
    return movie.id;
  }

  segmentChanged(event: any) {
    this.segmentValue = event.detail.value; 
  }

  filterMovies(event: any) {
    const searchValue = event.target.value.toLowerCase();

    if (searchValue && searchValue.trim() !== '') {
      this.filteredMovies = this.movies.filter((movie: any) =>
        movie.title.toLowerCase().includes(searchValue) ||
        movie.director.toLowerCase().includes(searchValue)
      );

    } else {
      this.filteredMovies = [...this.movies];
    }
  }

  changeSeen(movie: any) {
    movie.seen = !movie.seen;

    const data = {
      seen: movie.seen
    }
    
    this.editMovie(movie.id, data);
  }

  changeFavorite(movie: any) {
    movie.favorite = !movie.favorite;

    const data = {
      favorite: movie.favorite
    }
    
    this.editMovie(movie.id, data);
  }

  // CRUD
  getAllMovies() {
    this.moviesService.getAllMovies().subscribe((data) => {
      this.movies = data;
      this.filteredMovies = [...this.movies];
    });
  }
  
  editMovie(id: string, data: any) {
    this.moviesService.editMovie(id, data).subscribe(() => {
      this.getAllMovies();
    });
  }

}
