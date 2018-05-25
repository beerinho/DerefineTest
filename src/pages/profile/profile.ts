import { ProfilePhotoService } from './../../providers/profile-photo';
import { User } from './../../models/user';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, ToastController, LoadingController, ActionSheetController } from 'ionic-angular';
import { FirebaseObjectObservable, AngularFireDatabase } from 'angularfire2/database-deprecated';
import { AuthData } from '../../providers/auth-data';
import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase';
import { normalizeURL} from 'ionic-angular';

import md5 from 'crypto-md5'; // dependencies:"crypto-md5"
import { Camera } from '@ionic-native/camera';

@IonicPage()
@Component({
  selector: 'page-profile',
  templateUrl: 'profile.html',
})
export class ProfilePage {

  Picture: any;
  base64Image: string;
  changephoto: boolean;

  imageuser =  firebase.auth().currentUser.uid.toString();

  ProfilePhoto: any;
  user = {} as User
  email: any;
  profilePicture: any = "https://www.gravatar.com/avatar/"
  profileArray : any=[]; 
  profile: FirebaseObjectObservable<User[]>;

constructor(private camera: Camera, private actionsheetCtrl: ActionSheetController, private ppService: ProfilePhotoService, public navCtrl: NavController, public authData: AuthData,public alertCtrl: AlertController,public loadingCtrl: LoadingController,private toastCtrl: ToastController,public afAuth: AngularFireAuth, public afDb: AngularFireDatabase) {
  

  this.ppService.getProfileImage(this.user).subscribe(image=>{ image 
  this.ProfilePhoto = normalizeURL(image)})
}

ngOnInit() {

    this.ppService.getProfileImage(this.user).subscribe(image => {
      this.base64Image = image;
    });
}

  ionViewWillLoad(){
    this.afAuth.authState.subscribe(userAuth => {
   
 const uid = firebase.auth().currentUser.uid.toString();

      if(uid) {
        console.log("auth true!")

        let loadingPopup = this.loadingCtrl.create({
          spinner: 'crescent', 
          content: '',
          duration: 15000
        });
        loadingPopup.present();

        this.profile = this.afDb.object('/userProfile/'+uid );
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

  updateProfilePhoto(){
    this.changephoto = true;
  }

  editPage(){
    this.navCtrl.push("EditProfilePage")
  }

  //PHOTO DIV

  
    //Photo selection action sheet
photoActionSheet(){
  let actionSheet = this.actionsheetCtrl.create({
    title: 'Albums',
    cssClass: 'action-sheets',
    buttons: [
      {
        text: 'Take Photo',
        icon: "camera",
        handler: () => {
          console.log('Take photo clicked');
          this.takePicture();
        }
      },
      {
        text: 'Choose from device',
        icon:  'folder-open',
        handler: () => {
          console.log('Choose photo clicked');
          this.choosePicture();
        }
      },
      {
        text: 'Cancel',
        role: 'cancel', // will always sort to be on the bottom
        icon: 'close',
        handler: () => {
          console.log('Cancel clicked');
        }
      }
    ]
  });
  actionSheet.present();
}


takePicture(){
  this.camera.getPicture({
    quality : 95,
    destinationType : this.camera.DestinationType.DATA_URL,
    sourceType : this.camera.PictureSourceType.CAMERA,
    allowEdit : true,
    encodingType: this.camera.EncodingType.PNG,
    targetWidth: 500,
    targetHeight: 500,
    saveToPhotoAlbum: true
  }).then(imageData => {
     // imageData is a base64 encoded string
    this.base64Image = "data:image/jpeg;base64," + imageData;
    //this.Picture is passing the string to our DB
    this.Picture = imageData;
  }, error => {
    console.log("ERROR -> " + JSON.stringify(error));
  });

  let loadingPopup = this.loadingCtrl.create({
    spinner: 'crescent', 
    content: 'Updating...',
    duration: 1500
  });
  loadingPopup.present();

}

choosePicture(){
  this.camera.getPicture({
    quality : 95,
    destinationType : this.camera.DestinationType.DATA_URL,
    sourceType : this.camera.PictureSourceType.PHOTOLIBRARY,
    allowEdit : true,
    encodingType: this.camera.EncodingType.PNG,
    targetWidth: 500,
    targetHeight: 500,
    saveToPhotoAlbum: true,    
  }).then(imageData => {
     // imageData is a base64 encoded string
    this.base64Image = "data:image/jpeg;base64," + imageData;
    //this.Picture is passing the string to our DB
    this.Picture = imageData;
  }, error => {
    console.log("ERROR -> " + JSON.stringify(error));
  });
let loadingPopup = this.loadingCtrl.create({
    spinner: 'crescent', 
    content: 'Updating...',
    duration: 1500
  });
  loadingPopup.present();

}


saveChanges(){
  if(this.base64Image){
  this.ppService.uploadProfilePhoto(this.user, this.base64Image.split(/,(.+)/)[1]);

  }
  this.changephoto = false;
}


}





