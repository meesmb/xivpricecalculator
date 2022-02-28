import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import {HttpClientModule} from "@angular/common/http";
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { RecipeSearchComponent } from './recipe-search/recipe-search.component';
import { HeaderComponent } from './header/header.component';
import { RecipeListItemComponent } from './recipe-search/recipe-list-item/recipe-list-item.component';
import { CalculatorComponent } from './calculator/calculator/calculator.component';
import {AppRouting} from "./app.routing";

@NgModule({
  declarations: [
    AppComponent,
    RecipeSearchComponent,
    HeaderComponent,
    RecipeListItemComponent,
    CalculatorComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    NgbModule,
    AppRouting,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
