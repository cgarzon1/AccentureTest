import { Component } from '@angular/core';
import { NavController, NavParams, AlertController } from 'ionic-angular';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
//importar paginas
import { TabsPage } from '../tabs/tabs';
//importar provider
import { ClientProvider } from '../../providers/client/client';

@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {

  public formauth: FormGroup;

  public nombre: string;
  public apellido: string;
  public identificacion: number;
  public clientData: any = [];

  constructor(private alertCtrl: AlertController, public clientServices: ClientProvider, public formBuilder: FormBuilder, public navCtrl: NavController, public navParams: NavParams) {
    this.formauth = this.formBuilder.group
      ({
        nombre:
          [
            '',
            Validators.compose
              ([
                Validators.required,
              ])
          ],
        apellido:
          [
            '',
            Validators.compose
              ([
                Validators.required,
              ])
          ],
        identificacion: ['', [Validators.required, Validators.pattern("[0-9]{1,10}")]],
      });
  }

  /**
    * Evento click login
    */
  gologin() {
    this.clientData = [];
    this.clientServices.getClient()
      .then
      (
        (data) => {
          for (let a in data) {
            this.clientData.push(data[a]);
          }
          this.validateIdentification();
        }
      )
      .catch
      (
        (error) => { console.log(error) }
      );
  }

  /**
 * Metodo para validar si el usuario se encuentra registrado
 */
  validateIdentification() {
    var cli = this.clientData.filter(task => task.identification == this.identificacion && task.firstname == this.nombre && task.lastname == this.apellido);
    if (cli.length > 0) {
      this.alerta("Bienvenid@ " + cli[0].firstname + ' ' + cli[0].lastname);
      this.navCtrl.setRoot(TabsPage);
    }
    else {
      this.alerta("Usuario incorrecto");
    }
  }

  /**
  * Mensaje alerta
  */
  alerta(mensaje: string) {
    let alert = this.alertCtrl.create({
      title: 'Alerta',
      message: mensaje,
      buttons: [
        {
          text: 'Aceptar',
          handler: () => {
            console.log('Buy clicked');
          }
        }
      ]
    });
    alert.present();
  }

}
