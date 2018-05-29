import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ActionSheetController, LoadingController } from 'ionic-angular';
import { Camera, CameraOptions } from '@ionic-native/camera';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFireDatabase } from 'angularfire2/database-deprecated';
import * as firebase from 'firebase';
import { ProfilePhotoService } from '../../providers/profile-photo';


@IonicPage()
@Component({
  selector: 'page-profile-photo',
  templateUrl: 'profile-photo.html',
})
export class ProfilePhotoPage {


  user: any;
  Picture: void;
  base64Image: string;

  imageuser =  firebase.auth().currentUser.uid.toString();


  constructor(private loadingCtrl: LoadingController, private ppService: ProfilePhotoService, private camera: Camera, public navCtrl: NavController, public navParams: NavParams, private afAuth: AngularFireAuth, private afDb: AngularFireDatabase, private actionsheetCtrl: ActionSheetController) {

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
  this.navCtrl.pop();
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
    ).then(imageData => {
           // imageData is a base64 encoded string
           this.base64Image = "data:image/jpeg;base64," + imageData;
           //this.Picture is passing the string to our DB
           this.Picture = imageData;
         });

        }
catch(e){
  console.error(e);
}
}

}
