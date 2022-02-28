import { Injectable } from '@angular/core';
import {HttpService} from "./http.service";
import {HttpClient} from "@angular/common/http";
import {ItemPrice} from "../models/itemprice.interface";

@Injectable({
  providedIn: 'root'
})
export class UniversalisService extends HttpService {

  constructor(http : HttpClient) {
    super(http, "https://universalis.app/api");
  }

  async getItemPrice(world : string, itemId : number) : Promise<ItemPrice> {
    return new Promise<ItemPrice>(async (resolve, reject) => {
      try {
        const data = await this._get<ItemPrice>("/" + world + "/" + itemId);
        resolve(data);
      }
      catch (e) {
        reject(e);
      }
    });
  }

}
