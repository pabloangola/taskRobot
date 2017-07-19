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
    private jwtService: JwtService) {
  }

  forgetPassword() {
    firebase.auth().sendPasswordResetEmail(this.forgetEmail).then(function () {

    }, function (error) {
      var errorMessage = error.message;

    });
  }
  ngOnInit() { }

  LoginWithEmail() {
    var router = this.router;
    let jwtService: JwtService = this.jwtService;
    firebase.auth().signInWithEmailAndPassword(this.email, this.password).then(function (user) {
      var token;
      user = firebase.auth().currentUser.getToken(false).then(function (idToken) {
        token = idToken;
        let jwtRequestObject = new JwtRequest();
        jwtRequestObject.token = token;
        jwtService.sendToken(jwtRequestObject).subscribe();
        localStorage.setItem('currentUser', user.uid);
        router.navigate(['/consultar-vehiculos']);
      });
    }).catch(function (error) {
      var errorMessage = error.message;
    });
  }
}
