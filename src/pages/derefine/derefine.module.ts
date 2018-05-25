import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { DerefinePage } from './derefine';

@NgModule({
  declarations: [
    DerefinePage,
  ],
  imports: [
    IonicPageModule.forChild(DerefinePage),
  ],
})
export class DerefinePageModule {}
