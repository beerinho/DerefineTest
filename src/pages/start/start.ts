import { AuthData } from './../../providers/auth-data';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Loading, LoadingController, AlertController, Platform } from 'ionic-angular';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { GooglePlus } from '@ionic-native/google-plus';
import { Facebook } from '@ionic-native/facebook';


@IonicPage()
@Component({
  selector: 'page-start',
  templateUrl: 'start.html',
})
export class StartPage {

    startSwitch: string = "signup";
    public registerForm;
    public loginForm: any;
    public backgroundImage: any = "./assets/bg1.jpg";
    public imgLogo: any = "./assets/medium_150.70391061453px_1202562_easyicon.net.png";
  
    constructor(public navCtrl: NavController, public authData: AuthData, public fb: FormBuilder, public alertCtrl: AlertController,public loadingCtrl: LoadingController,private facebook: Facebook,
      private googleplus: GooglePlus,
      private platform: Platform,) {
        let EMAIL_REGEXP = /^[a-z0-9!#$%&'*+\/=?^_`{|}~.-]+@[a-z0-9]([a-z0-9-]*[a-z0-9])?(\.[a-z0-9]([a-z0-9-]*[a-z0-9])?)*$/i;
        this.loginForm = fb.group({
              email: ['', Validators.compose([Validators.required, Validators.pattern(EMAIL_REGEXP)])],
              password: ['', Validators.compose([Validators.minLength(6), Validators.required])]
        });

        this.registerForm = fb.group({
          email: ['', Validators.compose([Validators.required, Validators.pattern(EMAIL_REGEXP)])],
          firstName: ['', Validators.compose([Validators.minLength(2), Validators.required])],
          lastName: ['', Validators.compose([Validators.minLength(2), Validators.required])],
          password: ['', Validators.compose([Validators.required])],

    });
    }

  login(){
    if (!this.loginForm.valid){
        //this.presentAlert('Username password can not be blank')
        console.log("error");
    } else {
      let loadingPopup = this.loadingCtrl.create({
        spinner: 'crescent', 
        content: ''
      });
      loadingPopup.present();

      this.authData.loginUser(this.loginForm.value.email, this.loginForm.value.password)
      .then( authData => {
        console.log("Auth pass");
        loadingPopup.dismiss();
        this.navCtrl.setRoot("HomePage");
      }, error => {
        var errorMessage: string = error.message;
        loadingPopup.dismiss().then( () => {
            this.presentAlert(errorMessage)
        });
      });
    }
}

presentAlert(title) {
  let alert = this.alertCtrl.create({
    title: title,
    buttons: ['OK']
  });
  alert.present();
}


forgot(){
  this.navCtrl.push('ForgotPage');
}

registerUser(){
  console.log("call signopUser");
  if (!this.registerForm.valid){
    console.log(this.registerForm.value);
    this.presentAlert("invalid form");
  } else {

    let loadingPopup = this.loadingCtrl.create({
      spinner: 'crescent', 
      content: 'Creating..'
    });
    loadingPopup.present();

    this.authData.registerUser(
        this.registerForm.value.firstName,
        this.registerForm.value.lastName, 
        this.registerForm.value.email, 
        this.registerForm.value.password)
    .then(() => {
        loadingPopup.dismiss();
        this.navCtrl.setRoot("HomePage");
    }, (error) => { 
       var errorMessage: string = error.message;
        loadingPopup.dismiss();
        this.presentAlert(errorMessage);      
    });
  }
}

loginWithGoogle(){
  let loadingPopup = this.loadingCtrl.create({
  spinner: 'crescent', 
  content: '',
  duration: 15000
  });
  loadingPopup.present();
  if (this.platform.is('cordova')) {
    this.authData.signInWithGoogle()
    .then( authData => {
      this.authData.updateUserProfile(authData.uid,authData.displayName,authData.email,authData.photoURL,authData.phoneNumber)
      loadingPopup.dismiss();
      this.navCtrl.setRoot("HomePage");
    }, error => {
      var errorMessage: string = error.message;
      loadingPopup.dismiss().then( () => {
        alert("Error"+errorMessage)
      });
    });  
  }
  else {
    alert("Please install app in device.")
    loadingPopup.dismiss();
  }
}

  ionViewDidLoad() {
    console.log('ionViewDidLoad StartPage');
  }

}
