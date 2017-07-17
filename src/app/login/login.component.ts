import { Component, OnInit, EventEmitter, ViewContainerRef } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import * as firebase from 'firebase/app';

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
    private router: Router) {
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
    firebase.auth().signInWithEmailAndPassword(this.email, this.password).then(function (user) {
      user = firebase.auth().currentUser;
      localStorage.setItem('currentUser', user.uid);
      router.navigate(['/consultarVehiculos']);
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

}
