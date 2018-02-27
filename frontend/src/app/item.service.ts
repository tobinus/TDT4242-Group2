import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';

import { of } from 'rxjs/observable/of';


export class Item{
  private _name : String;
  constructor(name: String){
    this._name = name;
  }

  public get name() : String{
    return this._name;
  };

}


@Injectable()
export class ItemService {

  constructor() { }

  public getItems() : Observable<Item[]>{
    return of([
      new Item("Item 1"),
      new Item("Item 2"),
      new Item("Item 3"),
      new Item("Item 4"),
    ]);
  }
}
