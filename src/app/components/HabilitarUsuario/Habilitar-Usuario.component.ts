import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { HabilitarUsuarioClientService } from 'src/app/services/HabilitarUsuario/habilita-usuario-client.service';
import { UserHabilitarModel } from './Habilitar-Usuario.component.model';


declare function setup(): any;

/**
 * Componente encargado del Detalle de un RED en especifico.
 */
@Component({
  selector: 'app-Habilitar-Usuario',
  templateUrl: './Habilitar-Usuario.component.html',
  styleUrls: ['./Habilitar-Usuario.component.css']
})
export class HabilitarUsuarioComponent implements OnInit {
  public showInputText = false;
  public UsuarioHabilitado = false;
  public UsuarioEncontrado = false;
  public HabilitarForm: FormGroup;
  public  usermodel: UserHabilitarModel;

  constructor(
    private habilitarUsuarioClientService: HabilitarUsuarioClientService
  ) {
      this.UsuarioHabilitado=false;
      this.UsuarioEncontrado=true;
      this.showInputText=false;
  }
public  User_Habilitar(): void {
    this.showInputText = false;
      this.habilitarUsuarioClientService.User_Habilitar(this.usermodel.numero_identificacion).subscribe(response =>      {
        this.usermodel=response[0];
      },
        error => {
      console.log(error);
        alert('Usuario no pudo ser habilitado. ocurrió un error durante el proceso; favor comunicarse con el administrador del sistema ');
      this.showInputText =false;
                          }
      );
}
  public User_Buscar(): void {
  this.UsuarioHabilitado=false;
  this.UsuarioEncontrado=true;
  this.showInputText=false;
    const UsuarioId = this.HabilitarForm.get('usuario').value;
    this.habilitarUsuarioClientService.User_Buscar(UsuarioId).subscribe(response => {
        this.usermodel=response[0];
        this.UsuarioEncontrado=true;
        if ( this.usermodel.estado=="1" ){
          if (this.usermodel.estado_sisred!="1") {
            this.showInputText = true;
            this.UsuarioHabilitado=false;
          }
          else {
            this.showInputText = false;
            this.UsuarioHabilitado=true;
          }
        }
        else {
          this.showInputText = false;
        }

      },
        error => {
      console.log(error);
      this.UsuarioEncontrado=false;
      this.showInputText =false;
      this.usermodel={ "username": "",
                        "email": "",
                        "first_name": "",
                        "lastname": "",
                        "numero_identificacion": "",
                        "estado": "",
                        "estado_sisred": ""
                    };
                          });
  }

    ngOnInit() {
    this.HabilitarForm = new FormGroup({
       usuario: new FormControl('', Validators.required),
    });
    this.usermodel={ "username": "",
                        "email": "",
                        "first_name": "",
                        "lastname": "",
                        "numero_identificacion": "",
                        "estado": "",
                        "estado_sisred": ""
                    };
    setup();
  }

}
