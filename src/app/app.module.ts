import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';

import { HttpModule } from '@angular/http';

//*********** ionic Native **************/
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { Geolocation } from '@ionic-native/geolocation';


import { MyApp } from './app.component';

//***********  Angularfire2 v5 **************/

import { AngularFireModule } from 'angularfire2';
// New imports to update based on AngularFire2 version 4
import { AngularFireDatabaseModule } from 'angularfire2/database-deprecated';
import { AngularFireAuthModule } from 'angularfire2/auth';

//***********  Facebook **************/
import { Facebook } from '@ionic-native/facebook';
//***********  Google plus **************/
import { GooglePlus } from '@ionic-native/google-plus';

//*********** Provider **************/
import { AuthData } from '../providers/auth-data';
import { RadioPlayer } from '../providers/radio-service';
import { ProfilePhotoService } from '../providers/profile-photo';


//************** import image gallery *********************//

import * as ionicGalleryModal from 'ionic-gallery-modal';
import { HAMMER_GESTURE_CONFIG } from '@angular/platform-browser';


//************** ionic camera *********************//

import { Camera, CameraOptions } from '@ionic-native/camera';
import { WordpressService } from '../providers/wordpress-provider';
import { Crop } from '@ionic-native/crop';

//************** ionic calendar *********************//

import { NgCalendarModule  } from 'ionic2-calendar';

//********** firebase configuration  ************ */
export const config = { 
  apiKey: "AIzaSyDBDuMks7F904683ChKt-6An9jwly89p-c",
  authDomain: "test-9c664.firebaseapp.com",
  databaseURL: "https://test-9c664.firebaseio.com",
  projectId: "test-9c664",
  storageBucket: "test-9c664.appspot.com",
  messagingSenderId: "993408160373"
};
  
@NgModule({
  declarations: [
    MyApp
  ],
  imports: [
    BrowserModule,
    ionicGalleryModal.GalleryModalModule,
    IonicModule.forRoot(MyApp),
    AngularFireModule.initializeApp(config),
    AngularFireDatabaseModule,
    AngularFireAuthModule,
    HttpModule,
    NgCalendarModule,
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp
  ],
  providers: [
    StatusBar,
    SplashScreen,
    Geolocation,
    ProfilePhotoService,
    {
      provide: HAMMER_GESTURE_CONFIG,
      useClass: ionicGalleryModal.GalleryModalHammerConfig,
    },
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    AuthData,
    Facebook,
    RadioPlayer,
    Facebook,
    GooglePlus,
    Camera,
    WordpressService,
    Crop,
  ]
})
export class AppModule {}
