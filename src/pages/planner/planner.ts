// ******IONIC 2 CALENDAR********
//https://github.com/twinssbc/Ionic2-Calendar

import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-planner',
  templateUrl: 'planner.html',
})
export class PlannerPage {

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad PlannerPage');
  }

}
