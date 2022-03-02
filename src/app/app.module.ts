import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import {HttpClientModule} from "@angular/common/http";
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { RecipeSearchComponent } from './recipe-search/recipe-search.component';
import { HeaderComponent } from './header/header.component';
import { RecipeListItemComponent } from './recipe-search/recipe-list-item/recipe-list-item.component';
import { CalculatorComponent } from './calculator/calculator.component';
import {AppRouting} from "./app.routing";
import { ItemPriceCardComponent } from './calculator/recipe-column/item-price-card/item-price-card.component';
import { LoadingComponent } from './calculator/recipe-column/item-price-card/loading/loading.component';
import { RecipeColumnComponent } from './calculator/recipe-column/recipe-column.component';
import {ClipboardModule} from "ngx-clipboard";
import {CookieService} from "ngx-cookie-service";
import { PriceTypeSelectComponent } from './calculator/price-type-select/price-type-select.component';

@NgModule({
  declarations: [
    AppComponent,
    RecipeSearchComponent,
    HeaderComponent,
    RecipeListItemComponent,
    CalculatorComponent,
    ItemPriceCardComponent,
    LoadingComponent,
    RecipeColumnComponent,
    PriceTypeSelectComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    NgbModule,
    AppRouting,
    ClipboardModule
  ],
  providers: [CookieService],
  bootstrap: [AppComponent]
})
export class AppModule { }
