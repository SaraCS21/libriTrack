import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { UserConfigPageRoutingModule } from './userConfig-routing.module';

import { UserConfigPage } from './userConfig.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    UserConfigPageRoutingModule
  ],
  declarations: [UserConfigPage]
})
export class UserConfigPageModule {}
