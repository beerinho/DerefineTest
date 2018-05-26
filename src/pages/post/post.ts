import { Component } from '@angular/core';
import { NavParams, NavController, LoadingController, AlertController, IonicPage } from 'ionic-angular';
import { HomePage } from '../home/home';
import { WordpressService } from '../../providers/wordpress-provider';
import { Observable } from "rxjs/Observable";
import 'rxjs/add/operator/map';
import 'rxjs/add/observable/forkJoin';

@IonicPage()
@Component({
  selector: 'page-post',
  templateUrl: 'post.html'
})
export class PostPage {

  post: any;
 // user: string;
 // comments: Array<any> = new Array<any>();
 // categories: Array<any> = new Array<any>();
 morePagesAvailable: boolean = true;

  constructor(
    public navParams: NavParams,
    public navCtrl: NavController,
    public loadingCtrl: LoadingController,
    public alertCtrl: AlertController,
    public wordpressService: WordpressService,
  ) {

  }

  ionViewWillEnter(){
    this.morePagesAvailable = true;
    let loading = this.loadingCtrl.create();

    loading.present();

    this.post = this.navParams.get('item');

    loading.dismiss();

  }
/*
    Observable.forkJoin(
      this.getAuthorData(),
      this.getCategories(),
      this.getComments())
      .subscribe(data => {
        this.user = data[0].name;
        this.categories = data[1];
        this.comments = data[2];
        loading.dismiss();
      });
  }

  getAuthorData(){
    return this.wordpressService.getAuthor(this.post.author);
  }

  getCategories(){
    return this.wordpressService.getPostCategories(this.post);
  }

  getComments(){
    return this.wordpressService.getComments(this.post.id);
  }

  loadMoreComments(infiniteScroll) {
    let page = (this.comments.length/10) + 1;
    this.wordpressService.getComments(this.post.id, page)
    .subscribe(data => {
      for(let item of data){
        this.comments.push(item);
      }
      infiniteScroll.complete();
    }, err => {
      console.log(err);
      this.morePagesAvailable = false;
    })
  }

  goToCategoryPosts(categoryId, categoryTitle){
    console.log(categoryId)
    this.navCtrl.push("DebunkPage", {
      id: categoryId,
      title: categoryTitle
    })
  }*/

  //Comment section needs to be sorted 
  //https://github.com/ionicthemes/ionic3-wordpress-integration/blob/master/src/pages/post/post.ts
}
