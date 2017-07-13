import { Component, OnInit, EventEmitter, ViewContainerRef } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import * as firebase from 'firebase/app';
import { MaterializeAction } from 'angular2-materialize';
import { Router } from '@angular/router';
import { ToastsManager } from 'ng2-toastr/ng2-toastr';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {

  user: Observable<firebase.User>;
  email: string = "";
  password: string = "";
  modalRegister = new EventEmitter<string | MaterializeAction>();
  modalForget = new EventEmitter<string | MaterializeAction>();
  registerEmail: string;
  registerPassword: string;
  forgetEmail: string;

  constructor(
    private router: Router, private toastr: ToastsManager, private vRef: ViewContainerRef) {
    this.toastr.setRootViewContainerRef(vRef);
  }
  openModal() {
    this.modalRegister.emit({ action: "modal", params: ['open'] });
  }
  forgetModal() {
    this.modalForget.emit({ action: "modal", params: ['open'] });
  }

  registerUser() {
    var toastr = this.toastr;
    var modalRegister = this.modalRegister;
    firebase.auth().createUserWithEmailAndPassword(this.registerEmail, this.registerPassword).then(function () {
      toastr.success('Usuario registrado correctamente');
      modalRegister.emit({ action: "modal", params: ['close'] });
    }).catch(function (error) {
      var errorMessage = error.message;
      toastr.error(errorMessage);
    });
  }
  forgetPassword() {
    var toastr = this.toastr;
    var modalForget = this.modalForget;
    firebase.auth().sendPasswordResetEmail(this.forgetEmail).then(function () {
      toastr.success('La operacion se realizo correctamente porfavor verifique su correo electronico');
      modalForget.emit({ action: "modal", params: ['close'] });
    }, function (error) {
      var errorMessage = error.message;
      toastr.error(errorMessage);
    });
  }
  ngOnInit() { }

  LoginWithEmail() {
    var toastr = this.toastr;
    var router = this.router;
    firebase.auth().signInWithEmailAndPassword(this.email, this.password).then(function (user) {
      user = firebase.auth().currentUser;
      localStorage.setItem('currentUser', user.uid);
      router.navigate(['/consultarVehiculos']);
    }).catch(function (error) {
      var errorMessage = error.message;
      toastr.error(errorMessage);
    });
  }

  loginWithGoogle() {
    var toastr = this.toastr;
    var router = this.router;
    firebase.auth().signInWithPopup(new firebase.auth.GoogleAuthProvider()).then(function (result) {
      var user = result.user;
      localStorage.setItem('currentUser', user.uid);
      router.navigate(['/consultarVehiculos']);
    }).catch(function (error) {
      var errorMessage = error.message;
      toastr.error(errorMessage);
    });;
  }

}
