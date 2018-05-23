import { User } from './../../models/user';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFireDatabase, FirebaseObjectObservable } from 'angularfire2/database-deprecated';


@IonicPage()
@Component({
  selector: 'page-edit-profile',
  templateUrl: 'edit-profile.html',
})
export class EditProfilePage {

  uid: any;
  profileArray: any=[];
  user = {} as User
  profile: FirebaseObjectObservable<User[]>

  constructor(public navCtrl: NavController, public navParams: NavParams, private afAuth: AngularFireAuth, private afDb: AngularFireDatabase) {
  }
  ionViewWillLoad(){
    this.afAuth.authState.subscribe(userAuth => {
   
      if(userAuth) {
        console.log("auth true!")
        this.uid = userAuth.uid; 
        this.profile = this.afDb.object('/userProfile/'+this.uid );
        this.profile.subscribe(profile => {
            this.profileArray = profile;
        })

      } else {
        console.log("auth false");
        this.navCtrl.setRoot('MainPage');
      }

    });
}
  ionViewDidLoad() {
    console.log('ionViewDidLoad EditProfilePage');
  }

  updateUser(user:User){
    console.log(user)
    this.afAuth.authState.subscribe(auth => {
      this.afDb.object(`userProfile/${auth.uid}`).update(this.user)
      .then(()=> this.navCtrl.pop())
    })
  }

}
