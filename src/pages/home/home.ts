import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { LoadingController } from 'ionic-angular';
import Parser from 'rss-parser';
import { NewsDetailPage } from '../news-detail/news-detail';
import { OfflineProvider } from '../../providers/offline/offline';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  feed: any = null;

  constructor(public navCtrl: NavController, private loadingCtrl: LoadingController, private offline: OfflineProvider) {
    this.loadRSS();
  }

  async loadRSS() {
    let loading = this.loadingCtrl.create({
      content: 'Cargando...'
    });
  
    loading.present();

    let parser = new Parser();

    const CORS_PROXY = "https://cors-anywhere.herokuapp.com/"

    this.feed = await parser.parseURL(CORS_PROXY + 'https://www.elcomercio.com/rss/');
    //console.log(this.feed);
    this.feed.items.forEach(element => {
      element = this.offline.getDate(element);
    });
    loading.dismiss();
  }

  viewDetail(item: any) {
    this.navCtrl.push(NewsDetailPage, { item } );
  }

}
