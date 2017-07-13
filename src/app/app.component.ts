import { Component, ViewContainerRef } from '@angular/core';
import { ToastsManager } from 'ng2-toastr/ng2-toastr';
import { AngularFireAuth } from 'angularfire2/auth';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent {
  title = 'app';

  constructor(public afAuth: AngularFireAuth, public toastr: ToastsManager, vRef: ViewContainerRef,private router: Router) {
    this.toastr.setRootViewContainerRef(vRef);
  }

  logout() {
    this.afAuth.auth.signOut();
  }
}
