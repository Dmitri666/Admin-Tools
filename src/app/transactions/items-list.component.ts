import {Component, Input, Output, EventEmitter} from '@angular/core';
import {ContactDto} from '../model/generated/ContactDto';

@Component({
  selector: 'items-list',
  template: `
  <div class="row" *ngFor="let item of items" (click)="selected.emit(item)">
    <div class="col-xs-12">
      <h2 >{{item.firstName}}</h2>
    </div>
    <div class="col-xs-12">
      {{item.lastName}}
    </div>
    
  </div>
  <div class="mdl-card__menu">
      <button (click)="deleted.emit(item); $event.stopPropagation();"
        class="mdl-button mdl-button--icon mdl-js-button mdl-js-ripple-effect">
        <i class="material-icons">close</i>
      </button>
    </div>
`
})
export class ItemsList {
  @Input() items: Array<ContactDto>;
  @Output() selected = new EventEmitter();
  @Output() deleted = new EventEmitter();
}
