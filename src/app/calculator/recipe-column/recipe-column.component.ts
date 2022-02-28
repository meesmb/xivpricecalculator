import {AfterViewInit, Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {TransformedItem} from "../../../models/transformed-item.model";

@Component({
  selector: 'app-recipe-column',
  templateUrl: './recipe-column.component.html',
  styleUrls: ['./recipe-column.component.scss']
})
export class RecipeColumnComponent implements OnInit {
  shouldShowCraftColumn : boolean = false;
  itemsToShow : TransformedItem[] = [];
  @Input() item : TransformedItem | null = null;
  @Output() onCraftToggle = new EventEmitter<TransformedItem>();
  constructor() { }

  ngOnInit(): void {
    this.init(this.item);
  }

  init(item : TransformedItem | null) : void {
    if (item !== null) {
      item.getIngredients().forEach((i) => {
        if (i.isCraftedItem()) {
          console.log(i);
          this.shouldShowCraftColumn = true;
          this.itemsToShow.push(i);
        }
      });
    }
  }

  getIngredients() : TransformedItem[] {
    if (this.item) return this.item.getIngredients();
    return [];
  }


}
