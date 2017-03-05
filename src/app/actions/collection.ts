import { Action } from '@ngrx/store';
import { type } from '../util';
import {ContactDto} from "../model/generated/ContactDto";
import {CustomerDto} from "../model/generated/CustomerDto";


export const ActionTypes = {
  ADD_CONTACT:          type('[Collection] Add Contact'),
  SELEDT_CONTACT:          type('[Collection] Select Contact'),
  ADD_CUSTOMER:          type('[Collection] Add Customer'),
  LOAD:                 type('[Collection] Load')
};

export class AddCustomerAction implements Action {
  type = ActionTypes.ADD_CUSTOMER;

  constructor(public payload: CustomerDto) { }
}

export class AddContactAction implements Action {
  type = ActionTypes.ADD_CONTACT;

  constructor(public payload: {customerId, ContactDto}) { }
}


export class LoadAction implements Action {
  type = ActionTypes.LOAD;


  constructor(public payload: CustomerDto[]) { }
}

export class SelectContactAction implements Action {
  type = ActionTypes.SELEDT_CONTACT;


  constructor(public payload: {customer:CustomerDto,contact:ContactDto}) { }
}
export type Actions
  = AddCustomerAction
  | LoadAction
  | AddContactAction
  | SelectContactAction;
