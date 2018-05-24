import { User } from './../../models/user';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ActionSheetController, Platform } from 'ionic-angular';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFireDatabase, FirebaseObjectObservable } from 'angularfire2/database-deprecated';
import { Camera, CameraOptions } from '@ionic-native/camera';
import { storage } from 'firebase';
import * as firebase from 'firebase';


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


  imageuser =  firebase.auth().currentUser.uid.toString();

  constructor(private camera: Camera, public navCtrl: NavController, public navParams: NavParams, private afAuth: AngularFireAuth, private afDb: AngularFireDatabase, private actionsheetCtrl: ActionSheetController) {
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
        this.navCtrl.setRoot("StartPage");
      }

    });
}

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
          this.takePhoto();
        }
      },
      {
        text: 'Choose from device',
        icon:  'folder-open',
        handler: () => {
          console.log('Choose photo clicked');
          this.choosePhoto();
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


//Take photo function
async takePhoto(){
  try {
  const options: CameraOptions = {
    quality: 75,
    targetHeight: 300,
    targetWidth: 300,
    destinationType: this.camera.DestinationType.DATA_URL,
    encodingType: this.camera.EncodingType.JPEG,
    mediaType: this.camera.MediaType.PICTURE,
    sourceType: this.camera.PictureSourceType.CAMERA,    
    correctOrientation: true,
    allowEdit: true,
  }

  const result = await this.camera.getPicture(options);

  const image = `data:image/jpeg;base64,${result}`

  // Get current username
  const imageuser = this.imageuser;

  // Create a Storage Ref w/ username
    const pictures = firebase.storage().ref(`${imageuser}/profilePicture.jpg`);
    pictures.putString(image, 'data_url')

}
catch(e){
  console.error(e);
}
}


//Choose photo function
async choosePhoto(){
  try {
  const options: CameraOptions = {
    quality: 75,
    targetHeight: 300,
    targetWidth: 300,
    destinationType: this.camera.DestinationType.DATA_URL,
    encodingType: this.camera.EncodingType.JPEG,
    mediaType: this.camera.MediaType.PICTURE,
    sourceType: this.camera.PictureSourceType.PHOTOLIBRARY,    
    correctOrientation: true,
    allowEdit: true,
  }

  const result = await this.camera.getPicture(options);

  const image = `data:image/jpeg;base64,${result}`

  // Get current username
  const imageuser = firebase.auth().currentUser.uid.toString();

  // Create a Storage Ref w/ username
    const pictures = firebase.storage().ref(`${imageuser}/profilePicture.jpg`);
    pictures.putString(image, 'data_url')

    this.afDb.object(`userProfile/${imageuser}`).update(
      this.user.profilePhoto = image, 
    )

}
catch(e){
  console.error(e);
}
}



  updateUser(user:User){
    console.log(user)
    this.afAuth.authState.subscribe(auth => {
      this.afDb.object(`userProfile/${auth.uid}`).update(this.user)
      .then(()=> this.navCtrl.pop())
    })
  }

}
