
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { HttpModule, JsonpModule } from '@angular/http';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';



import { ComparendoService } from './services/comparendo.service';
import { EmailService } from './services/email.service';
import { TelefonoService } from './services/telefono.service';
import { JwtService } from './services/jwt.service';
import { VehiculosService } from './services/vehiculos.service';

import { LoginComponent } from './login/login.component';
import { EstadoCuentaComponent } from './estado-cuenta/estado-cuenta.component';
import { ConsultarVehiculosComponent } from './consultar-vehiculos/consultar-vehiculos.component';
import { AsociarVehiculosComponent } from './asociar-vehiculos/asociar-vehiculos.component';
import { InformacionBatchComponent } from './informacion-batch/informacion-batch.component';
import { AppComponent } from './app.component';
import { DetalleVehiculoComponent } from './detalle-vehiculo/detalle-vehiculo.component';
import { HomeComponent } from './home/home.component';
import { DashboardComponent } from './dashboard/dashboard.component';

import { AngularFireModule } from 'angularfire2';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { environment } from '../environments/environment';
import { AuthService } from './providers/auth.service';

import { ChartModule } from 'angular2-highcharts';
import { HighchartsStatic } from 'angular2-highcharts/dist/HighchartsService';
import { Ng2FileInputModule } from 'ng2-file-input';
import { NvD3Component } from 'ng2-nvd3';
import { NgPipesModule } from 'ngx-pipes';
import { InfiniteScrollModule } from 'angular2-infinite-scroll';

import 'd3';
import 'nvd3';

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
    path: 'dashboard',
    component: DashboardComponent
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
    AsociarVehiculosComponent,
    InformacionBatchComponent,
    HomeComponent,
    DetalleVehiculoComponent,
    DashboardComponent,
    NvD3Component
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
    Ng2FileInputModule.forRoot(),
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
