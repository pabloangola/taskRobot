import { Component, OnInit } from '@angular/core';
import { PlantillaCorreo } from '../dto/plantillaCorreo';
import { PlantillaCorreoService } from '../services/plantilla-correo.service'

@Component({
  selector: 'app-administracion',
  templateUrl: './administracion.component.html',
  styleUrls: ['./administracion.component.css']
})
export class AdministracionComponent implements OnInit {
  subject: string = "";
  mail_body: string = "";
  intervalo: string ="diario";

  constructor(private plantillaCorreoService: PlantillaCorreoService) { }
  plantillaCorreos: PlantillaCorreo;

  ngOnInit() {

    this.plantillaCorreoService.traerPlantilla()
      .subscribe(res => {
        this.plantillaCorreos = res;
        this.subject = this.plantillaCorreos.customerEmailSubject;
        this.mail_body = this.plantillaCorreos.customerEmailContentText;
      });


  }

  guardarPlantilla() {

    var plantillaCorreo = new PlantillaCorreo();

    plantillaCorreo.customerEmailSubject = this.subject;
    plantillaCorreo.customerEmailContentText = this.mail_body;

    console.log(this.mail_body.replace(/(?:\r\n|\r|\n)/g, '<br />'));
    plantillaCorreo.initialDelay = "60";
    plantillaCorreo.period = "1";

    //   this.plantillaCorreos.push(plantillaCorreo);
    this.plantillaCorreoService.guardarPlantilla(plantillaCorreo).subscribe(
      error => console.error(error)
    );
    alert("plantilla guardada")
    //   this._success.next('Vehiculo almacenado correctamente.');*/

  }

}
