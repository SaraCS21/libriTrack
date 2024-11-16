import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MoviesService } from '../services/movies.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-movie',
  templateUrl: './movie.page.html',
  styleUrls: ['./movie.page.scss'],
})
export class MoviePage implements OnInit {
  movieId: string = "0";

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
        this.deleteMovie(this.data.id);
      },
    },
  ];

  constructor(private route: ActivatedRoute, private moviesService: MoviesService, private router: Router) { }

  ngOnInit() {
    this.movieId = this.route.snapshot.paramMap.get('id') || '';
    this.getMovie();
  }
  
  ionViewWillEnter() {
    this.getMovie();
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

  openEditMovie(id: string) {
    this.router.navigate(['/tabs/edit-movie', id]);
  }

  // CRUD
  getMovie() {
    this.moviesService.getMovie(this.movieId).subscribe((data) => {
      this.data = data;
    });
  }

  editMovie(id: string, data: any) {
    this.moviesService.editMovie(id, data).subscribe(() => {
      this.getMovie();
    });
  }

  deleteMovie(id: string) {
    this.moviesService.deleteMovie(id).subscribe(() => {
      this.router.navigate(['/tabs/homeMovies']);
    });
  }
}
