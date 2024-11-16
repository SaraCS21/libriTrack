import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeMoviesPage } from './homeMovies.page';

const routes: Routes = [
  {
    path: '',
    component: HomeMoviesPage,
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomeMoviesPageRoutingModule {}
