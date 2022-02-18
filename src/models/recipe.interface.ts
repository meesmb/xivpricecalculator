import {Item} from "./item.model";

export interface Recipe {
  AmountIngredient0 : number;
  AmountIngredient1 : number;
  AmountIngredient2 : number;
  AmountIngredient3 : number;
  AmountIngredient4 : number;
  AmountIngredient5 : number;
  AmountIngredient6 : number;
  AmountIngredient7 : number;
  AmountIngredient8 : number;
  AmountIngredient9 : number;
  AmountResult : number;
  CanHq : number;
  ClassJob : {
    Abbreviation : string;
    Name: string;
  }
  Icon : string;
  Id : string;
  ItemIngredient0 : Item;
  ItemIngredient1 : Item;
  ItemIngredient2 : Item;
  ItemIngredient3 : Item;
  ItemIngredient4 : Item;
  ItemIngredient5 : Item;
  ItemIngredient6 : Item;
  ItemIngredient7 : Item;
  ItemIngredient8 : Item;
  ItemIngredient9 : Item;
  ItemResult : Item;
  Name : string;
  Url : string;
}
