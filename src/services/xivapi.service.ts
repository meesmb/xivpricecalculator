import { Injectable } from '@angular/core';
import {HttpService} from "./http.service";
import {HttpClient} from "@angular/common/http";
import {Item} from "../models/item.interface";
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

  // returns an empty array if there is no recipe
  public async doesItemHaveRecipe(itemName : string) : Promise<Recipe[]> {
    return new Promise<Recipe[]>(async (resolve, reject) => {
      try {
        let data = await this.getRecipeUrlsByName(itemName);
        let recipes = await this.getItemsData(data);
        resolve(recipes);
      }
      catch (e) {
        resolve([]);
      }
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

  public async getWorlds() : Promise<{name: string, selected: boolean}[]>{
    return new Promise(async (resolve, reject) => {
      try {
        const data = await this._get<{Results: {Name: string, ID: number}[]}>("/World");
        let result : {name: string, selected: boolean}[] = [];
        data.Results.forEach((d) => result.push({name: d.Name, selected: false}));
        resolve(result);
      }
      catch (e) {
        reject(e);
      }
    });
  }
}
