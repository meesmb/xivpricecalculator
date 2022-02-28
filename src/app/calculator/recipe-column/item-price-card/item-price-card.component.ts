import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {TransformedItem} from "../../../../models/transformed-item.model";

@Component({
  selector: 'app-item-price-card',
  templateUrl: './item-price-card.component.html',
  styleUrls: ['./item-price-card.component.scss']
})
export class ItemPriceCardComponent implements OnInit {
  @Input() item! : {i: TransformedItem | null, c: number};
  @Input() shouldShowToggle : boolean = true;
  @Output() onToggleCraft = new EventEmitter<{i: TransformedItem | null, c: number}>();

  constructor() { }

  ngOnInit(): void {
  }

  getItemPrice() : number {
    if (this.item.i !== null)
      return this.item.i.getSetPrice();
    return 0;
  }

  getItemAmount() : number {
    if (this.item.i !== null) {
      return this.item.i.getAmount();
    }
    return 0;
  }

  getTotalItemPrice() : number {
    return this.getItemAmount() * this.getItemPrice();
  }

  shouldShowCheckbox() : boolean {
    if (this.item.i === null || !this.shouldShowToggle) return false;
    return this.item.i.isCraftedItem()
  }
  getRecipeIconUrl() : string {
    return "https://xivapi.com" + this.item.i?.getResultItem().getIcon();
  }

  toggle() {
    this.onToggleCraft.emit(this.item);
  }
}
