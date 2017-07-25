
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
import { NgxPaginationModule } from 'ngx-pagination';
import { NgPipesModule } from 'ngx-pipes';
import { InfiniteScrollModule } from 'angular2-infinite-scroll';
import { DetalleComparendoComponent } from './detalle-comparendo/detalle-comparendo.component';
import { AgregarVehiculoComponent } from './agregar-vehiculo/agregar-vehiculo.component';

import 'd3';
import 'nvd3';

import { ChartModule } from 'angular2-highcharts';
import { HighchartsStatic } from 'angular2-highcharts/dist/HighchartsService';
//import { Ng2FileInputModule } from 'ng2-file-input';
//Ng2FileInputModule.forRoot(),
import { NvD3Component } from 'ng2-nvd3';
import { DashboardComponent } from './dashboard/dashboard.component';
import { DetalleNotificacionesComponent } from './detalle-notificaciones/detalle-notificaciones.component';

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
    path: 'detalle-vehiculo/:placa',
    component: DetalleVehiculoComponent
  },
  {
    path: 'agregar-vehiculo',
    component: AgregarVehiculoComponent
  },
  {
    path: 'home',
    component: HomeComponent
  },
  {
    path: 'dashboard',
    component: DashboardComponent
  },
  {
    path: 'detalle-notificacion/:id',
    component: DetalleNotificacionesComponent
  },
  {
    path: '',
    redirectTo: '/login',
    pathMatch: 'full'
  }
];

export declare let require: any;

export function highchartsFactory() {
  const hc = require('highcharts/highstock');
  const dd = require('highcharts/modules/exporting');
  dd(hc);

  return hc;
}

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    EstadoCuentaComponent,
    ConsultarVehiculosComponent,
    InformacionBatchComponent,
    HomeComponent,
    DetalleVehiculoComponent,
    DetalleComparendoComponent,
    AgregarVehiculoComponent,
        DashboardComponent,
    NvD3Component,
    DetalleNotificacionesComponent
  ],
  imports: [
     ChartModule,
    BrowserModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireAuthModule,
    FormsModule, RouterModule.forRoot(
      appRoutes,
      { enableTracing: false }
    ),
    HttpModule, NgbModule,
    NgbModule.forRoot(),
    NgxPaginationModule,
    NgPipesModule,
    InfiniteScrollModule
  ],
  providers: [AuthService, ComparendoService, EmailService, TelefonoService, JwtService, VehiculosService,
    {
      provide: HighchartsStatic,
      useFactory: highchartsFactory
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
