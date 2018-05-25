import { User } from './../../models/user';
import { FormBuilder, Validators } from '@angular/forms';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, LoadingController, ToastController } from 'ionic-angular';
import { AuthData } from '../../providers/auth-data';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFireDatabase, FirebaseObjectObservable } from 'angularfire2/database-deprecated';



@IonicPage()
@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
})
export class HomePage {

  user = {} as User;

  email: any;
  profilePicture: any = "https://www.gravatar.com/avatar/"
  profileArray : any=[]; 
  profile: FirebaseObjectObservable<any[]>;
  uid:any;

  public updateForm:any;
  
  constructor(public navCtrl: NavController, public authData: AuthData,public alertCtrl: AlertController,public loadingCtrl: LoadingController,private toastCtrl: ToastController,public afAuth: AngularFireAuth, public afDb: AngularFireDatabase, private fb: FormBuilder) {

  }  

  ionViewWillLoad(){
    this.afAuth.authState.subscribe(userAuth => {
   
      if(userAuth) {
        console.log("auth true!")
        this.uid = userAuth.uid;     
        this.email = userAuth.email;
        this.profilePicture = "https://www.gravatar.com/avatar/" +(this.email.toLowerCase(), 'hex');

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
        this.navCtrl.setRoot('StartPage');
      }

    });
}

goToProfile(){
  this.navCtrl.setRoot("ProfilePage")
}

goToDebunk(){
  this.navCtrl.setRoot("DebunkPage")
}
goToRedefine(){
  this.navCtrl.setRoot("RedefinePage")
}
goToDerefine(){
  this.navCtrl.setRoot("DerefinePage")
}

  logout(){
    this.authData.logoutUser()
    .then( authData => {
      console.log("Logged out");
      // toast message
      this.presentToast('bottom','You are now logged out');
      this.navCtrl.setRoot("StartPage");
    }, error => {
      var errorMessage: string = error.message;
      console.log(errorMessage);
      //this.presentAlert(errorMessage);
    });
}
presentToast(position: string,message: string) {
  let toast = this.toastCtrl.create({
    message: message,
    position: position,
    duration: 3000
  });
  toast.present();
}

  ionViewDidLoad() {
    console.log('ionViewDidLoad HomePage');
  }

}
