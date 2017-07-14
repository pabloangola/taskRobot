import { Component, OnInit } from '@angular/core';
import { Http, Response, RequestOptions, Headers } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import { ComparendoService} from '../services/comparendo.service';
import { Comparendo } from '../dto/comparendo';
import { EmailRequest } from '../dto/emailRequest';
@Component({
  selector: 'app-estado-cuenta',
  templateUrl: './estado-cuenta.component.html',
  styleUrls: ['./estado-cuenta.component.css']
})
export class EstadoCuentaComponent implements OnInit {

  placas = [];
  placa: string;
  comparendos:Comparendo[];
  emailRequest:EmailRequest[];
  valor= [
    {
        "numero": "11001000000002038635",
        "identificacion": {
            "numero": "8909039388",
            "tipo": 4
        },
        "fecha": 1329627600000,
        "direccion": "CL 145B - CR 91 - SUBA",
        "estado": "Pendiente",
        "fotodeteccion": false,
        "codigo": "C02",
        "total": 283400,
        "secretaria": "Bogotá D.C.",
        "placaVehiculo": "RMX200",
        "tipoVehiculo": "AUTOMOVIL",
        "servicioVehiculo": "Particular"
    },
    {
        "numero": "11001000000001982883",
        "identificacion": {
            "numero": "8909039388",
            "tipo": 4
        },
        "fecha": 1318914000000,
        "direccion": "CR 24 - CL 68-35 - USAQUEN -",
        "estado": "Pendiente",
        "fotodeteccion": false,
        "codigo": "C02",
        "total": 267800,
        "secretaria": "Bogotá D.C.",
        "placaVehiculo": "RGZ197",
        "tipoVehiculo": "BUS",
        "servicioVehiculo": "Particular"
    },
    {
        "numero": "11001000000002068373",
        "identificacion": {
            "numero": "8909039388",
            "tipo": 4
        },
        "fecha": 1333947600000,
        "direccion": "CL 91 - CR 20 - CHAPINERO",
        "estado": "Pendiente",
        "fotodeteccion": false,
        "codigo": "C02",
        "total": 283400,
        "secretaria": "Bogotá D.C.",
        "placaVehiculo": "REX020",
        "tipoVehiculo": "DESCONOCIDA",
        "servicioVehiculo": "Oficial"
    },
    {
        "numero": "11001000000002062016",
        "identificacion": {
            "numero": "8909039388",
            "tipo": 4
        },
        "fecha": 1332824400000,
        "direccion": "CR 10 - CL 10-47 - SANTA FE",
        "estado": "Pendiente",
        "fotodeteccion": false,
        "codigo": "C02",
        "total": 283400,
        "secretaria": "Bogotá D.C.",
        "placaVehiculo": "TEP150",
        "tipoVehiculo": "CAMION",
        "servicioVehiculo": "Publico"
    },
    {
        "numero": "11001000000002071555",
        "identificacion": {
            "numero": "8909039388",
            "tipo": 4
        },
        "fecha": 1334206800000,
        "direccion": "CR 75 - CL 25F - FONTIBON",
        "estado": "Pendiente",
        "fotodeteccion": false,
        "codigo": "C02",
        "total": 283400,
        "secretaria": "Bogotá D.C.",
        "placaVehiculo": "DAB444",
        "tipoVehiculo": "AUTOMOVIL",
        "servicioVehiculo": "Oficial"
    },
    {
        "numero": "11001000000001960041",
        "identificacion": {
            "numero": "8909039388",
            "tipo": 4
        },
        "fecha": 1336971600000,
        "direccion": "CR 116 - CL 26 VEHICO ABANDONADO - FONTIBON",
        "estado": "Pendiente",
        "fotodeteccion": false,
        "codigo": "C02",
        "total": 283400,
        "secretaria": "Bogotá D.C.",
        "placaVehiculo": "MMB631",
        "tipoVehiculo": "CAMIONETA",
        "servicioVehiculo": "Oficial"
    },
    {
        "numero": "11001000000001964961",
        "identificacion": {
            "numero": "8909039388",
            "tipo": 4
        },
        "fecha": 1337662800000,
        "direccion": "CL 22 SUR - CR 29B-71 PARQUEADO SOBRE EL ANDEN - PUENTE ARAN",
        "estado": "Pendiente",
        "fotodeteccion": false,
        "codigo": "C02",
        "total": 283400,
        "secretaria": "Bogotá D.C.",
        "placaVehiculo": "SPM494",
        "tipoVehiculo": "CAMION",
        "servicioVehiculo": "Particular"
    },
    {
        "numero": "11001000000001964485",
        "identificacion": {
            "numero": "8909039388",
            "tipo": 4
        },
        "fecha": 1337662800000,
        "direccion": "CL 162 - CR 20-21 - USAQUEN",
        "estado": "Pendiente",
        "fotodeteccion": false,
        "codigo": "C02",
        "total": 283400,
        "secretaria": "Bogotá D.C.",
        "placaVehiculo": "RBW797",
        "tipoVehiculo": "CAMPERO",
        "servicioVehiculo": "Oficial"
    },
    {
        "numero": "11001000000002967042",
        "identificacion": {
            "numero": "8909039388",
            "tipo": 4
        },
        "fecha": 1342846800000,
        "direccion": "CR 15 - CL 122 - USAQUEN",
        "estado": "Pendiente",
        "fotodeteccion": false,
        "codigo": "C02",
        "total": 283400,
        "secretaria": "Bogotá D.C.",
        "placaVehiculo": "REP243",
        "tipoVehiculo": "DESCONOCIDA",
        "servicioVehiculo": "Oficial"
    },
    {
        "numero": "11001000000002963074",
        "identificacion": {
            "numero": "8909039388",
            "tipo": 4
        },
        "fecha": 1342155600000,
        "direccion": "CL 90 - CR 15 - CHAPINERO - SUR-NORTE",
        "estado": "Pendiente",
        "fotodeteccion": false,
        "codigo": "C32",
        "total": 283400,
        "secretaria": "Bogotá D.C.",
        "placaVehiculo": "RCT514",
        "tipoVehiculo": "AUTOMOVIL",
        "servicioVehiculo": "Oficial"
    },
    {
        "numero": "76001000000003011101",
        "identificacion": {
            "numero": "8909039388",
            "tipo": 4
        },
        "fecha": 1343710800000,
        "direccion": ".",
        "estado": "Pendiente",
        "fotodeteccion": false,
        "codigo": "C32",
        "total": 307950,
        "secretaria": "Cali",
        "placaVehiculo": "CQX204",
        "tipoVehiculo": "DESCONOCIDA",
        "servicioVehiculo": "Particular"
    },
    {
        "numero": "76001000000003012470",
        "identificacion": {
            "numero": "8909039388",
            "tipo": 4
        },
        "fecha": 1344229200000,
        "direccion": ".",
        "estado": "Pendiente",
        "fotodeteccion": false,
        "codigo": "D04",
        "total": 591300,
        "secretaria": "Cali",
        "placaVehiculo": "CQX204",
        "tipoVehiculo": "DESCONOCIDA",
        "servicioVehiculo": "Particular"
    },
    {
        "numero": "11001000000003297373",
        "identificacion": {
            "numero": "8909039388",
            "tipo": 4
        },
        "fecha": 1345352400000,
        "direccion": "CL 26 - CR 103-22 VEHICULO APAGADO - FONTIBON",
        "estado": "Pendiente",
        "fotodeteccion": false,
        "codigo": "C02",
        "total": 283400,
        "secretaria": "Bogotá D.C.",
        "placaVehiculo": "RCV043",
        "tipoVehiculo": "AUTOMOVIL",
        "servicioVehiculo": "Oficial"
    },
    {
        "numero": "25899001000002895022",
        "identificacion": {
            "numero": "8909039388",
            "tipo": 4
        },
        "fecha": 1349931600000,
        "direccion": "0-NOSELECCIONADO CAJICA ZIPAQUIRA 0-NOSE",
        "estado": "Pendiente",
        "fotodeteccion": false,
        "codigo": "C29",
        "total": 283350,
        "secretaria": "CAJICA - DEPT CUNDINAMARCA",
        "placaVehiculo": "RBV506",
        "tipoVehiculo": "BUSETA",
        "servicioVehiculo": "Particular"
    },
    {
        "numero": "11001000000003355743",
        "identificacion": {
            "numero": "8909039388",
            "tipo": 4
        },
        "fecha": 1352782800000,
        "direccion": "CR 10 - CL 54 - CHAPINERO",
        "estado": "Pendiente",
        "fotodeteccion": false,
        "codigo": "C02",
        "total": 283400,
        "secretaria": "Bogotá D.C.",
        "placaVehiculo": "RNT784",
        "tipoVehiculo": "AUTOMOVIL",
        "servicioVehiculo": "Particular"
    },
    {
        "numero": "11001000000004323843",
        "identificacion": {
            "numero": "8909039388",
            "tipo": 4
        },
        "fecha": 1355202000000,
        "direccion": "CL 104 - CR 13A-29 S.R=28 - USAQUEN",
        "estado": "Pendiente",
        "fotodeteccion": false,
        "codigo": "C02",
        "total": 283400,
        "secretaria": "Bogotá D.C.",
        "placaVehiculo": "CDP318",
        "tipoVehiculo": "CAMPERO",
        "servicioVehiculo": "Oficial"
    },
    {
        "numero": "11001000000003302444",
        "identificacion": {
            "numero": "8909039388",
            "tipo": 4
        },
        "fecha": 1354078800000,
        "direccion": "CL 51 - CR 9-79 - CHAPINERO",
        "estado": "Pendiente",
        "fotodeteccion": false,
        "codigo": "C02",
        "total": 283400,
        "secretaria": "Bogotá D.C.",
        "placaVehiculo": "RHW639",
        "tipoVehiculo": "AUTOMOVIL",
        "servicioVehiculo": "Oficial"
    },
    {
        "numero": "11001000000004333140",
        "identificacion": {
            "numero": "8909039388",
            "tipo": 4
        },
        "fecha": 1355806800000,
        "direccion": "CR 68D - CL 25B - FONTIBON",
        "estado": "Pendiente",
        "fotodeteccion": false,
        "codigo": "C02",
        "total": 283400,
        "secretaria": "Bogotá D.C.",
        "placaVehiculo": "SWS864",
        "tipoVehiculo": "CAMION",
        "servicioVehiculo": "Publico"
    },
    {
        "numero": "11001000000004315372",
        "identificacion": {
            "numero": "8909039388",
            "tipo": 4
        },
        "fecha": 1354683600000,
        "direccion": "CR 69 - CL 25B-44 - ENGATIVA",
        "estado": "Pendiente",
        "fotodeteccion": false,
        "codigo": "C02",
        "total": 283400,
        "secretaria": "Bogotá D.C.",
        "placaVehiculo": "TAU007",
        "tipoVehiculo": "CAMIONETA",
        "servicioVehiculo": "Publico"
    },
    {
        "numero": "11001000000004318118",
        "identificacion": {
            "numero": "8909039388",
            "tipo": 4
        },
        "fecha": 1354770000000,
        "direccion": "CR 19 - CL 12-48 - MARTIRES",
        "estado": "Pendiente",
        "fotodeteccion": false,
        "codigo": "C03",
        "total": 283400,
        "secretaria": "Bogotá D.C.",
        "placaVehiculo": "TEP896",
        "tipoVehiculo": "CAMIONETA",
        "servicioVehiculo": "Publico"
    },
    {
        "numero": "25214001000004184149",
        "identificacion": {
            "numero": "8909039388",
            "tipo": 4
        },
        "fecha": 1355547600000,
        "direccion": "0-NOSELECCIONADO COTA SIBERIA 0-NOSELECC",
        "estado": "Pendiente",
        "fotodeteccion": false,
        "codigo": "C29",
        "total": 283350,
        "secretaria": "Cota",
        "placaVehiculo": "RBU907",
        "tipoVehiculo": "BUSETA",
        "servicioVehiculo": "Particular"
    },
    {
        "numero": "25183001000004693800",
        "identificacion": {
            "numero": "8909039388",
            "tipo": 4
        },
        "fecha": 1359522000000,
        "direccion": "0-NOSELECCIONADO TUNJA BTA 0-NOSELECCION",
        "estado": "Pendiente",
        "fotodeteccion": false,
        "codigo": "C29",
        "total": 294750,
        "secretaria": "Choconta",
        "placaVehiculo": "RBX116",
        "tipoVehiculo": "BUS",
        "servicioVehiculo": "Particular"
    },
    {
        "numero": "25899001000004398086",
        "identificacion": {
            "numero": "8909039388",
            "tipo": 4
        },
        "fecha": 1362027600000,
        "direccion": "0-NOSELECCIONADO ZIPA BOGOTA 0-NOSELECCI",
        "estado": "Pendiente",
        "fotodeteccion": false,
        "codigo": "C29",
        "total": 294750,
        "secretaria": "CAJICA - DEPT CUNDINAMARCA",
        "placaVehiculo": "RNL182",
        "tipoVehiculo": "BUSETA",
        "servicioVehiculo": "Particular"
    },
    {
        "numero": "63130000000005189815",
        "identificacion": {
            "numero": "8909039388",
            "tipo": 4
        },
        "fecha": 1357448400000,
        "direccion": "KM 79 +400 VIA LA ESPA¿OLA - SECTOR COMBIA CALARCA QUINDIO",
        "estado": "Pendiente",
        "fotodeteccion": false,
        "codigo": "C29",
        "total": 294741,
        "secretaria": "Calarca",
        "placaVehiculo": "RAS794",
        "tipoVehiculo": "AUTOMOVIL",
        "servicioVehiculo": "Oficial"
    },
    {
        "numero": "25473001000004586943",
        "identificacion": {
            "numero": "8909039388",
            "tipo": 4
        },
        "fecha": 1366434000000,
        "direccion": "0-NOSELECCIONADO MOSQUERA LA MESA 0-NOSE",
        "estado": "Pendiente",
        "fotodeteccion": false,
        "codigo": "D06",
        "total": 589500,
        "secretaria": "Mosquera",
        "placaVehiculo": "RHN841",
        "tipoVehiculo": "BUSETA",
        "servicioVehiculo": "Particular"
    },
    {
        "numero": "11001000000004973871",
        "identificacion": {
            "numero": "8909039388",
            "tipo": 4
        },
        "fecha": 1372050000000,
        "direccion": "CL 114A - CR 47A - SUBA",
        "estado": "Pendiente",
        "fotodeteccion": false,
        "codigo": "C02",
        "total": 294800,
        "secretaria": "Bogotá D.C.",
        "placaVehiculo": "RBX116",
        "tipoVehiculo": "DESCONOCIDA",
        "servicioVehiculo": "Oficial"
    },
    {
        "numero": "25754001000004237945",
        "identificacion": {
            "numero": "8909039388",
            "tipo": 4
        },
        "fecha": 1368507600000,
        "direccion": "0-NOSELECCIONADO MONDO¿EDO SOACHA 0-NOSE",
        "estado": "Pendiente",
        "fotodeteccion": false,
        "codigo": "D06",
        "total": 589500,
        "secretaria": "SIBATÉ - DEPT CUNDINAMARCA",
        "placaVehiculo": "RMM222",
        "tipoVehiculo": "AUTOMOVIL",
        "servicioVehiculo": "Particular"
    },
    {
        "numero": "76248000000004390871",
        "identificacion": {
            "numero": "8909039388",
            "tipo": 4
        },
        "fecha": 1367470800000,
        "direccion": "CALI ANDALUCIA CODIGO 2505 ABSCISA 39 MAS 700 CALZADA DERECHA",
        "estado": "Pendiente",
        "fotodeteccion": false,
        "codigo": "C29",
        "total": 294750,
        "secretaria": "El Cerrito",
        "placaVehiculo": "MSY394",
        "tipoVehiculo": "AUTOMOVIL",
        "servicioVehiculo": "Oficial"
    },
    {
        "numero": "63130000000005843181",
        "identificacion": {
            "numero": "8909039388",
            "tipo": 4
        },
        "fecha": 1363928400000,
        "direccion": "KM 79 +400 VIA LA ESPA¿OLA - SECTOR COMBIA CALARCA QUINDIO",
        "estado": "Pendiente",
        "fotodeteccion": false,
        "codigo": "C29",
        "total": 294741,
        "secretaria": "Calarca",
        "placaVehiculo": "SMB947",
        "tipoVehiculo": "CAMION",
        "servicioVehiculo": "Publico"
    },
    {
        "numero": "63130000000005838143",
        "identificacion": {
            "numero": "8909039388",
            "tipo": 4
        },
        "fecha": 1361768400000,
        "direccion": "KM 79 +400 VIA LA ESPAÑOLA - SECTOR COMBIA CALARCA QUINDIO",
        "estado": "Pendiente",
        "fotodeteccion": false,
        "codigo": "C29",
        "total": 294741,
        "secretaria": "Calarca",
        "placaVehiculo": "MHO520",
        "tipoVehiculo": "AUTOMOVIL",
        "servicioVehiculo": "Oficial"
    },
    {
        "numero": "63130000000005839481",
        "identificacion": {
            "numero": "8909039388",
            "tipo": 4
        },
        "fecha": 1363064400000,
        "direccion": "KM 79 +400 VIA LA ESPAÑOLA - SECTOR COMBIA CALARCA QUINDIO",
        "estado": "Pendiente",
        "fotodeteccion": false,
        "codigo": "C29",
        "total": 294741,
        "secretaria": "Calarca",
        "placaVehiculo": "SOZ349",
        "tipoVehiculo": "CAMION",
        "servicioVehiculo": "Publico"
    },
    {
        "numero": "63130000000005834674",
        "identificacion": {
            "numero": "8909039388",
            "tipo": 4
        },
        "fecha": 1360386000000,
        "direccion": "KM 79 +400 VIA LA ESPA¿OLA - SECTOR COMBIA CALARCA QUINDIO",
        "estado": "Pendiente",
        "fotodeteccion": false,
        "codigo": "C29",
        "total": 294741,
        "secretaria": "Calarca",
        "placaVehiculo": "SRP662",
        "tipoVehiculo": "TRACTO/CAMION",
        "servicioVehiculo": "Publico"
    },
    {
        "numero": "63130000000005835397",
        "identificacion": {
            "numero": "8909039388",
            "tipo": 4
        },
        "fecha": 1360645200000,
        "direccion": "KM 79 +400 VIA LA ESPA¿OLA - SECTOR COMBIA CALARCA QUINDIO",
        "estado": "Pendiente",
        "fotodeteccion": false,
        "codigo": "C29",
        "total": 294741,
        "secretaria": "Calarca",
        "placaVehiculo": "MJR068",
        "tipoVehiculo": "AUTOMOVIL",
        "servicioVehiculo": "Oficial"
    },
    {
        "numero": "63130000000005835553",
        "identificacion": {
            "numero": "8909039388",
            "tipo": 4
        },
        "fecha": 1360731600000,
        "direccion": "KM 79 +400 VIA LA ESPA¿OLA - SECTOR COMBIA CALARCA QUINDIO",
        "estado": "Pendiente",
        "fotodeteccion": false,
        "codigo": "C29",
        "total": 294741,
        "secretaria": "Calarca",
        "placaVehiculo": "SOZ349",
        "tipoVehiculo": "CAMION",
        "servicioVehiculo": "Publico"
    },
    {
        "numero": "63130000000005838802",
        "identificacion": {
            "numero": "8909039388",
            "tipo": 4
        },
        "fecha": 1362114000000,
        "direccion": "KM 79 +400 VIA LA ESPA¿OLA - SECTOR COMBIA CALARCA QUINDIO",
        "estado": "Pendiente",
        "fotodeteccion": false,
        "codigo": "C29",
        "total": 294741,
        "secretaria": "Calarca",
        "placaVehiculo": "SRP663",
        "tipoVehiculo": "TRACTO/CAMION",
        "servicioVehiculo": "Publico"
    },
    {
        "numero": "11001000000005891371",
        "identificacion": {
            "numero": "8909039388",
            "tipo": 4
        },
        "fecha": 1377234000000,
        "direccion": "CR 102 - CL 26 - FONTIBON",
        "estado": "Pendiente",
        "fotodeteccion": false,
        "codigo": "C02",
        "total": 294800,
        "secretaria": "Bogotá D.C.",
        "placaVehiculo": "DAB444",
        "tipoVehiculo": "AUTOMOVIL",
        "servicioVehiculo": "Oficial"
    },
    {
        "numero": "25473001000006215804",
        "identificacion": {
            "numero": "8909039388",
            "tipo": 4
        },
        "fecha": 1381208400000,
        "direccion": "0-NOSELECCIONADO BTA FACA 0-NOSELECCIONA",
        "estado": "Pendiente",
        "fotodeteccion": false,
        "codigo": "C29",
        "total": 294750,
        "secretaria": "Mosquera",
        "placaVehiculo": "TDK176",
        "tipoVehiculo": "BUSETA",
        "servicioVehiculo": "Publico"
    },
    {
        "numero": "25183001000006113388",
        "identificacion": {
            "numero": "8909039388",
            "tipo": 4
        },
        "fecha": 1378962000000,
        "direccion": "0-NOSELECCIONADO TUNJA BOGOTA 0-NOSELECC",
        "estado": "Pendiente",
        "fotodeteccion": false,
        "codigo": "C29",
        "total": 294750,
        "secretaria": "Choconta",
        "placaVehiculo": "RMP476",
        "tipoVehiculo": "BUSETA",
        "servicioVehiculo": "Particular"
    },
    {
        "numero": "63130000000006226916",
        "identificacion": {
            "numero": "8909039388",
            "tipo": 4
        },
        "fecha": 1376802000000,
        "direccion": "KM 79 +400 VIA LA ESPA¿OLA - SECTOR COMBIA CALARCA QUINDIO",
        "estado": "Pendiente",
        "fotodeteccion": false,
        "codigo": "C29",
        "total": 294741,
        "secretaria": "Calarca",
        "placaVehiculo": "RGY677",
        "tipoVehiculo": "CAMIONETA",
        "servicioVehiculo": "Oficial"
    },
    {
        "numero": "25214001000004187450",
        "identificacion": {
            "numero": "8909039388",
            "tipo": 4
        },
        "fecha": 1372914000000,
        "direccion": "8-TRAMO CHIA COTA 0-NOSELECCIONADO KM 22",
        "estado": "Pendiente",
        "fotodeteccion": false,
        "codigo": "D06",
        "total": 589500,
        "secretaria": "Cota",
        "placaVehiculo": "RHO776",
        "tipoVehiculo": "BUS",
        "servicioVehiculo": "Particular"
    },
    {
        "numero": "25473001000006216084",
        "identificacion": {
            "numero": "8909039388",
            "tipo": 4
        },
        "fecha": 1381208400000,
        "direccion": "0-NOSELECCIONADO GIRAROT MOSQUERRA 0-NOS",
        "estado": "Pendiente",
        "fotodeteccion": false,
        "codigo": "D06",
        "total": 589500,
        "secretaria": "Mosquera",
        "placaVehiculo": "RDS690",
        "tipoVehiculo": "BUSETA",
        "servicioVehiculo": "Particular"
    },
    {
        "numero": "25473001000006217833",
        "identificacion": {
            "numero": "8909039388",
            "tipo": 4
        },
        "fecha": 1379566800000,
        "direccion": "5-CIRCUNVALAR FACA BOGOTA 0-NOSELECCIONA",
        "estado": "Pendiente",
        "fotodeteccion": false,
        "codigo": "C29",
        "total": 294750,
        "secretaria": "Mosquera",
        "placaVehiculo": "TDK176",
        "tipoVehiculo": "BUSETA",
        "servicioVehiculo": "Publico"
    },
    {
        "numero": "25612001000005211780",
        "identificacion": {
            "numero": "8909039388",
            "tipo": 4
        },
        "fecha": 1380171600000,
        "direccion": "0-NOSELECCIONADO BTA GIRARDOT 0-NOSELECC",
        "estado": "Pendiente",
        "fotodeteccion": false,
        "codigo": "D06",
        "total": 589500,
        "secretaria": "Ricaurte",
        "placaVehiculo": "MBX799",
        "tipoVehiculo": "BUS",
        "servicioVehiculo": "Particular"
    },
    {
        "numero": "25260001000002768066",
        "identificacion": {
            "numero": "8909039388",
            "tipo": 4
        },
        "fecha": 1351486800000,
        "direccion": "0-NOSELECCIONADO SIBERIA EL ROSAL 0-NOSE",
        "estado": "Pendiente",
        "fotodeteccion": false,
        "codigo": "C29",
        "total": 283350,
        "secretaria": "El Rosal",
        "placaVehiculo": "RLY889",
        "tipoVehiculo": "BUSETA",
        "servicioVehiculo": "Particular"
    },
    {
        "numero": "25260001000006962221",
        "identificacion": {
            "numero": "8909039388",
            "tipo": 4
        },
        "fecha": 1392008400000,
        "direccion": "0-NOSELECCIONADO PNT PIEDRA SUBA 0-NOSEL",
        "estado": "Pendiente",
        "fotodeteccion": false,
        "codigo": "C29",
        "total": 307995,
        "secretaria": "El Rosal",
        "placaVehiculo": "RDS690",
        "tipoVehiculo": "BUSETA",
        "servicioVehiculo": "Particular"
    },
    {
        "numero": "25214001000007637340",
        "identificacion": {
            "numero": "8909039388",
            "tipo": 4
        },
        "fecha": 1398056400000,
        "direccion": "0-NOSELECCIONADO MOSQUERA 0-NOSELECCIONA",
        "estado": "Pendiente",
        "fotodeteccion": false,
        "codigo": "C29",
        "total": 307995,
        "secretaria": "Cota",
        "placaVehiculo": "RMM308",
        "tipoVehiculo": "BUSETA",
        "servicioVehiculo": "Particular"
    },
    {
        "numero": "25377001000007056999",
        "identificacion": {
            "numero": "8909039388",
            "tipo": 4
        },
        "fecha": 1393995600000,
        "direccion": "5-CIRCUNVALAR GUASCA SOPO 0-NOSELECCIONA",
        "estado": "Pendiente",
        "fotodeteccion": false,
        "codigo": "D06",
        "total": 615990,
        "secretaria": "La Calera",
        "placaVehiculo": "RCP592",
        "tipoVehiculo": "AUTOMOVIL",
        "servicioVehiculo": "Particular"
    },
    {
        "numero": "25612001000007572852",
        "identificacion": {
            "numero": "8909039388",
            "tipo": 4
        },
        "fecha": 1393563600000,
        "direccion": "5-CIRCUNVALAR GIRARDOT BOGOTA 0-NOSELECC",
        "estado": "Pendiente",
        "fotodeteccion": false,
        "codigo": "C29",
        "total": 307995,
        "secretaria": "Ricaurte",
        "placaVehiculo": "RJT301",
        "tipoVehiculo": "BUSETA",
        "servicioVehiculo": "Particular"
    },
    {
        "numero": "25473001000007555155",
        "identificacion": {
            "numero": "8909039388",
            "tipo": 4
        },
        "fecha": 1399611600000,
        "direccion": "8-TRAMO GIRARDOT MOSQUERA 5-KILOMETRO 11",
        "estado": "Pendiente",
        "fotodeteccion": false,
        "codigo": "C29",
        "total": 307995,
        "secretaria": "Mosquera",
        "placaVehiculo": "RLZ030",
        "tipoVehiculo": "BUSETA",
        "servicioVehiculo": "Particular"
    },
    {
        "numero": "25183001000008322066",
        "identificacion": {
            "numero": "8909039388",
            "tipo": 4
        },
        "fecha": 1402376400000,
        "direccion": "1-CARRERA 8 2-CALLE 10 88 CHOCONTA",
        "estado": "Pendiente",
        "fotodeteccion": false,
        "codigo": "C29",
        "total": 307995,
        "secretaria": "Choconta",
        "placaVehiculo": "RKZ817",
        "tipoVehiculo": "BUSETA",
        "servicioVehiculo": "Particular"
    },
    {
        "numero": "11001000000007960674",
        "identificacion": {
            "numero": "8909039388",
            "tipo": 4
        },
        "fecha": 1403672400000,
        "direccion": "CL 13_CON - CR 62 - PUENTE ARANDA",
        "estado": "Pendiente",
        "fotodeteccion": false,
        "codigo": "C02",
        "total": 308000,
        "secretaria": "Bogotá D.C.",
        "placaVehiculo": "RDM393",
        "tipoVehiculo": "DESCONOCIDA",
        "servicioVehiculo": "Oficial"
    },
    {
        "numero": "25183001000008322392",
        "identificacion": {
            "numero": "8909039388",
            "tipo": 4
        },
        "fecha": 1403154000000,
        "direccion": "1-CARRERA 8 2-CALLE 10 88 CHOCONTA",
        "estado": "Pendiente",
        "fotodeteccion": false,
        "codigo": "C29",
        "total": 307995,
        "secretaria": "Choconta",
        "placaVehiculo": "RML512",
        "tipoVehiculo": "BUS",
        "servicioVehiculo": "Particular"
    },
    {
        "numero": "25214001000007637921",
        "identificacion": {
            "numero": "8909039388",
            "tipo": 4
        },
        "fecha": 1398229200000,
        "direccion": "8-TRAMO BOGOTA HONDA 0-NOSELECCIONADO KM",
        "estado": "Pendiente",
        "fotodeteccion": false,
        "codigo": "C29",
        "total": 307995,
        "secretaria": "Cota",
        "placaVehiculo": "RER083",
        "tipoVehiculo": "BUSETA",
        "servicioVehiculo": "Particular"
    },
    {
        "numero": "25754001000008335896",
        "identificacion": {
            "numero": "8909039388",
            "tipo": 4
        },
        "fecha": 1407560400000,
        "direccion": "1-CARRERA 5 2-CALLE 22 SUR SOACHA",
        "estado": "Pendiente",
        "fotodeteccion": false,
        "codigo": "C29",
        "total": 307995,
        "secretaria": "SIBATÉ - DEPT CUNDINAMARCA",
        "placaVehiculo": "RGY677",
        "tipoVehiculo": "BUS",
        "servicioVehiculo": "Particular"
    },
    {
        "numero": "25377001000007057483",
        "identificacion": {
            "numero": "8909039388",
            "tipo": 4
        },
        "fecha": 1394773200000,
        "direccion": "5-CIRCUNVALAR GUASCA SOPO 0-NOSELECCIONA",
        "estado": "Pendiente",
        "fotodeteccion": false,
        "codigo": "C29",
        "total": 307995,
        "secretaria": "La Calera",
        "placaVehiculo": "TEP638",
        "tipoVehiculo": "BUSETA",
        "servicioVehiculo": "Publico"
    },
    {
        "numero": "11001000000008008022",
        "identificacion": {
            "numero": "8909039388",
            "tipo": 4
        },
        "fecha": 1411189200000,
        "direccion": "TR 59B - CL 128A-21 - SUBA",
        "estado": "Pendiente",
        "fotodeteccion": false,
        "codigo": "C02",
        "total": 308000,
        "secretaria": "Bogotá D.C.",
        "placaVehiculo": "RJQ604",
        "tipoVehiculo": "AUTOMOVIL",
        "servicioVehiculo": "Particular"
    },
    {
        "numero": "25875001000008470962",
        "identificacion": {
            "numero": "8909039388",
            "tipo": 4
        },
        "fecha": 1407819600000,
        "direccion": "1-CARRERA 4 2-CALLE 29 05 LA VEGA",
        "estado": "Pendiente",
        "fotodeteccion": false,
        "codigo": "C29",
        "total": 307995,
        "secretaria": "Villeta",
        "placaVehiculo": "RKP167",
        "tipoVehiculo": "AUTOMOVIL",
        "servicioVehiculo": "Particular"
    },
    {
        "numero": "25214001000008467916",
        "identificacion": {
            "numero": "8909039388",
            "tipo": 4
        },
        "fecha": 1409374800000,
        "direccion": "8-TRAMO SIBERIA TENJO 5-KILOMETRO 2",
        "estado": "Pendiente",
        "fotodeteccion": false,
        "codigo": "C29",
        "total": 307995,
        "secretaria": "Cota",
        "placaVehiculo": "RNL216",
        "tipoVehiculo": "AUTOMOVIL",
        "servicioVehiculo": "Particular"
    },
    {
        "numero": "25214001000008467038",
        "identificacion": {
            "numero": "8909039388",
            "tipo": 4
        },
        "fecha": 1407301200000,
        "direccion": "8-TRAMO MOSQUERA COTA 5-KILOMETRO 14",
        "estado": "Pendiente",
        "fotodeteccion": false,
        "codigo": "C29",
        "total": 307995,
        "secretaria": "Cota",
        "placaVehiculo": "RMY738",
        "tipoVehiculo": "BUS",
        "servicioVehiculo": "Particular"
    },
    {
        "numero": "25754001000008332225",
        "identificacion": {
            "numero": "8909039388",
            "tipo": 4
        },
        "fecha": 1403845200000,
        "direccion": "8-TRAMO SOACHA SIBATE 5-KILOMETRO 04",
        "estado": "Pendiente",
        "fotodeteccion": false,
        "codigo": "C29",
        "total": 307995,
        "secretaria": "SIBATÉ - DEPT CUNDINAMARCA",
        "placaVehiculo": "RNS810",
        "tipoVehiculo": "BUSETA",
        "servicioVehiculo": "Particular"
    },
    {
        "numero": "11001000000008025647",
        "identificacion": {
            "numero": "8909039388",
            "tipo": 4
        },
        "fecha": 1414818000000,
        "direccion": "CL 63 - CR 50 - BARRIOS UNIDOS",
        "estado": "Pendiente",
        "fotodeteccion": false,
        "codigo": "C02",
        "total": 308000,
        "secretaria": "Bogotá D.C.",
        "placaVehiculo": "RIK859",
        "tipoVehiculo": "AUTOMOVIL",
        "servicioVehiculo": "Particular"
    },
    {
        "numero": "11001000000008013326",
        "identificacion": {
            "numero": "8909039388",
            "tipo": 4
        },
        "fecha": 1411966800000,
        "direccion": "CL 24 - TR 28 - MARTIRES",
        "estado": "Pendiente",
        "fotodeteccion": false,
        "codigo": "C02",
        "total": 308000,
        "secretaria": "Bogotá D.C.",
        "placaVehiculo": "MBV746",
        "tipoVehiculo": "CAMPERO",
        "servicioVehiculo": "Particular"
    },
    {
        "numero": "25214001000008465700",
        "identificacion": {
            "numero": "8909039388",
            "tipo": 4
        },
        "fecha": 1416459600000,
        "direccion": "8-TRAMO MOSQUERA COTA 5-KILOMETRO 14",
        "estado": "Pendiente",
        "fotodeteccion": false,
        "codigo": "C29",
        "total": 307995,
        "secretaria": "Cota",
        "placaVehiculo": "RLV950",
        "tipoVehiculo": "BUSETA",
        "servicioVehiculo": "Particular"
    },
    {
        "numero": "25473001000007552781",
        "identificacion": {
            "numero": "8909039388",
            "tipo": 4
        },
        "fecha": 1394686800000,
        "direccion": "5-CIRCUNVALAR GIRARDOT MOSQUERA 0-NOSELE",
        "estado": "Pendiente",
        "fotodeteccion": false,
        "codigo": "C29",
        "total": 307995,
        "secretaria": "Mosquera",
        "placaVehiculo": "TEP519",
        "tipoVehiculo": "BUSETA",
        "servicioVehiculo": "Publico"
    },
    {
        "numero": "11001000000008237805",
        "identificacion": {
            "numero": "8909039388",
            "tipo": 4
        },
        "fecha": 1418014800000,
        "direccion": "CL 13 - CR 21 23 - MARTIRES",
        "estado": "Pendiente",
        "fotodeteccion": false,
        "codigo": "C02",
        "total": 308000,
        "secretaria": "Bogotá D.C.",
        "placaVehiculo": "RDL171",
        "tipoVehiculo": "AUTOMOVIL",
        "servicioVehiculo": "Particular"
    },
    {
        "numero": "25214001000009489918",
        "identificacion": {
            "numero": "8909039388",
            "tipo": 4
        },
        "fecha": 1418101200000,
        "direccion": "8-TRAMO COTA MOSQUERA 5-KILOMETRO 14",
        "estado": "Pendiente",
        "fotodeteccion": false,
        "codigo": "C29",
        "total": 307995,
        "secretaria": "Cota",
        "placaVehiculo": "CDW978",
        "tipoVehiculo": "AUTOMOVIL",
        "servicioVehiculo": "Particular"
    },
    {
        "numero": "25214001000009489934",
        "identificacion": {
            "numero": "8909039388",
            "tipo": 4
        },
        "fecha": 1418101200000,
        "direccion": "8-TRAMO COTA MOSQUERA 5-KILOMETRO 14",
        "estado": "Pendiente",
        "fotodeteccion": false,
        "codigo": "C29",
        "total": 307995,
        "secretaria": "Cota",
        "placaVehiculo": "CDW978",
        "tipoVehiculo": "AUTOMOVIL",
        "servicioVehiculo": "Particular"
    },
    {
        "numero": "11001000000008253694",
        "identificacion": {
            "numero": "8909039388",
            "tipo": 4
        },
        "fecha": 1421816400000,
        "direccion": "AV 1-DE-MAYO - CR 30 - ANTONIO NARI¿O",
        "estado": "Pendiente",
        "fotodeteccion": false,
        "codigo": "C03",
        "total": 322200,
        "secretaria": "Bogotá D.C.",
        "placaVehiculo": "RKV744",
        "tipoVehiculo": "CAMPERO",
        "servicioVehiculo": "Particular"
    },
    {
        "numero": "76001000000008769192",
        "identificacion": {
            "numero": "8909039388",
            "tipo": 4
        },
        "fecha": 1419397200000,
        "direccion": "CALLE 15   CON DIAGONAL 23",
        "estado": "Pendiente",
        "fotodeteccion": false,
        "codigo": "C14",
        "total": 332595,
        "secretaria": "Cali",
        "placaVehiculo": "MJP592",
        "tipoVehiculo": "CAMIONETA",
        "servicioVehiculo": "Particular"
    },
    {
        "numero": "76001000000008759594",
        "identificacion": {
            "numero": "8909039388",
            "tipo": 4
        },
        "fecha": 1418792400000,
        "direccion": "CALLE 23 D NORTE CON AVENIDA 5 A NORTE",
        "estado": "Pendiente",
        "fotodeteccion": false,
        "codigo": "C02",
        "total": 332595,
        "secretaria": "Cali",
        "placaVehiculo": "HYL567",
        "tipoVehiculo": "CAMPERO",
        "servicioVehiculo": "Particular"
    },
    {
        "numero": "25754001000008936870",
        "identificacion": {
            "numero": "8909039388",
            "tipo": 4
        },
        "fecha": 1417755600000,
        "direccion": "8-TRAMO GIRARDOT BOGOTA 5-KILOMETRO 114",
        "estado": "Pendiente",
        "fotodeteccion": false,
        "codigo": "C29",
        "total": 307995,
        "secretaria": "SIBATÉ - DEPT CUNDINAMARCA",
        "placaVehiculo": "RNS810",
        "tipoVehiculo": "BUSETA",
        "servicioVehiculo": "Particular"
    },
    {
        "numero": "25473001000009496654",
        "identificacion": {
            "numero": "8909039388",
            "tipo": 4
        },
        "fecha": 1423026000000,
        "direccion": "8-TRAMO MOSQUERA BOGOTA 5-KILOMETRO 4.6",
        "estado": "Pendiente",
        "fotodeteccion": false,
        "codigo": "C29",
        "total": 322170,
        "secretaria": "Mosquera",
        "placaVehiculo": "SMY611",
        "tipoVehiculo": "BUSETA",
        "servicioVehiculo": "Publico"
    },
    {
        "numero": "25377001000008828770",
        "identificacion": {
            "numero": "8909039388",
            "tipo": 4
        },
        "fecha": 1421298000000,
        "direccion": "8-TRAMO BOGOTA SOPO 5-KILOMETRO 11",
        "estado": "Pendiente",
        "fotodeteccion": false,
        "codigo": "C29",
        "total": 322170,
        "secretaria": "La Calera",
        "placaVehiculo": "RBU774",
        "tipoVehiculo": "AUTOMOVIL",
        "servicioVehiculo": "Particular"
    },
    {
        "numero": "25260001000008921587",
        "identificacion": {
            "numero": "8909039388",
            "tipo": 4
        },
        "fecha": 1415422800000,
        "direccion": "8-TRAMO LA VEGA BOGOTA 5-KILOMETRO 22.3",
        "estado": "Pendiente",
        "fotodeteccion": false,
        "codigo": "C29",
        "total": 307995,
        "secretaria": "El Rosal",
        "placaVehiculo": "RLO921",
        "tipoVehiculo": "AUTOMOVIL",
        "servicioVehiculo": "Particular"
    },
    {
        "numero": "25214001000007633003",
        "identificacion": {
            "numero": "8909039388",
            "tipo": 4
        },
        "fecha": 1399438800000,
        "direccion": "8-TRAMO MOSQUERA COTA 5-KILOMETRO 14",
        "estado": "Pendiente",
        "fotodeteccion": false,
        "codigo": "C29",
        "total": 307995,
        "secretaria": "Cota",
        "placaVehiculo": "RHQ900",
        "tipoVehiculo": "AUTOMOVIL",
        "servicioVehiculo": "Oficial"
    },
    {
        "numero": "11001000000008287978",
        "identificacion": {
            "numero": "8909039388",
            "tipo": 4
        },
        "fecha": 1429160400000,
        "direccion": "CL 12B - CR 9 10 - SANTA FE",
        "estado": "Pendiente",
        "fotodeteccion": false,
        "codigo": "C03",
        "total": 322200,
        "secretaria": "Bogotá D.C.",
        "placaVehiculo": "RGN575",
        "tipoVehiculo": "DESCONOCIDA",
        "servicioVehiculo": "Particular"
    },
    {
        "numero": "11001000000008289707",
        "identificacion": {
            "numero": "8909039388",
            "tipo": 4
        },
        "fecha": 1429160400000,
        "direccion": "CR 13 - CL 82 - CHAPINERO",
        "estado": "Pendiente",
        "fotodeteccion": false,
        "codigo": "C02",
        "total": 322200,
        "secretaria": "Bogotá D.C.",
        "placaVehiculo": "RMN845",
        "tipoVehiculo": "AUTOMOVIL",
        "servicioVehiculo": "Particular"
    },
    {
        "numero": "25214001000009994091",
        "identificacion": {
            "numero": "8909039388",
            "tipo": 4
        },
        "fecha": 1429678800000,
        "direccion": "8-TRAMO MOSQUERA COTA 5-KILOMETRO 14",
        "estado": "Pendiente",
        "fotodeteccion": false,
        "codigo": "C29",
        "total": 322170,
        "secretaria": "Cota",
        "placaVehiculo": "RGP314",
        "tipoVehiculo": "BUSETA",
        "servicioVehiculo": "Particular"
    },
    {
        "numero": "11001000000008293492",
        "identificacion": {
            "numero": "8909039388",
            "tipo": 4
        },
        "fecha": 1430283600000,
        "direccion": "CR 38 - CL 7 19 - PUENTE ARANDA",
        "estado": "Pendiente",
        "fotodeteccion": false,
        "codigo": "C03",
        "total": 322200,
        "secretaria": "Bogotá D.C.",
        "placaVehiculo": "RBW482",
        "tipoVehiculo": "AUTOMOVIL",
        "servicioVehiculo": "Particular"
    },
    {
        "numero": "25183001000009908661",
        "identificacion": {
            "numero": "8909039388",
            "tipo": 4
        },
        "fecha": 1428296400000,
        "direccion": "1-CARRERA 8 2-CALLE 8 19 CHOCONTA",
        "estado": "Pendiente",
        "fotodeteccion": false,
        "codigo": "C29",
        "total": 322170,
        "secretaria": "Choconta",
        "placaVehiculo": "RIN845",
        "tipoVehiculo": "AUTOMOVIL",
        "servicioVehiculo": "Particular"
    },
    {
        "numero": "11001000000010295623",
        "identificacion": {
            "numero": "8909039388",
            "tipo": 4
        },
        "fecha": 1435813200000,
        "direccion": "CL 114 - CR 47A - SUBA",
        "estado": "Pendiente",
        "fotodeteccion": false,
        "codigo": "C02",
        "total": 322200,
        "secretaria": "Bogotá D.C.",
        "placaVehiculo": "RLY889",
        "tipoVehiculo": "CAMIONETA",
        "servicioVehiculo": "Particular"
    },
    {
        "numero": "11001000000010293386",
        "identificacion": {
            "numero": "8909039388",
            "tipo": 4
        },
        "fecha": 1435640400000,
        "direccion": "CR 7 - CL 113 - USAQUEN",
        "estado": "Pendiente",
        "fotodeteccion": false,
        "codigo": "C02",
        "total": 322200,
        "secretaria": "Bogotá D.C.",
        "placaVehiculo": "RHQ900",
        "tipoVehiculo": "AUTOMOVIL",
        "servicioVehiculo": "Particular"
    },
    {
        "numero": "76520000000010593697",
        "identificacion": {
            "numero": "8909039388",
            "tipo": 4
        },
        "fecha": 1433394000000,
        "direccion": "CALLE 42 CON CARRERA 45",
        "estado": "Pendiente",
        "fotodeteccion": false,
        "codigo": "C29",
        "total": 328570,
        "secretaria": "Palmira",
        "placaVehiculo": "HYM736",
        "tipoVehiculo": "AUTOMOVIL",
        "servicioVehiculo": "Particular"
    },
    {
        "numero": "25377001000008829224",
        "identificacion": {
            "numero": "8909039388",
            "tipo": 4
        },
        "fecha": 1424408400000,
        "direccion": "4-TRANSVERSAL 6 6-# 4 06 SUR SOPO",
        "estado": "Pendiente",
        "fotodeteccion": false,
        "codigo": "D06",
        "total": 644350,
        "secretaria": "La Calera",
        "placaVehiculo": "RHK698",
        "tipoVehiculo": "AUTOMOVIL",
        "servicioVehiculo": "Particular"
    },
    {
        "numero": "11001000000010341017",
        "identificacion": {
            "numero": "8909039388",
            "tipo": 4
        },
        "fecha": 1444885200000,
        "direccion": "CL 52 - CR 15 - TEUSAQUILLO",
        "estado": "Pendiente",
        "fotodeteccion": false,
        "codigo": "C02",
        "total": 322200,
        "secretaria": "Bogotá D.C.",
        "placaVehiculo": "RNQ255",
        "tipoVehiculo": "CAMPERO",
        "servicioVehiculo": "Particular"
    },
    {
        "numero": "76147000000009913088",
        "identificacion": {
            "numero": "8909039388",
            "tipo": 4
        },
        "fecha": 1451538000000,
        "direccion": "VIA ZARAGOZA  PARQUEADERO EL CAMELLO CA",
        "estado": "Pendiente",
        "fotodeteccion": false,
        "codigo": "C29",
        "total": 322175,
        "secretaria": "Cartago",
        "placaVehiculo": "HWS821",
        "tipoVehiculo": "AUTOMOVIL",
        "servicioVehiculo": "Particular"
    },
    {
        "numero": "11001000000010380304",
        "identificacion": {
            "numero": "8909039388",
            "tipo": 4
        },
        "fecha": 1453870800000,
        "direccion": "CL 17 - CR 17 26 - ANTONIO NARI¿O",
        "estado": "Pendiente",
        "fotodeteccion": false,
        "codigo": "C03",
        "total": 344700,
        "secretaria": "Bogotá D.C.",
        "placaVehiculo": "RMQ524",
        "tipoVehiculo": "AUTOMOVIL",
        "servicioVehiculo": "Particular"
    },
    {
        "numero": "11001000000010407638",
        "identificacion": {
            "numero": "8909039388",
            "tipo": 4
        },
        "fecha": 1457067600000,
        "direccion": "CL 25B - CR 68B - FONTIBON",
        "estado": "Pendiente",
        "fotodeteccion": false,
        "codigo": "C02",
        "total": 344700,
        "secretaria": "Bogotá D.C.",
        "placaVehiculo": "TAU007",
        "tipoVehiculo": "CAMIONETA",
        "servicioVehiculo": "Publico"
    },
    {
        "numero": "11001000000010420049",
        "identificacion": {
            "numero": "8909039388",
            "tipo": 4
        },
        "fecha": 1459746000000,
        "direccion": "AV EL DORADO - CR 110 - FONTIBON",
        "estado": "Pendiente",
        "fotodeteccion": false,
        "codigo": "C02",
        "total": 344700,
        "secretaria": "Bogotá D.C.",
        "placaVehiculo": "MAW903",
        "tipoVehiculo": "CAMPERO",
        "servicioVehiculo": "Particular"
    },
    {
        "numero": "11001000000010395868",
        "identificacion": {
            "numero": "8909039388",
            "tipo": 4
        },
        "fecha": 1456117200000,
        "direccion": "CL 137 B - CR 57 B - SUBA",
        "estado": "Pendiente",
        "fotodeteccion": false,
        "codigo": "C02",
        "total": 344700,
        "secretaria": "Bogotá D.C.",
        "placaVehiculo": "RAS955",
        "tipoVehiculo": "DESCONOCIDA",
        "servicioVehiculo": "Particular"
    },
    {
        "numero": "11001000000010414519",
        "identificacion": {
            "numero": "8909039388",
            "tipo": 4
        },
        "fecha": 1458536400000,
        "direccion": "CL 93B - CR 11A-14 - CHAPINERO",
        "estado": "Pendiente",
        "fotodeteccion": false,
        "codigo": "C02",
        "total": 344700,
        "secretaria": "Bogotá D.C.",
        "placaVehiculo": "RMP476",
        "tipoVehiculo": "CAMIONETA",
        "servicioVehiculo": "Particular"
    },
    {
        "numero": "25214001000013993052",
        "identificacion": {
            "numero": "8909039388",
            "tipo": 4
        },
        "fecha": 1470027600000,
        "direccion": "8-TRAMO MOSQUERA COTA 5-KILOMETRO 14",
        "estado": "Pendiente",
        "fotodeteccion": false,
        "codigo": "C29",
        "total": 344730,
        "secretaria": "Cota",
        "placaVehiculo": "RLR878",
        "tipoVehiculo": "BUSETA",
        "servicioVehiculo": "Particular"
    },
    {
        "numero": "11001000000013022376",
        "identificacion": {
            "numero": "8909039388",
            "tipo": 4
        },
        "fecha": 1469768400000,
        "direccion": "CR 47 - CL 13-PUENTE-ARANDA - PUENTE ARANDA",
        "estado": "Pendiente",
        "fotodeteccion": false,
        "codigo": "C32",
        "total": 344700,
        "secretaria": "Bogotá D.C.",
        "placaVehiculo": "RJQ194",
        "tipoVehiculo": "DESCONOCIDA",
        "servicioVehiculo": "Particular"
    },
    {
        "numero": "11001000000013051003",
        "identificacion": {
            "numero": "8909039388",
            "tipo": 4
        },
        "fecha": 1473742800000,
        "direccion": "CR 7 - CL 94 - CHAPINERO",
        "estado": "Pendiente",
        "fotodeteccion": false,
        "codigo": "C14",
        "total": 344700,
        "secretaria": "Bogotá D.C.",
        "placaVehiculo": "RKV221",
        "tipoVehiculo": "CAMPERO",
        "servicioVehiculo": "Particular"
    },
    {
        "numero": "25214001000014319045",
        "identificacion": {
            "numero": "8909039388",
            "tipo": 4
        },
        "fecha": 1473310800000,
        "direccion": "8-TRAMO MOSQUERA COTA 5-KILOMETRO 14",
        "estado": "Pendiente",
        "fotodeteccion": false,
        "codigo": "C29",
        "total": 344730,
        "secretaria": "Cota",
        "placaVehiculo": "TAY939",
        "tipoVehiculo": "MICROBUS",
        "servicioVehiculo": "Publico"
    },
    {
        "numero": "11001000000013053673",
        "identificacion": {
            "numero": "8909039388",
            "tipo": 4
        },
        "fecha": 1474174800000,
        "direccion": "CR 9 - CL 100 - CHAPINERO",
        "estado": "Pendiente",
        "fotodeteccion": false,
        "codigo": "C31",
        "total": 344700,
        "secretaria": "Bogotá D.C.",
        "placaVehiculo": "TEP519",
        "tipoVehiculo": "CAMIONETA",
        "servicioVehiculo": "Publico"
    },
    {
        "numero": "76001000000016760429",
        "identificacion": {
            "numero": "8909039388",
            "tipo": 4
        },
        "fecha": 1498798800000,
        "direccion": "CALLE 9 CON CARRERA 38",
        "estado": "Pendiente",
        "fotodeteccion": false,
        "codigo": "C14",
        "total": 393465,
        "secretaria": "Cali",
        "placaVehiculo": "HDX855",
        "tipoVehiculo": "AUTOMOVIL",
        "servicioVehiculo": "Oficial"
    },
    {
        "numero": "68276000000015573534",
        "identificacion": {
            "numero": "8909039388",
            "tipo": 4
        },
        "fecha": 1489294800000,
        "direccion": "AUTOPISTA BUCARAMANGA FLORIDABLANCA PROXIMO A CAT SENTIDO NORTE",
        "estado": "Pendiente",
        "fotodeteccion": false,
        "codigo": "C29",
        "total": 368859,
        "secretaria": "Floridablanca",
        "placaVehiculo": "UDS632",
        "tipoVehiculo": "AUTOMOVIL",
        "servicioVehiculo": "Particular"
    },
    {
        "numero": "68276000000015568228",
        "identificacion": {
            "numero": "8909039388",
            "tipo": 4
        },
        "fecha": 1488085200000,
        "direccion": "CALLE 31A CON CARRERAS 26B Y 26 CA?AVERAL",
        "estado": "Pendiente",
        "fotodeteccion": false,
        "codigo": "C02",
        "total": 368859,
        "secretaria": "Floridablanca",
        "placaVehiculo": "IRR585",
        "tipoVehiculo": "CAMIONETA",
        "servicioVehiculo": "Particular"
    },
    {
        "numero": "68276000000015574596",
        "identificacion": {
            "numero": "8909039388",
            "tipo": 4
        },
        "fecha": 1489467600000,
        "direccion": "CALLE 30A CON CARRERAS 23 Y 24 CA?AVERAL",
        "estado": "Pendiente",
        "fotodeteccion": false,
        "codigo": "C02",
        "total": 368859,
        "secretaria": "Floridablanca",
        "placaVehiculo": "HWK697",
        "tipoVehiculo": "CAMPERO",
        "servicioVehiculo": "Particular"
    },
    {
        "numero": "68276000000016029389",
        "identificacion": {
            "numero": "8909039388",
            "tipo": 4
        },
        "fecha": 1491022800000,
        "direccion": "ANILLO VIAL FLORIDABLANCA GIRON FRENTE A EDS COTRASUR",
        "estado": "Pendiente",
        "fotodeteccion": false,
        "codigo": "C29",
        "total": 368859,
        "secretaria": "Floridablanca",
        "placaVehiculo": "IRO236",
        "tipoVehiculo": "CAMIONETA",
        "servicioVehiculo": "Particular"
    },
    {
        "numero": "68276000000016031201",
        "identificacion": {
            "numero": "8909039388",
            "tipo": 4
        },
        "fecha": 1491368400000,
        "direccion": "CALLE 32 CON CARRERAS 26 Y 26B CA?AVERAL",
        "estado": "Pendiente",
        "fotodeteccion": false,
        "codigo": "C02",
        "total": 368859,
        "secretaria": "Floridablanca",
        "placaVehiculo": "HWM485",
        "tipoVehiculo": "AUTOMOVIL",
        "servicioVehiculo": "Particular"
    },
    {
        "numero": "68276000000016039176",
        "identificacion": {
            "numero": "8909039388",
            "tipo": 4
        },
        "fecha": 1493355600000,
        "direccion": "CALLE 32 CON CARRERAS 26 Y 26B CA?AVERAL",
        "estado": "Pendiente",
        "fotodeteccion": false,
        "codigo": "C02",
        "total": 368859,
        "secretaria": "Floridablanca",
        "placaVehiculo": "HWN038",
        "tipoVehiculo": "CAMPERO",
        "servicioVehiculo": "Particular"
    },
    {
        "numero": "68276000000016035302",
        "identificacion": {
            "numero": "8909039388",
            "tipo": 4
        },
        "fecha": 1492578000000,
        "direccion": "CARRERA 8 CON CALLES 32 Y 31 LA PANAMERICANA",
        "estado": "Pendiente",
        "fotodeteccion": false,
        "codigo": "C02",
        "total": 368859,
        "secretaria": "Floridablanca",
        "placaVehiculo": "HHO310",
        "tipoVehiculo": "AUTOMOVIL",
        "servicioVehiculo": "Particular"
    },
    {
        "numero": "68276000000016034443",
        "identificacion": {
            "numero": "8909039388",
            "tipo": 4
        },
        "fecha": 1492318800000,
        "direccion": "DIAGONAL 31 CON CALLES 29 Y 31 LAGOS 1",
        "estado": "Pendiente",
        "fotodeteccion": false,
        "codigo": "C02",
        "total": 368859,
        "secretaria": "Floridablanca",
        "placaVehiculo": "HHQ061",
        "tipoVehiculo": "CAMIONETA",
        "servicioVehiculo": "Particular"
    },
    {
        "numero": "68276000000016034960",
        "identificacion": {
            "numero": "8909039388",
            "tipo": 4
        },
        "fecha": 1492578000000,
        "direccion": "ANILLO VIAL FLORIDABLANCA GIRON FRENTE A EDS COTRASUR",
        "estado": "Pendiente",
        "fotodeteccion": false,
        "codigo": "C29",
        "total": 368859,
        "secretaria": "Floridablanca",
        "placaVehiculo": "IRO236",
        "tipoVehiculo": "CAMIONETA",
        "servicioVehiculo": "Particular"
    },
    {
        "numero": "68276000000016029121",
        "identificacion": {
            "numero": "8909039388",
            "tipo": 4
        },
        "fecha": 1490936400000,
        "direccion": "ANILLO VIAL SENTIDO FLORIDA GIRON FRENTE A NATURA",
        "estado": "Pendiente",
        "fotodeteccion": false,
        "codigo": "C02",
        "total": 368859,
        "secretaria": "Floridablanca",
        "placaVehiculo": "UDR497",
        "tipoVehiculo": "AUTOMOVIL",
        "servicioVehiculo": "Particular"
    },
    {
        "numero": "68276000000016033765",
        "identificacion": {
            "numero": "8909039388",
            "tipo": 4
        },
        "fecha": 1492232400000,
        "direccion": "CARRERA 26A CON CALLES 31 Y 30 CA?AVERAL",
        "estado": "Pendiente",
        "fotodeteccion": false,
        "codigo": "C02",
        "total": 368859,
        "secretaria": "Floridablanca",
        "placaVehiculo": "UDT560",
        "tipoVehiculo": "CAMIONETA",
        "servicioVehiculo": "Particular"
    },
    {
        "numero": "68276000000016035140",
        "identificacion": {
            "numero": "8909039388",
            "tipo": 4
        },
        "fecha": 1492578000000,
        "direccion": "ANILLO VIAL SENTIDO FLORIDA GIRON FRENTE A NATURA",
        "estado": "Pendiente",
        "fotodeteccion": false,
        "codigo": "C02",
        "total": 368859,
        "secretaria": "Floridablanca",
        "placaVehiculo": "UDR497",
        "tipoVehiculo": "AUTOMOVIL",
        "servicioVehiculo": "Particular"
    },
    {
        "numero": "68276000000016035298",
        "identificacion": {
            "numero": "8909039388",
            "tipo": 4
        },
        "fecha": 1492578000000,
        "direccion": "CALLE 33 CON CARRERAS 26B Y 26 CA?AVERAL",
        "estado": "Pendiente",
        "fotodeteccion": false,
        "codigo": "C02",
        "total": 368859,
        "secretaria": "Floridablanca",
        "placaVehiculo": "WOK857",
        "tipoVehiculo": "CAMIONETA",
        "servicioVehiculo": "Publico"
    },
    {
        "numero": "25214001000016711086",
        "identificacion": {
            "numero": "8909039388",
            "tipo": 4
        },
        "fecha": 1495861200000,
        "direccion": "8-TRAMO BOGOTA HONDA 5-KILOMETRO 133 LA",
        "estado": "Pendiente",
        "fotodeteccion": false,
        "codigo": "C29",
        "total": 368865,
        "secretaria": "Cota",
        "placaVehiculo": "RMK049",
        "tipoVehiculo": "BUSETA",
        "servicioVehiculo": "Particular"
    },
    {
        "numero": "25260001000016911051",
        "identificacion": {
            "numero": "8909039388",
            "tipo": 4
        },
        "fecha": 1497416400000,
        "direccion": "8-TRAMO BOGOTA HONDA 5-KILOMETRO 125+700",
        "estado": "Pendiente",
        "fotodeteccion": false,
        "codigo": "C29",
        "total": 368865,
        "secretaria": "El Rosal",
        "placaVehiculo": "RMK049",
        "tipoVehiculo": "BUSETA",
        "servicioVehiculo": "Particular"
    },
    {
        "numero": "11001000000016081461",
        "identificacion": {
            "numero": "8909039388",
            "tipo": 4
        },
        "fecha": 1495429200000,
        "direccion": "CR 9-CL 140-USAQUEN",
        "estado": "Pendiente",
        "fotodeteccion": false,
        "codigo": "C31",
        "total": 368900,
        "secretaria": "Bogotá D.C.",
        "placaVehiculo": "RCT905",
        "tipoVehiculo": "CAMIONETA",
        "servicioVehiculo": "Particular"
    },
    {
        "numero": "68276000000016046477",
        "identificacion": {
            "numero": "8909039388",
            "tipo": 4
        },
        "fecha": 1494997200000,
        "direccion": "CALLE 200 CON CARRERA 18 Y 16 LA PAZ",
        "estado": "Pendiente",
        "fotodeteccion": false,
        "codigo": "C02",
        "total": 368859,
        "secretaria": "Floridablanca",
        "placaVehiculo": "WOK784",
        "tipoVehiculo": "CAMIONETA",
        "servicioVehiculo": "Publico"
    },
    {
        "numero": "68276000000016045745",
        "identificacion": {
            "numero": "8909039388",
            "tipo": 4
        },
        "fecha": 1494738000000,
        "direccion": "AUTOPISTA FLORIDABLANCA PIEDECUESTA PROXIMO A PAPI QUIERO PINA SENTIDO SUR",
        "estado": "Pendiente",
        "fotodeteccion": false,
        "codigo": "C29",
        "total": 368859,
        "secretaria": "Floridablanca",
        "placaVehiculo": "HWK102",
        "tipoVehiculo": "CAMPERO",
        "servicioVehiculo": "Particular"
    },
    {
        "numero": "68276000000016044430",
        "identificacion": {
            "numero": "8909039388",
            "tipo": 4
        },
        "fecha": 1494392400000,
        "direccion": "CARRERA 25 CON CALLES 29 Y 30 CA?AVERAL",
        "estado": "Pendiente",
        "fotodeteccion": false,
        "codigo": "C02",
        "total": 368859,
        "secretaria": "Floridablanca",
        "placaVehiculo": "HWM485",
        "tipoVehiculo": "AUTOMOVIL",
        "servicioVehiculo": "Particular"
    },
    {
        "numero": "20011000000015776039",
        "identificacion": {
            "numero": "8909039388",
            "tipo": 4
        },
        "fecha": 1497330000000,
        "direccion": "TRONCAL CARRERA 40 CON CALLE 1 AGUACHICA",
        "estado": "Pendiente",
        "fotodeteccion": false,
        "codigo": "C29",
        "total": 379826,
        "secretaria": "Aguachica",
        "placaVehiculo": "TTT506",
        "tipoVehiculo": "CAMION",
        "servicioVehiculo": "Publico"
    },
    {
        "numero": "68276000000016870612",
        "identificacion": {
            "numero": "8909039388",
            "tipo": 4
        },
        "fecha": 1495861200000,
        "direccion": "CALLE 29 CON CARRRAS 12 Y 13   LAGOS 1",
        "estado": "Pendiente",
        "fotodeteccion": false,
        "codigo": "C02",
        "total": 368859,
        "secretaria": "Floridablanca",
        "placaVehiculo": "UDQ994",
        "tipoVehiculo": "CAMPERO",
        "servicioVehiculo": "Particular"
    },
    {
        "numero": "68276000000016872033",
        "identificacion": {
            "numero": "8909039388",
            "tipo": 4
        },
        "fecha": 1496206800000,
        "direccion": "ANILLO VIAL SENTIDO FLORIDA GIRON FRENTE A NATURA",
        "estado": "Pendiente",
        "fotodeteccion": false,
        "codigo": "C02",
        "total": 368859,
        "secretaria": "Floridablanca",
        "placaVehiculo": "UDR497",
        "tipoVehiculo": "AUTOMOVIL",
        "servicioVehiculo": "Particular"
    },
    {
        "numero": "68276000000016871677",
        "identificacion": {
            "numero": "8909039388",
            "tipo": 4
        },
        "fecha": 1496120400000,
        "direccion": "CARRERA 5 CON CALLES 6 Y 7 FLORIDABLANCA",
        "estado": "Pendiente",
        "fotodeteccion": false,
        "codigo": "C02",
        "total": 368859,
        "secretaria": "Floridablanca",
        "placaVehiculo": "UDS739",
        "tipoVehiculo": "CAMIONETA",
        "servicioVehiculo": "Particular"
    },
    {
        "numero": "68276000000016871035",
        "identificacion": {
            "numero": "8909039388",
            "tipo": 4
        },
        "fecha": 1496293200000,
        "direccion": "CALLE 198 CON CARRERA 28C EL RECREO",
        "estado": "Pendiente",
        "fotodeteccion": false,
        "codigo": "C02",
        "total": 368859,
        "secretaria": "Floridablanca",
        "placaVehiculo": "WOK784",
        "tipoVehiculo": "CAMIONETA",
        "servicioVehiculo": "Publico"
    },
    {
        "numero": "68276000000016873059",
        "identificacion": {
            "numero": "8909039388",
            "tipo": 4
        },
        "fecha": 1496725200000,
        "direccion": "AUTOPISTA FLORIDABLANCA BUCARAMANGA PROX CC PARQUE CARACOLI SENTIDO NORTE",
        "estado": "Pendiente",
        "fotodeteccion": false,
        "codigo": "C29",
        "total": 368859,
        "secretaria": "Floridablanca",
        "placaVehiculo": "IRO236",
        "tipoVehiculo": "CAMIONETA",
        "servicioVehiculo": "Particular"
    },
    {
        "numero": "68276000000015559035",
        "identificacion": {
            "numero": "8909039388",
            "tipo": 4
        },
        "fecha": 1486270800000,
        "direccion": "ANILLO VIAL FLORIDABLANCA GIRON FRENTE A EDS COTRASUR",
        "estado": "Pendiente",
        "fotodeteccion": false,
        "codigo": "C29",
        "total": 368859,
        "secretaria": "Floridablanca",
        "placaVehiculo": "UDQ994",
        "tipoVehiculo": "CAMPERO",
        "servicioVehiculo": "Particular"
    },
    {
        "numero": "68276000000015560305",
        "identificacion": {
            "numero": "8909039388",
            "tipo": 4
        },
        "fecha": 1486443600000,
        "direccion": "ANILLO VIAL FLORIDABLANCA GIRON FRENTE A EDS COTRASUR",
        "estado": "Pendiente",
        "fotodeteccion": false,
        "codigo": "C29",
        "total": 368859,
        "secretaria": "Floridablanca",
        "placaVehiculo": "UDQ994",
        "tipoVehiculo": "CAMPERO",
        "servicioVehiculo": "Particular"
    },
    {
        "numero": "68276000000015561374",
        "identificacion": {
            "numero": "8909039388",
            "tipo": 4
        },
        "fecha": 1486616400000,
        "direccion": "ANILLO VIAL FLORIDABLANCA GIRON FRENTE A EDS COTRASUR",
        "estado": "Pendiente",
        "fotodeteccion": false,
        "codigo": "C29",
        "total": 368859,
        "secretaria": "Floridablanca",
        "placaVehiculo": "UDQ994",
        "tipoVehiculo": "CAMPERO",
        "servicioVehiculo": "Particular"
    },
    {
        "numero": "68276000000016874280",
        "identificacion": {
            "numero": "8909039388",
            "tipo": 4
        },
        "fecha": 1497157200000,
        "direccion": "CARRERA 26A CON CALLES 33 Y 34 CA?AVERAL",
        "estado": "Pendiente",
        "fotodeteccion": false,
        "codigo": "C02",
        "total": 368859,
        "secretaria": "Floridablanca",
        "placaVehiculo": "UDS472",
        "tipoVehiculo": "AUTOMOVIL",
        "servicioVehiculo": "Particular"
    },
    {
        "numero": "68276000000016872625",
        "identificacion": {
            "numero": "8909039388",
            "tipo": 4
        },
        "fecha": 1496552400000,
        "direccion": "AUTOPISTA FLORIDABLANCA BUCARAMANGA PROX CC PARQUE CARACOLI SENTIDO NORTE",
        "estado": "Pendiente",
        "fotodeteccion": false,
        "codigo": "C29",
        "total": 368859,
        "secretaria": "Floridablanca",
        "placaVehiculo": "IRR290",
        "tipoVehiculo": "CAMIONETA",
        "servicioVehiculo": "Particular"
    },
    {
        "numero": "76001000000016753797",
        "identificacion": {
            "numero": "8909039388",
            "tipo": 4
        },
        "fecha": 1497330000000,
        "direccion": "CALLE 25 CON CARRERA 95",
        "estado": "Pendiente",
        "fotodeteccion": false,
        "codigo": "C29",
        "total": 393465,
        "secretaria": "Cali",
        "placaVehiculo": "SHT515",
        "tipoVehiculo": "MICROBUS",
        "servicioVehiculo": "Publico"
    },
    {
        "numero": "54405000000017148077",
        "identificacion": {
            "numero": "8909039388",
            "tipo": 4
        },
        "fecha": 1499662800000,
        "direccion": "AV 10 CALLE 12 PUENTE DE MONTEBELLO 1 LOS PATIOS",
        "estado": "Pendiente",
        "fotodeteccion": false,
        "codigo": "C29",
        "total": 368858,
        "secretaria": "Los Patios",
        "placaVehiculo": "HRQ352",
        "tipoVehiculo": "AUTOMOVIL",
        "servicioVehiculo": "Particular"
    },
    {
        "numero": "68276000000015561000",
        "identificacion": {
            "numero": "8909039388",
            "tipo": 4
        },
        "fecha": 1486530000000,
        "direccion": "CALLE 9 CON CARRERA 9 Y 8 FLORIDABLANCA",
        "estado": "Pendiente",
        "fotodeteccion": false,
        "codigo": "C02",
        "total": 368859,
        "secretaria": "Floridablanca",
        "placaVehiculo": "HVY675",
        "tipoVehiculo": "CAMPERO",
        "servicioVehiculo": "Particular"
    },
    {
        "numero": "68276000000015563825",
        "identificacion": {
            "numero": "8909039388",
            "tipo": 4
        },
        "fecha": 1487048400000,
        "direccion": "CALLE 31 CON CARRERAS 23 Y 24 CA?AVERAL",
        "estado": "Pendiente",
        "fotodeteccion": false,
        "codigo": "C02",
        "total": 368859,
        "secretaria": "Floridablanca",
        "placaVehiculo": "HWN038",
        "tipoVehiculo": "CAMPERO",
        "servicioVehiculo": "Particular"
    },
    {
        "numero": "68276000000015566367",
        "identificacion": {
            "numero": "8909039388",
            "tipo": 4
        },
        "fecha": 1487566800000,
        "direccion": "CARRERA 26B CON CALLES 30 Y 31 CA?AVERAL",
        "estado": "Pendiente",
        "fotodeteccion": false,
        "codigo": "C02",
        "total": 368859,
        "secretaria": "Floridablanca",
        "placaVehiculo": "UDQ994",
        "tipoVehiculo": "CAMPERO",
        "servicioVehiculo": "Particular"
    },
    {
        "numero": "68276000000015566284",
        "identificacion": {
            "numero": "8909039388",
            "tipo": 4
        },
        "fecha": 1487566800000,
        "direccion": "CARRERA 26 CON CALLES 32 Y 31A CA?AVERAL",
        "estado": "Pendiente",
        "fotodeteccion": false,
        "codigo": "C02",
        "total": 368859,
        "secretaria": "Floridablanca",
        "placaVehiculo": "UDU502",
        "tipoVehiculo": "CAMIONETA",
        "servicioVehiculo": "Particular"
    }
]

  baseUrl: string;

  constructor(private comparendoService:ComparendoService) { }

  incluirPlaca() {
    this.placas.push(this.placa);
    this.placa = "";
  }

  consultar() {
    alert('entro');
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });

    let body = { "tipo": 4, "numero": "8909039388" }
   
    this.comparendoService.getComparendo(body).subscribe();
    
  }

  private getHeaders() {
    let headers = new Headers();
    headers.append('Accept', 'application/json');
    return headers;
  }

  ngOnInit() {
  }

}
