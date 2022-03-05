import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {TransformedItem} from "../../../../models/transformed-item.model";
import {ClipboardService} from "ngx-clipboard";
import { Base64 } from 'js-base64';

@Component({
  selector: 'app-item-price-card',
  templateUrl: './item-price-card.component.html',
  styleUrls: ['./item-price-card.component.scss']
})
export class ItemPriceCardComponent implements OnInit {
  @Input() item! : {i: TransformedItem | null, c: number};
  @Input() shouldShowToggle : boolean = true;
  @Output() onToggleCraft = new EventEmitter<{i: TransformedItem | null, c: number}>();

  constructor(private clipBoardService : ClipboardService) { }

  ngOnInit(): void {
  }

  getResultItemName() : string {
    if (this.item.i) return this.item.i.getResultItem().getName();
    return "";
  }

  copyToClipBoard(value : string) {
    this.clipBoardService.copy(value);
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

  getTeamCraftLink() : string {
    let s = this.item.i?.getResultItem().getID() + ",null,1";
    return "https://ffxivteamcraft.com/import/" + Base64.encode(s);
  }
  getUniversalisLink() : string {
    return "https://universalis.app/market/" + this.item.i?.getResultItem().getID();
  }

  toggle() {
    this.onToggleCraft.emit(this.item);
  }
  getIsCraftedItem() : boolean {
    if (this.item.i) return this.item.i.isCraftedItem();
    return false;
  }
}
