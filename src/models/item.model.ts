import {Item} from "./item.interface";

export class ItemModel {
  constructor(private item : Item) {
  }

  getIcon() : string {
    return this.item.Icon;
  }

  getName() : string {
    return this.item.Name;
  }

  getDescription() : string {
    return this.item.Description;
  }

  getID() : number {
    return this.item.ID;
  }
}
