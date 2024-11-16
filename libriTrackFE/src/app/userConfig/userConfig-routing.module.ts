import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { UserConfigPage } from './userConfig.page';

const routes: Routes = [
  {
    path: '',
    component: UserConfigPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class UserConfigPageRoutingModule {}
