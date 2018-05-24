import { User } from './../../models/user';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, ToastController, LoadingController } from 'ionic-angular';
import { FirebaseObjectObservable, AngularFireDatabase } from 'angularfire2/database-deprecated';
import { AuthData } from '../../providers/auth-data';
import { AngularFireAuth } from 'angularfire2/auth';

import md5 from 'crypto-md5'; // dependencies:"crypto-md5"

@IonicPage()
@Component({
  selector: 'page-profile',
  templateUrl: 'profile.html',
})
export class ProfilePage {

  user = {} as User
  email: any;
  profilePicture: any = "https://www.gravatar.com/avatar/"
  profileArray : any=[]; 
  profile: FirebaseObjectObservable<User[]>;
  uid:any;

constructor(public navCtrl: NavController, public authData: AuthData,public alertCtrl: AlertController,public loadingCtrl: LoadingController,private toastCtrl: ToastController,public afAuth: AngularFireAuth, public afDb: AngularFireDatabase) {
}

  ionViewWillLoad(){
    this.afAuth.authState.subscribe(userAuth => {
   
      if(userAuth) {
        console.log("auth true!")
        this.uid = userAuth.uid;

        let loadingPopup = this.loadingCtrl.create({
          spinner: 'crescent', 
          content: '',
          duration: 15000
        });
        loadingPopup.present();

        this.profile = this.afDb.object('/userProfile/'+this.uid );
        this.profile.subscribe(profile => {
            this.profileArray = profile;
            loadingPopup.dismiss();
        })

      } else {
        console.log("auth false");
        this.navCtrl.setRoot('MainPage');
      }

    });
  }

  editPage(){
    this.navCtrl.push("EditProfilePage")
  }


}





