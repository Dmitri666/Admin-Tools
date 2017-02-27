import { ActionReducer, Action } from '@ngrx/store';
import {ContactDto} from "../model/generated/ContactDto";

export const SET_CONTACTS = 'SET_CONTACTS';
export const ADD_CONTACTS = 'ADD_CONTACTS';
export const DECREMENT = 'DECREMENT';
export const RESET = 'RESET';

export const contactsReducer: ActionReducer<ContactDto> = (state: any = [], action: Action) => {
  switch (action.type) {
    case SET_CONTACTS:
      state = action.payload;
      return state;
    default:
      return state;
  }
}
