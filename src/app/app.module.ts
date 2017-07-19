
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
import { AuthService } from './providers/auth.service';
import { HomeComponent } from './home/home.component';
import { HttpModule, JsonpModule } from '@angular/http';
import { ComparendoService } from './services/comparendo.service';
import { EmailService } from './services/email.service';
import { TelefonoService } from './services/telefono.service';
import { JwtService } from './services/jwt.service';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { VehiculosService } from './services/vehiculos.service';
import { DetalleVehiculoComponent } from './detalle-vehiculo/detalle-vehiculo.component';
import {NgxPaginationModule} from 'ngx-pagination';

const appRoutes: Routes = [
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'informacion-batch',
    component: InformacionBatchComponent
  },
  {
    path: 'estado-cuenta',
    component: EstadoCuentaComponent
  },
  {
    path: 'consultar-vehiculos',
    component: ConsultarVehiculosComponent
  },
  {
    path: 'asociar-vehiculos',
    component: AsociarVehiculosComponent
  },
  {
    path: 'detalle-vehiculo/:placa',
    component: DetalleVehiculoComponent
  },
  {
    path: 'home',
    component: HomeComponent
  },
  {
    path: '',
    redirectTo: '/login',
    pathMatch: 'full'
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
    HomeComponent,
    DetalleVehiculoComponent
  ],
  imports: [
    BrowserModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireAuthModule,
    FormsModule, RouterModule.forRoot(
      appRoutes,
      { enableTracing: false }
    ),
    HttpModule,
    NgbModule.forRoot(),
    NgxPaginationModule
  ],
  providers: [AuthService, ComparendoService, EmailService, TelefonoService, JwtService,VehiculosService],
  bootstrap: [AppComponent]
})
export class AppModule { }
