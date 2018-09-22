import { Injectable } from '@angular/core';
import {AngularFireAuth} from 'angularfire2/auth';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';
import {resolve} from 'url';
import {reject} from 'q';
import { auth } from 'firebase';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(

  private afa: AngularFireAuth,

  ) { }

  login(email: string, password: string){

    return new Promise((resolve,reject)=>{
      this.afa.auth.signInWithEmailAndPassword(email,password)
      .then(userData => resolve(userData), err => reject(err))
     
    })

  }

  getAuth(){
    return this.afa.authState.pipe(
      map(auth => auth)
    );
  }

  logout(){
    this.afa.auth.signOut();
  }
}
