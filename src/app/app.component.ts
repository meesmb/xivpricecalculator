import { Component } from '@angular/core';
import {UniversalisService} from "../services/universalis.service";
import {XIVApiService} from "../services/xivapi.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'xivpricecalculator';

  constructor() {
  }


}
