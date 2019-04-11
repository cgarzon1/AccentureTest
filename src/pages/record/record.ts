import { Component } from '@angular/core';
import { NavController, NavParams, App } from 'ionic-angular';
//importar paginas
import { HomePage } from '../home/home';



@Component({
  selector: 'page-record',
  templateUrl: 'record.html',
})
export class RecordPage {

  constructor(private app: App, public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad RecordPage');
  }

  goExit() {
    this.app.getRootNav().setRoot(HomePage);
    localStorage.clear();
  }

}
