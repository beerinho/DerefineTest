import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { DebunkPage } from './debunk';

@NgModule({
  declarations: [
    DebunkPage,
  ],
  imports: [
    IonicPageModule.forChild(DebunkPage),
  ],
})
export class DebunkPageModule {}
