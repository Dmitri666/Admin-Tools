import {Component, Input, Output, EventEmitter} from '@angular/core';
import {ContactDto} from "../model/generated/ContactDto";


@Component({
  selector: 'contacts-list',
  template: `
  <div *ngFor="let item of contacts" (click)="selected.emit(item)"
    class="fem-card mdl-card mdl-shadow--2dp">
    <div class="mdl-card__title">
      <h2 class="mdl-card__title-text">{{item.firstName}}</h2>
    </div>
    <div class="mdl-card__supporting-text">
      {{item.lastName}}
    </div>
    <div class="mdl-card__menu">
      <button (click)="deleted.emit(item); $event.stopPropagation();"
        class="mdl-button mdl-button--icon mdl-js-button mdl-js-ripple-effect">
        <i class="material-icons">close</i>
      </button>
    </div>
  </div>
  `
})
export class ContactsList {
  @Input() contacts: ContactDto[];
  //@Output() selected = new EventEmitter();
  //@Output() deleted = new EventEmitter();
}
