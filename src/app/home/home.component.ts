import { Component, OnInit } from '@angular/core';
import {NgbPaginationModule, NgbAlertModule} from '@ng-bootstrap/ng-bootstrap';

//import 'bootstrap';
//import { Swiper } from 'swiper/dist/js/swiper';

import * as $ from 'jquery';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.less']
})

//declare var $: any;
//
//declare var Swiper :any;

export class HomeComponent implements OnInit {

  constructor() { }

  images = [1, 2, 3].map(() => `https://picsum.photos/900/500?random&t=${Math.random()}`);

  ngOnInit() {


}
}