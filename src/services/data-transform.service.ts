import { Injectable } from '@angular/core';
import {UniversalisService} from "./universalis.service";
import {XIVApiService} from "./xivapi.service";
import {RecipeModel} from "../models/recipe.model";
import {TransformedItem} from "../models/transformed-item.model";
import {Recipe} from "../models/recipe.interface";
import {Item} from "../models/item.interface";
import {ItemPrice} from "../models/itemprice.interface";


@Injectable({
  providedIn: 'root'
})
export class DataTransformService {

  constructor(private universalisService : UniversalisService, private xivApiService : XIVApiService) { }

  async transformToUsableData(world : string, recipe : RecipeModel) : Promise<TransformedItem> {
    return await this.getTransformedItem(world, {ingredient: recipe.getRecipe().ItemResult, amount: 1});
  }

  private async getRecipeTransformedItems(world : string, recipe : RecipeModel) : Promise<TransformedItem[]> {
    let result : TransformedItem[] = [];
    let ingredients : {ingredient: Item, amount: number}[] = recipe.getIngredients();
    for (let ingredient of ingredients) {
      let item = await this.getTransformedItem(world, ingredient);
      result.push(item);
    }
    return result;
  }

  private async getTransformedItem(world : string, ingredient : {ingredient: Item, amount: number}) : Promise<TransformedItem> {

    let recipes : Recipe[] = await this.xivApiService.doesItemHaveRecipe(ingredient.ingredient.Name);
    let price : ItemPrice = await this.universalisService.getItemPrice(world, ingredient.ingredient.ID);
    let item = new TransformedItem(ingredient.ingredient, price, ingredient.amount);
    // if this is a recipe
    if (recipes.length !== 0) {
      // just take first
      let recipeModel : RecipeModel = new RecipeModel(recipes[0]);
      // get recipe ingredients
      let recipeIngredients = await this.getRecipeTransformedItems(world, recipeModel);
      recipeIngredients.forEach((i) => item.addIngredient(i));
    }
    return item;
  }
}
