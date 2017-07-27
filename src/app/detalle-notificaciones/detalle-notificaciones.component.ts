import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ComparendoService } from '../services/comparendo.service';
import { Comparendo } from '../dto/comparendo';
import { ComparendoRequest } from '../dto/comparendoRequest';
import { DetallesImpuesto } from '../dto/impuesto';
import { ImpuestoService } from '../services/impuesto.service';

@Component({
  selector: 'app-detalle-notificaciones',
  templateUrl: './detalle-notificaciones.component.html',
  styleUrls: ['./detalle-notificaciones.component.css']
})
export class DetalleNotificacionesComponent implements OnInit {

  constructor(private route: ActivatedRoute,
    private router: Router,
    private comparendoService: ComparendoService,
    private ImpuestoService: ImpuestoService) { }

  id;
  tipo;
  comparendo: Comparendo;
  impuesto:DetallesImpuesto;
  placa;

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.id = params['id'];
      this.tipo = params['tipo'];
      this.placa = params['placa'];

      if (this.tipo == "Multa") {
        var comparendoRequest: ComparendoRequest = new ComparendoRequest();
        comparendoRequest.numero = "8909039388";
        comparendoRequest.tipo = 4;
        comparendoRequest.placas = [];
        comparendoRequest.placas.push(this.placa);

        this.comparendoService.getComparendo(comparendoRequest).subscribe(res => {
          res.forEach(response =>{
            if(response.numero == this.id){
              this.comparendo = response;
            }
          });
        });
      }
      else if(this.tipo == "Impuesto"){
        this.ImpuestoService.getImpuestos(this.placa).subscribe(res => {
          res.detalles.forEach(response => {
            if(response.nroReferencia == this.id){
              this.impuesto = response;
            }
          });
        });

      }


    });
  }

}
