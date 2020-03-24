import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';

import { AboutPage } from '../pages/about/about';
import { ContactPage } from '../pages/contact/contact';
import { HomePage } from '../pages/home/home';
import { TabsPage } from '../pages/tabs/tabs';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { NewsDetailPageModule } from '../pages/news-detail/news-detail.module';
import { NewsPageModule } from '../pages/news/news.module';
import { InAppBrowser } from '@ionic-native/in-app-browser';
import { SocialSharing } from '@ionic-native/social-sharing';
import { OfflineProvider } from '../providers/offline/offline';
import { HttpClientModule } from '@angular/common/http';
import { AppRate } from '@ionic-native/app-rate';
import { FcmServiceProvider } from '../providers/fcm-service/fcm-service';

import { AngularFireModule } from 'angularfire2';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { AngularFirestoreModule } from 'angularfire2/firestore';
import { AuthProvider } from '../providers/auth/auth';

import { IonicStorageModule } from '@ionic/storage';
import { RegisterPageModule } from '../pages/register/register.module';
import { LoginPageModule } from '../pages/login/login.module';

export const firebaseConfig = {
  apiKey: "AIzaSyAT7HZk1RCuy5A47Fq50YPSyWzyz3o53kE",
  authDomain: "news-e30dc.firebaseapp.com",
  databaseURL: "https://news-e30dc.firebaseio.com",
  projectId: "news-e30dc",
  storageBucket: "news-e30dc.appspot.com",
  messagingSenderId: "504171447769"
};

@NgModule({
  declarations: [
    MyApp,
    AboutPage,
    ContactPage,
    HomePage,
    TabsPage
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    NewsPageModule,
    NewsDetailPageModule,
    RegisterPageModule,
    LoginPageModule,
    IonicModule.forRoot(MyApp),
    AngularFireModule.initializeApp(firebaseConfig),
    AngularFireAuthModule,
    IonicStorageModule.forRoot()
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    AboutPage,
    ContactPage,
    HomePage,
    TabsPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    InAppBrowser,
    AppRate,
    SocialSharing,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    OfflineProvider,
    FcmServiceProvider,
    AuthProvider
  ]
})
export class AppModule {}
