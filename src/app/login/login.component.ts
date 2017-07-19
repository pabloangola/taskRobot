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
  //modalRegister = new EventEmitter<string | MaterializeAction>();
  //modalForget = new EventEmitter<string | MaterializeAction>();
  registerEmail: string;
  registerPassword: string;
  forgetEmail: string;

  constructor(
    private router: Router,
    private jwtService: JwtService) {
  }
  openModal() {
    //  this.modalRegister.emit({ action: "modal", params: ['open'] });
  }
  forgetModal() {
    //this.modalForget.emit({ action: "modal", params: ['open'] });
  }

  registerUser() {

    //  var modalRegister = this.modalRegister;
    firebase.auth().createUserWithEmailAndPassword(this.registerEmail, this.registerPassword).then(function () {

      //   modalRegister.emit({ action: "modal", params: ['close'] });
    }).catch(function (error) {
      var errorMessage = error.message;

    });
  }
  forgetPassword() {

    //var modalForget = this.modalForget;
    firebase.auth().sendPasswordResetEmail(this.forgetEmail).then(function () {

      //  modalForget.emit({ action: "modal", params: ['close'] });
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
        router.navigate(['/consultarVehiculos']);
      
      });


    }).catch(function (error) {
      var errorMessage = error.message;

    });
  }

  loginWithGoogle() {

    var router = this.router;
    firebase.auth().signInWithPopup(new firebase.auth.GoogleAuthProvider()).then(function (result) {
      var user = result.user;
      localStorage.setItem('currentUser', user.uid);
      router.navigate(['/consultarVehiculos']);
    }).catch(function (error) {
      var errorMessage = error.message;

    });;
  }

  enviarToken(uid) {



  }

}
