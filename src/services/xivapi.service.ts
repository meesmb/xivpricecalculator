import { Injectable } from '@angular/core';
import {HttpService} from "./http.service";
import {HttpClient} from "@angular/common/http";

export interface ItemReturnValue {Url: string, ID: number, Icon: string, Name: string}
@Injectable({
  providedIn: 'root'
})
export class XIVApiService extends HttpService {

  constructor(http : HttpClient) {
    super(http, "https://xivapi.com");
  }

  public async getRecipeUrlsByName(recipeName : string) : Promise<ItemReturnValue[]>  {
    let urlwithparams = "/search?string_algo=match&indexes=Recipe&string=" + recipeName;
    return new Promise<ItemReturnValue[]>((resolve, reject) =>{
        this._get<{Results: ItemReturnValue[]}>(urlwithparams)
          .then((result) => {
            resolve(result.Results);
        });
      });
  }
}
