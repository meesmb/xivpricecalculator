import { Injectable } from '@angular/core';
import {HttpService} from "./http.service";
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class XIVApiService extends HttpService {

  constructor(http : HttpClient) {
    super(http, "https://xivapi.com");
  }
}
