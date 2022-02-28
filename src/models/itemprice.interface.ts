import {ItemListing} from "./itemlisting.interface";

export interface ItemPrice {
  itemID : number;
  worldID : number;
  lastUploadTime : number;
  listings : ItemListing[];
  currentAveragePrice : number;
  currentAveragePriceNQ : number;
  currentAveragePriceHQ : number;
  minPrice : number;
  minPriceNQ : number;
  minPriceHQ : number;
}
