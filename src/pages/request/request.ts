import { Component } from '@angular/core';
import { NavController, NavParams, App, AlertController } from 'ionic-angular';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import Moment from 'moment'
//importar paginas
import { HomePage } from '../home/home';


@Component({
  selector: 'page-request',
  templateUrl: 'request.html',
})
export class RequestPage {

  public formauth: FormGroup;

  public nombreE: string;
  public nit: string;
  public salario: number;
  public fechaI: string;
  public banAprobado: boolean = false;
  public monto: string;

  constructor(private alertCtrl: AlertController, public formBuilder: FormBuilder, private app: App, public navCtrl: NavController, public navParams: NavParams) {
    this.formauth = this.formBuilder.group
      ({
        nombreE:
          [
            '',
            Validators.compose
              ([
                Validators.required,
              ])
          ],
        nit: ['', [Validators.required]],
        salario: ['', [Validators.required, Validators.pattern("[0-9]{1,10}")]],
        fechaI:
          [
            '',
            Validators.compose
              ([
                Validators.required,
              ])
          ],
      });
  }



  /**
   * Metodo para cerrar session
   */
  goExit() {
    this.app.getRootNav().setRoot(HomePage);
    localStorage.clear();
  }

  goCalcular() {
    var vali = this.ValidateFields();
    if (vali == "") {
      if (this.salario > 800000) {
        this.banAprobado = true;

        if (this.salario < 1000000) {
          this.monto = "5.000.000";
        }
        else if (this.salario > 1000000 && this.salario < 4000000) {
          this.monto = "20.000.000";
        }
        else if (this.salario > 4000000) {
          this.monto = "20.000.000";
        }

        this.alerta("Crédito aprobado. Monto aprobado $" + this.monto);
        this.clear();
      }
      else {
        this.banAprobado = false;
        this.alerta("Crédito no aprobado");
      }
    }
    else {
      this.alerta(vali);
    }
  }

  /**
   * Metodo para validar si el cliente es mayor de edad
   */
  validateAge(): boolean {

    var dateTime = Moment();
    var dateValue = Moment({ year: dateTime.year(), month: dateTime.month(), day: dateTime.date() });


    var dateTime1 = Moment(this.fechaI);
    var dateValue1 = Moment({ year: dateTime1.year(), month: dateTime1.month(), day: dateTime1.date() });


    var dias = dateValue.diff(dateValue1, 'days')


    if (dias > 584) {
      return true;
    }
    else {
      return false;
    }
  }

  /**
   * Limpiar campos
   */
  clear() {
    this.nombreE = "";
    this.nit = "";
    this.salario = null;
    this.fechaI = "";
  }

  /**
   * Metodo para validar restricciones
   */
  ValidateFields(): string {

    var nitRegExp = new RegExp('^([0-9]{9}-[0-9]{1})?$');

    var msj = "";
    if (this.salario < 0 || this.salario > 100000000) {
      msj = "Salario debe ser un entero, positivo y menor a 100.000.000";
    }
    else if (!nitRegExp.test(this.nit)) {
      msj = "Nit incorrecto, formato aceptado XXX XXX XXX - Y";
    }
    else if (!this.validateAge()) {
      msj = "Crédito no aprobado, Tiempo en empresa mínimo un año y medio";
    }

    return msj;
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
