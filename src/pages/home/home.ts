import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

//importar paginas
import { LoginPage } from '../login/login';
import { RegisterPage } from '../register/register';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  constructor(public navCtrl: NavController) {

  }

  /**
   * Metodo para direccionar a login
   */
  goLogin() {
    this.navCtrl.push(LoginPage);
  }

  /**
   * Metodo para direccionar a registro
   */
  goRegister() {
    this.navCtrl.push(RegisterPage);
  }

}
