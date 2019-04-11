import { Component } from '@angular/core';
import { NavController, NavParams, AlertController } from 'ionic-angular';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import Moment from 'moment'
//importar paginas
import { TabsPage } from '../tabs/tabs';
//importar provider
import { ClientProvider } from '../../providers/client/client';
//importar interfaces
import { addClientIn } from '../../interfaces/addClient';

@Component({
  selector: 'page-register',
  templateUrl: 'register.html',
})
export class RegisterPage {

  public formauth: FormGroup;

  public nombre: string;
  public apellido: string;
  public identificacion: number;
  public fechaC: string;
  public clientData: any = [];
  constructor(public clientServices: ClientProvider, private alertCtrl: AlertController, public formBuilder: FormBuilder, public navCtrl: NavController, public navParams: NavParams) {
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
        fechaC:
          [
            '',
            Validators.compose
              ([
                Validators.required,
              ])
          ]
      });
  }

  /**
   * Evento click registro
   */
  goRegister() {
    this.clientData = [];
    if (this.validateAge()) {

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
    else {
      this.alerta("No es mayor de edad");
    }
  }

  /**
   * Metodo para validar si el usuario se encuentra registrado
   */
  validateIdentification() {
    var cli = this.clientData.filter(task => task.identification == this.identificacion);
    if (cli.length > 0) {
      this.alerta("Ya se encuentra registrado");
    }
    else {
      this.register()
    }
  }


  /**
   * Evento para registrar cliente
   */
  register() {
    let infoCliente = new addClientIn();
    infoCliente.birthdate = this.fechaC;
    infoCliente.firstname = this.nombre;
    infoCliente.lastname = this.apellido;
    infoCliente.identification = this.identificacion;

    this.clientServices.addClient(infoCliente)
      .then
      (
        (data) => {
          this.alerta("Cliente registrado con exito ");
          this.navCtrl.setRoot(TabsPage);
        }
      )
      .catch
      (
        (error) => { console.log(error) }
      )
  }

  /**
   * Metodo para validar si el cliente es mayor de edad
   */
  validateAge(): boolean {

    var dateTime = Moment();
    var dateValue = Moment({ year: dateTime.year(), month: dateTime.month(), day: dateTime.date() });


    var dateTime1 = Moment(this.fechaC);
    var dateValue1 = Moment({ year: dateTime1.year(), month: dateTime1.month(), day: dateTime1.date() });


    var dias = dateValue.diff(dateValue1, 'days')

    if (dias > 6570) {
      return true;
    }
    else {
      return false;
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
