import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { InAppBrowser } from '@ionic-native/in-app-browser';
import { SocialSharing } from '@ionic-native/social-sharing';
import { OfflineProvider } from '../../providers/offline/offline';

@IonicPage()
@Component({
  selector: 'page-news-detail',
  templateUrl: 'news-detail.html',
})
export class NewsDetailPage {

  noticia: any;

  constructor(public navCtrl: NavController, public navParams: NavParams, private iab: InAppBrowser, 
    private socialSharing: SocialSharing, private offline: OfflineProvider) {
    this.noticia = this.navParams.get('item');
    //console.log(this.noticia);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad NewsDetailPage');
  }

  ionViewWillLeave() {
    console.log('here');
    this.offline.presentRating();
  }

  viewOnBrowser() {
    const browser = this.iab.create('https://ionicframework.com/');

    //browser.executeScript(...);

    //browser.insertCSS(...);
    browser.on('loadstop').subscribe(event => {
      browser.insertCSS({ code: "body{color: red;" });
    });

    //browser.close();
  }

  shareViaWhatsapp() {
    let message = this.noticia.title;
    let image = this.noticia.enclosure.url;
    let url = this.noticia['link'];

    this.socialSharing.shareViaWhatsApp(message, image, url).then(response => {
      console.log(response);
    });
  }
}
