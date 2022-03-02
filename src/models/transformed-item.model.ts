// ingredients length is 0 then this is not a crafted item
import {ItemModel} from "./item.model";
import {ItemPrice} from "./itemprice.interface";
import {Item} from "./item.interface";
import {PriceType} from "./price-type.enum";

export class TransformedItem {
  private ingredients : TransformedItem[] = [];
  private resultItem : ItemModel;
  private useCraftedPrice : boolean = false;
  private buyPrice : ItemPrice;
  private readonly amount : number;
  private static PRICE_TO_USE : PriceType = PriceType.Minimum;
  public static setPriceToUse(priceToUse : PriceType) {
    TransformedItem.PRICE_TO_USE = priceToUse;
  }

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
  getUseCraftedPrice() : boolean {
    return this.useCraftedPrice;
  }

  getSetPrice() : number {
    let price = 0;
    if (TransformedItem.PRICE_TO_USE === PriceType.Minimum) {
      price = this.getPrice_min();
    }
    else if (TransformedItem.PRICE_TO_USE === PriceType.Average) {
      price = this.getPrice_average();
    }
    else if (TransformedItem.PRICE_TO_USE === PriceType.Median) {
      price = this.getPrice_median();
    }
    // else if (TransformedItem.PRICE_TO_USE === PriceType.MODE) {
    //   price = this.getPrice_mode();
    // }
    return Math.ceil(price);
  }

  getPrice_min() : number {
    if (this.isCraftedItem() && this.useCraftedPrice) {
      let total = 0;
      this.ingredients.forEach((ingredient) => total += (ingredient.getPrice_min() * ingredient.getAmount()));
      return total;
    }
    else {
      return this.buyPrice.minPrice;
    }
  }

  getPrice_median() : number {
    // listings should already be ordered
    let medianIndex = this.buyPrice.listings.length / 2;
    if (Number.isInteger(medianIndex)) {
      return this.buyPrice.listings[medianIndex].pricePerUnit;
    }
    let left = this.buyPrice.listings[Math.floor(medianIndex)].pricePerUnit;
    let right = this.buyPrice.listings[Math.ceil(medianIndex)].pricePerUnit;
    return (left + right) * 0.5;
  }

  getRange() : number {
    // listings should already be ordered
    let first = this.buyPrice.listings[0];
    let last = this.buyPrice.listings[this.buyPrice.listings.length - 1];
    if (first && last) {
      return last.pricePerUnit - first.pricePerUnit;
    }
    return 0;
  }

  getPrice_mode() : number {
    let map = new Map<number, number>();
    let maxKey = 0, maxVal = 0;
    for (let i = 0; i < this.buyPrice.listings.length; i++) {
      let key = this.buyPrice.listings[i].pricePerUnit;
      let value = map.get(key);
      if (value) {
        map.set(key, value + 1);
        let mv = map.get(maxKey);
        if (mv) {
          if (mv < value + 1) {
            maxKey = key;
            maxVal = value + 1;
          }
        }
      }
      else
        map.set(key, 0);
    }
    return maxVal;
  }

  getPrice_average() : number {
    if (this.isCraftedItem() && this.useCraftedPrice) {
      let total = 0;
      this.ingredients.forEach((ingredient) => total += (ingredient.getPrice_average() * ingredient.getAmount()));
      return total;
    }
    else {
      return this.buyPrice.currentAveragePrice;
    }
  }
}
