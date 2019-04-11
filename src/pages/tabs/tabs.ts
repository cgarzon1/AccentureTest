import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

//importar paginas
import { RequestPage } from '../request/request';
import { RecordPage } from '../record/record';

@Component({
  selector: 'page-tabs',
  templateUrl: 'tabs.html',
})
export class TabsPage {

  tab1 = RequestPage;
  tab2 = RecordPage;


  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad TabsPage');
  }

}
