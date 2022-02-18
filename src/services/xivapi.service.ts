import { Injectable } from '@angular/core';
import {HttpService} from "./http.service";
import {HttpClient} from "@angular/common/http";
import {Item} from "../models/item.model";
import {Recipe} from "../models/recipe.interface";

export interface ItemReturnValue {Url: string, ID: number, Icon: string, Name: string}
@Injectable({
  providedIn: 'root'
})
export class XIVApiService extends HttpService {
  private getRecipeAmountLimit = "15";
  constructor(http : HttpClient) {
    super(http, "https://xivapi.com");
  }

  public async getRecipeUrlsByName(recipeName : string) : Promise<ItemReturnValue[]>  {
    let urlwithparams = "/search?string_algo=wildcard&indexes=Recipe&limit="
      + this.getRecipeAmountLimit
      + "&string=" + recipeName;
    return new Promise<ItemReturnValue[]>((resolve, reject) =>{
        this._get<{Results: ItemReturnValue[]}>(urlwithparams)
          .then((result) => {
            resolve(result.Results);
        });
      });
  }

  public async getItemsData(itemData : ItemReturnValue[]) : Promise<Recipe[]> {
    return new Promise<Recipe[]>((resolve, reject) => {
      // make a batch of requests
      let requests = itemData.map((item) => {
        return new Promise<Recipe>(async (resolve) => {
          const data = await this._get<Recipe>(item.Url);
          resolve(data);
        });
      });
      // fire of all requests
      Promise.all(requests).then((data) => {
        resolve(data);
      }).catch((e) => {
        reject(e);
      });
    });
  }
}
