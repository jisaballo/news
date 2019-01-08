import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { NewsPage } from '../news/news';

@Component({
  selector: 'page-about',
  templateUrl: 'about.html'
})
export class AboutPage {

  constructor(public navCtrl: NavController) {

  }

  viewSection(option: number) {
    let url = '';
    if(option == 1) {
      url = 'https://www.elcomercio.com/rss/actualidad';
    } else if(option == 2) {
      url = 'https://www.elcomercio.com/rss/tendencias';
    } else if(option == 3) {
      url = 'https://www.elcomercio.com/rss/deportes';
    } else {
      url = 'https://www.elcomercio.com/rss/opinion';
    }
    this.navCtrl.push(NewsPage, { url } );
  }
}
