import { FcmServiceProvider } from './../fcm-service/fcm-service';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { OfflineProvider } from '../offline/offline';

@Injectable()
export class AuthProvider {

  userEmail: string;
  logged: boolean = false;

  constructor(
    public http: HttpClient,
    private fcmService: FcmServiceProvider,
    private offlineService: OfflineProvider
  ) {
    console.log('Hello AuthProvider Provider');
  }

  async login(email: string, password: string) {
    
    const response = await this.fcmService.login(email, password);
    this.offlineService.saveCredentials(email, password);
    this.logged = true;
    this.userEmail = email;
  }
}
