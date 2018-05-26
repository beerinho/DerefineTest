import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-explore',
  templateUrl: 'explore.html',
})
export class ExplorePage {

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  goToDebunk(){
    this.navCtrl.push("DebunkPage")
  }

  goToDerefine(){
    this.navCtrl.push("DerefinePage")
  }

  goToRedefine(){
    this.navCtrl.push("RedefinePage")
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ExplorePage');
  }

}
