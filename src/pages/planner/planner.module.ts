import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { PlannerPage } from './planner';
import { NgCalendarModule } from 'ionic2-calendar';

@NgModule({
  declarations: [
    PlannerPage,
  ],
  imports: [
    IonicPageModule.forChild(PlannerPage),
    NgCalendarModule,
  ],
})
export class PlannerPageModule {}
