import { IonicModule } from '@ionic/angular';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { HomeMoviesPageRoutingModule } from './homeMovies-routing.module';

import { HomeMoviesPage } from './homeMovies.page';

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    HomeMoviesPageRoutingModule
  ],
  declarations: [HomeMoviesPage]
})
export class HomeMoviesPageModule {}
