import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AngularFireAuth} from 'angularfire2/auth';
import { AngularFirestore } from 'angularfire2/firestore';
import { User } from 'firebase';

@Injectable()
export class FcmServiceProvider {

  currentUser: User;

  constructor(
    public http: HttpClient,
    private afAuth: AngularFireAuth, 
    private afStore: AngularFirestore
  ) {
    console.log('Hello FcmServiceProvider Provider');
  }

  async register(email: string, password: string) {
    try {
      const result = await this.afAuth.auth.createUserWithEmailAndPassword(email, password);
      if(result) {
        this.currentUser = await this.afAuth.auth.currentUser;
        this.currentUser.sendEmailVerification();
        return result;
      }
    }
    catch(e) {
      console.error(e);
      return e;
    }
  }

  async login(email: string, password: string) {
    try {
      await this.afAuth.auth.signInWithEmailAndPassword(email, password).then(res => {
        this.currentUser = this.afAuth.auth.currentUser;
        return 'succes';
      });
    }
    catch(e) {
      console.error(e);
      if(e.code == 'auth/invalid-email') {
        return 'Dirección de correo incorrecta';
      }
      else if(e.code == 'auth/user-not-found' || e.code == 'auth/wrong-password') {
        return 'Usuario o contraseña incorrecto';
      }
    }
  }

  async logout() {
    try {
      this.afAuth.auth.signOut().then(res => {
        console.log(res);
      })
      .catch();
    }
    catch(e) {
      console.error(e);
    }
  }

}
