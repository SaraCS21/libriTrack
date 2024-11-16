import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TabsPage } from './tabs.page';

const routes: Routes = [
  {
    path: '',
    component: TabsPage,
    children: [
      {
        path: 'home',
        loadChildren: () => import('../home/home.module').then(m => m.HomePageModule)
      },
      {
        path: 'homeMovies',
        loadChildren: () => import('../homeMovies/homeMovies.module').then(m => m.HomeMoviesPageModule)
      },
      {
        path: 'userSettings',
        loadChildren: () => import('../userSettings/userSettings.module').then(m => m.UserSettingsPageModule)
      },
      {
        path: 'userConfig',
        loadChildren: () => import('../userConfig/userConfig.module').then(m => m.UserConfigPageModule)
      },
      {
        path: 'add-books',
        loadChildren: () => import('../add-books/add-books.module').then( m => m.AddBooksPageModule)
      },
      {
        path: 'book/:id',
        loadChildren: () => import('../book/book.module').then( m => m.BookPageModule)
      },
      {
        path: 'edit-book/:id',
        loadChildren: () => import('../edit-book/edit-book.module').then( m => m.EditBookPageModule)
      },
      {
        path: 'add-movies',
        loadChildren: () => import('../add-movies/add-movies.module').then( m => m.AddMoviesPageModule)
      },
      {
        path: 'movie/:id',
        loadChildren: () => import('../movie/movie.module').then( m => m.MoviePageModule)
      },
      {
        path: 'edit-movie/:id',
        loadChildren: () => import('../edit-movie/edit-movie.module').then( m => m.EditMoviePageModule)
      },
      {
        path: '',
        redirectTo: '/tabs/home',
        pathMatch: 'full'
      }
    ]
  },
  {
    path: '',
    redirectTo: '/tabs/home',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
})
export class TabsPageRoutingModule {}
