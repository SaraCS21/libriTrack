import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TabsPage } from './tabs.page';

const routes: Routes = [
  {
    path: 'tabs',
    component: TabsPage,
    children: [
      {
        path: 'home',
        loadChildren: () => import('../home/home.module').then(m => m.HomePageModule)
      },
      {
        path: 'favorites',
        loadChildren: () => import('../favorites/favorites.module').then(m => m.FavoritesPageModule)
      },
      {
        path: 'userSettings',
        loadChildren: () => import('../userSettings/userSettings.module').then(m => m.UserSettingsPageModule)
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
