import { MaterializeModule } from 'angular2-materialize';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { RouterModule, Routes } from '@angular/router';
import { AngularFireModule } from 'angularfire2';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { environment } from '../environments/environment';
import { FormsModule } from '@angular/forms';
import { EstadoCuentaComponent } from './estado-cuenta/estado-cuenta.component';
import { ConsultarVehiculosComponent } from './consultar-vehiculos/consultar-vehiculos.component';
import { AsociarVehiculosComponent } from './asociar-vehiculos/asociar-vehiculos.component';
import { InformacionBatchComponent } from './informacion-batch/informacion-batch.component';
import {ToastModule} from 'ng2-toastr/ng2-toastr';
import {AuthService} from './providers/auth.service';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

const appRoutes: Routes = [
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: '',
    redirectTo: '/login',
    pathMatch: 'full'
  },
  {
    path: 'consultarVehiculos',
    component: ConsultarVehiculosComponent,
    canActivate : [AuthService]
  },
  {
    path: 'estadoCuenta',
    component:EstadoCuentaComponent,
    canActivate : [AuthService]
  }
];


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    EstadoCuentaComponent,
    ConsultarVehiculosComponent,
    AsociarVehiculosComponent,
    InformacionBatchComponent,
  ],
  imports: [
    BrowserModule,
    MaterializeModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireAuthModule,
    FormsModule,RouterModule.forRoot(
      appRoutes,
      { enableTracing: false }
    ),
    ToastModule.forRoot(),
    BrowserAnimationsModule
  ],
  providers: [AuthService],
  bootstrap: [AppComponent]
})
export class AppModule { }
