import {Inject, Injectable} from '@angular/core';
import {ReplaySubject} from "rxjs";
import {User} from "../models/user";
import * as firebase from 'firebase';
import { AngularFireDatabase } from 'angularfire2/database-deprecated';
import { Camera, CameraOptions } from '@ionic-native/camera';

@Injectable()
export class ProfilePhotoService {

    base64Image: string;
    Picture: any;
    imageuser =  firebase.auth().currentUser.uid.toString();

  constructor(private camera: Camera, public afDb: AngularFireDatabase){}

  uploadProfilePhoto(user, img) {
    // Create a root reference
    
    let storageRef = firebase.storage().ref();

    let af = this.afDb;
    let path = `userProfile/${this.imageuser}/profilePhoto`;
    var iRef = storageRef.child(path);
    iRef.putString(img, 'base64', {contentType: 'image/jpg'}).then((snapshot) => {
      console.log('Uploaded a blob or file! Now storing the reference at',`/profilePhoto`);
      af.object(`userProfile/${this.imageuser}/profilePhoto`).update({ path: path, filename: this.imageuser })
    });
  }

  getProfileImage(user : User) :  ReplaySubject<any>{
    let resultSubject = new ReplaySubject(1);
    let storage = firebase.storage();

    this.afDb.object(`userProfile/${this.imageuser}/profilePhoto`)
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