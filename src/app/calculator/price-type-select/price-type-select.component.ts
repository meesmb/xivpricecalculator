import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {PriceType} from "../../../models/price-type.enum";
import {CookieService} from "ngx-cookie-service";

@Component({
  selector: 'app-price-type-select',
  templateUrl: './price-type-select.component.html',
  styleUrls: ['./price-type-select.component.scss']
})
export class PriceTypeSelectComponent implements OnInit {
  @Output() onTypeSelect = new EventEmitter<PriceType>();

  options = [
    {type: PriceType.Minimum, selected: true},
    {type: PriceType.Median, selected: false},
    {type: PriceType.Average, selected: false},
    //{type: PriceType.MODE, selected: true},
  ];
  constructor(private cookieService : CookieService) {
  }

  ngOnInit(): void {
    let priceType = this.cookieService.get("price-type");
    if (priceType) {
      let type = PriceType[priceType as keyof typeof PriceType];
      this.selectOption({type: type, selected: true});
    }
  }



  selectOption(option : {type: PriceType, selected: boolean}) {
    this.cookieService.set("price-type", option.type);
    this.onTypeSelect.emit(option.type);
    for (let o of this.options) {
      o.selected = o.type === option.type;
    }
  }
}
