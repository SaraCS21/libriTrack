import { IonicModule } from '@ionic/angular';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { userSettingsPage } from './userSettings.page';

import { userSettingsPageRoutingModule } from './userSettings-routing.module';

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    userSettingsPageRoutingModule
  ],
  declarations: [userSettingsPage]
})
export class UserSettingsPageModule {}
