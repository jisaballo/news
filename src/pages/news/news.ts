import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController } from 'ionic-angular';
import Parser from 'rss-parser';
import { NewsDetailPage } from '../news-detail/news-detail';
import { OfflineProvider } from '../../providers/offline/offline';

@IonicPage()
@Component({
  selector: 'page-news',
  templateUrl: 'news.html',
})
export class NewsPage {

  title: string = 'Noticias';
  url: string = null;
  feed: any = null;

  constructor(public navCtrl: NavController, public navParams: NavParams, private loadingCtrl: LoadingController,
    private offline: OfflineProvider) {
    this.url = this.navParams.get('url');
    this.loadRSS();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad NewsPage');
  }

  async loadRSS() {
    let loading = this.loadingCtrl.create({
      content: 'Cargando...'
    });
  
    loading.present();

    let parser = new Parser();

    const CORS_PROXY = "https://cors-anywhere.herokuapp.com/"

    this.feed = await parser.parseURL(CORS_PROXY + this.url);
    this.title = this.feed.description;
    this.feed.items.forEach(element => {
      element = this.offline.getDate(element);
    });
    //console.log(this.feed);
    loading.dismiss();
  }

  viewDetail(item: any) {
    this.navCtrl.push(NewsDetailPage, { item } );
  }

}
