import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { userSettingsPage } from './userSettings.page';

const routes: Routes = [
  {
    path: '',
    component: userSettingsPage,
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class userSettingsPageRoutingModule {}
