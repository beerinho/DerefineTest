import {Inject, Injectable} from '@angular/core';
import {ReplaySubject} from "rxjs";
import {User} from "../models/user";
import * as firebase from 'firebase';
import { AngularFireDatabase } from 'angularfire2/database-deprecated';
import { Camera, CameraOptions } from '@ionic-native/camera';
import { LoadingController } from 'ionic-angular';

@Injectable()
export class ProfilePhotoService {

    base64Image: string;
    Picture: any;

  constructor(private loadingCtrl: LoadingController, private camera: Camera, public afDb: AngularFireDatabase){}

  uploadProfilePhoto(user, img) {
    // Create a root reference
    
    
    let imageuser =  firebase.auth().currentUser.uid.toString();
    let storageRef = firebase.storage().ref();

    let af = this.afDb;
    let path = `userProfile/${imageuser}/profilePhoto`;
    var iRef = storageRef.child(path);
    iRef.putString(img, 'base64', {contentType: 'image/jpg'}).then((snapshot) => {
      console.log('Uploaded a blob or file! Now storing the reference at',`/profilePhoto`);
      af.object(`userProfile/${imageuser}/profilePhoto`).update({ path: path, filename: snapshot.downloadURL })
    });
  }

  getProfileImage(user : User) :  ReplaySubject<any>{
    let resultSubject = new ReplaySubject(1);
    let storage = firebase.storage();
    let imageuser =  firebase.auth().currentUser.uid.toString();

    this.afDb.object(`userProfile/${imageuser}/profilePhoto`)
      .subscribe(image => {
        console.log('image', image);
        if(image.path != null){
          console.log('one', image);
          var pathReference = storage.ref(image.path);
          pathReference.getDownloadURL().then(url => {
            let result = {image: url, path: image.path, filename: image.filename};
            console.log('two', result);
            resultSubject.next(result);
            //this.profileImage = result;
          });

        }
      });

    return resultSubject;
  }


}