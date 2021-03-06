import {AfterViewInit, Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {TransformedItem} from "../../../models/transformed-item.model";

@Component({
  selector: 'app-recipe-column',
  templateUrl: './recipe-column.component.html',
  styleUrls: ['./recipe-column.component.scss']
})
export class RecipeColumnComponent implements OnInit {
  @Input() item! : {i: TransformedItem | null, c: number};
  @Input() shouldShowToggles : boolean = true;
  @Output() onCraftToggle = new EventEmitter<{i: TransformedItem | null, c: number}>();
  constructor() { }

  ngOnInit(): void {
  }


  getIngredients() : TransformedItem[] {
    if (this.item.i) return this.item.i.getIngredients();
    return [];
  }

  getPrice() : number {
    if (this.item.i) {
      let total = 0;
      this.item.i.getIngredients().forEach((i) => {
        total += (i.getSetPrice() * i.getAmount());
      });
      return total;
    }
    return 0;
  }

  getRecipeIconUrl() : string {
    return "https://xivapi.com" + this.item.i?.getResultItem().getIcon();
  }

  getItemWithCol(item : TransformedItem | null) {
    let col = this.item.c;
    return {i: item, c: col};
  }
}
