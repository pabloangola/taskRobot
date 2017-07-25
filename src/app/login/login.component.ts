import { Component, OnInit, EventEmitter, ViewContainerRef } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import * as firebase from 'firebase/app';
import { JwtService } from '../services/jwt.service';
import { JwtRequest } from '../dto/jwtRequest';

import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {

  user: Observable<firebase.User>;
  email: string = "";
  password: string = "";
  registerEmail: string;
  registerPassword: string;
  forgetEmail: string;

  constructor(
    private router: Router,
    private jwtService: JwtService) {}

  ngOnInit() { }

  forgetPassword(): void{
    firebase.auth().sendPasswordResetEmail(this.forgetEmail).then(error => error.message)
  }

  loginWithEmail(): void {
    let jwtService: JwtService = this.jwtService;
    let signCustomToken = this.signCustomToken;
    let router = this.router;
    firebase.auth().signInWithEmailAndPassword(this.email, this.password).then
      (user => {
        localStorage.setItem('currentUser', user);
        user = firebase.auth().currentUser.getToken(false).then(function (idToken) {
          jwtService.sendToken(idToken).subscribe(customToken => localStorage.setItem('customToken', customToken));
         // signCustomToken();
          router.navigate(['/dashboard']);
        });
      }).catch(error => error.message);
      
  }

  signCustomToken(): void {
    let customtoken = localStorage.getItem("customToken");
    let user: String;
    firebase.auth().signInWithCustomToken(customtoken)
    .then(()=>firebase.auth().currentUser.getToken(false)
          .then(idToken => localStorage.setItem('customToken', idToken))
          .catch(e => e.message))
    .catch(error => error.message);
  }
}
