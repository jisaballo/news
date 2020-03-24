import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AppRate } from '@ionic-native/app-rate';
import { Platform } from 'ionic-angular';
import { Storage } from '@ionic/storage';

@Injectable()
export class OfflineProvider {

  constructor(
    public http: HttpClient, 
    public platform: Platform, 
    private appRate: AppRate,
    private storage: Storage
  ) {
    console.log('Hello OfflineProvider Provider');
  }

  getMonth(monthIndex: number) {
    if(monthIndex == 0) {
      return 'Enero';
    } else if(monthIndex == 1) {
      return 'Febrero';
    } else if(monthIndex == 2) {
      return 'Marzo';
    } else if(monthIndex == 3) {
      return 'Abril';
    } else if(monthIndex == 4) {
      return 'Mayo';
    } else if(monthIndex == 5) {
      return 'Junio';
    } else if(monthIndex == 6) {
      return 'Julio';
    } else if(monthIndex == 7) {
      return 'Agosto';
    } else if(monthIndex == 8) {
      return 'Septiembre';
    } else if(monthIndex == 9) {
      return 'Octubre';
    } else if(monthIndex == 10) {
      return 'Noviembre';
    } else if(monthIndex == 11) {
      return 'Diciembre';
    }
  }

  presentRating() {
    this.platform.ready().then(() => {
      this.appRate.preferences= {
        storeAppURL: {
          android: 'market://details?id=<com.bestcode.noticias>',
        },
        usesUntilPrompt: 3,
        useLanguage: 'es',
        simpleMode: true
      }
      this.appRate.promptForRating(false);
    });
  }

  getDate(feed: any) {
    let date = new Date(feed.pubDate);
    let day = date.getDate();
    let month = this.getMonth(date.getMonth());
    let hours = date.getHours();
    let minutes = date.getMinutes();
    let meridiam = 'AM';
    if(Number(hours) > 11) {
      meridiam = 'PM';
      if(Number(hours) != 12) {
        hours = hours - 12;
      }
    }
    feed.pubDate = day + ' de ' + month + ', ' + (hours < 10 ? '0' + hours : hours) + ':' + (minutes < 10 ? '0' + minutes : minutes) + ' ' + meridiam;
    return feed;
  }

  saveCredentials(correo: string, contrasena: string) {
    this.storage.get('email').then((email) => {
      if(!email) {
        this.storage.set('email', correo);
        this.storage.get('password').then((password) => {
          if(!password) {
            this.storage.set('password', contrasena);
          }
        });
      }
    });
  }
}
