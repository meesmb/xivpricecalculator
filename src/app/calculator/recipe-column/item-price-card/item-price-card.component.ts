import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {TransformedItem} from "../../../../models/transformed-item.model";

@Component({
  selector: 'app-item-price-card',
  templateUrl: './item-price-card.component.html',
  styleUrls: ['./item-price-card.component.scss']
})
export class ItemPriceCardComponent implements OnInit {
  @Input() item : TransformedItem | null = null;
  @Output() onToggleCraft = new EventEmitter<TransformedItem>();

  constructor() { }

  ngOnInit(): void {
  }

  getItemPrice() : number {
    if (this.item !== null)
      return this.item.getPrice_min();
    return 0;
  }

  shouldShowCheckbox() : boolean {
    if (this.item === null) return false;
    return this.item.isCraftedItem()
  }
  getRecipeIconUrl() : string {
    return "https://xivapi.com" + this.item?.getResultItem().getIcon();
  }
}
