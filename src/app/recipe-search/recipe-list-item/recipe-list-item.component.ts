import {Component, Input, OnInit} from '@angular/core';
import {ItemReturnValue} from "../../../services/xivapi.service";

@Component({
  selector: 'app-recipe-list-item',
  templateUrl: './recipe-list-item.component.html',
  styleUrls: ['./recipe-list-item.component.scss']
})
export class RecipeListItemComponent implements OnInit {
  @Input() recipe! : ItemReturnValue;

  constructor() { }

  ngOnInit(): void {
  }

}
