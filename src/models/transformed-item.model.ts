// ingredients length is 0 then this is not a crafted item
import {ItemModel} from "./item.model";
import {ItemPrice} from "./itemprice.interface";
import {Item} from "./item.interface";

export class TransformedItem {
  private ingredients : TransformedItem[] = [];
  private resultItem : ItemModel;
  private useCraftedPrice : boolean = false;
  private buyPrice : ItemPrice;
  private readonly amount : number;

  constructor(result : Item, price : ItemPrice, amount : number) {
    this.amount = amount;
    this.resultItem = new ItemModel(result);
    this.buyPrice = price;
  }

  getAmount() : number {
    return this.amount;
  }

  getResultItem() : ItemModel {
    return this.resultItem;
  }

  addIngredient(ingredient : TransformedItem) {
    this.ingredients.push(ingredient);
  }

  getIngredients() : TransformedItem[] {
    return this.ingredients;
  }

  isCraftedItem() : boolean {
    return this.ingredients.length !== 0;
  }

  setUseCraftedPrice(useCraftedPrice : boolean) {
    this.useCraftedPrice = useCraftedPrice;
  }

  getPrice_min() : number {
    if (this.isCraftedItem() && this.useCraftedPrice) {
      let total = 0;
      this.ingredients.forEach((ingredient) => total += ingredient.getPrice_min());
      return total;
    }
    else {
      return this.buyPrice.minPrice;
    }
  }

  getPrice_average() : number {
    if (this.isCraftedItem() && this.useCraftedPrice) {
      let total = 0;
      this.ingredients.forEach((ingredient) => total += ingredient.getPrice_average());
      return total;
    }
    else {
      return this.buyPrice.currentAveragePrice;
    }
  }
}
