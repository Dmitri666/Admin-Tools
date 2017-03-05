import {CustomersContainer} from "../model/generated/CustomersContainer";
import * as collection from '../actions/collection';
import {CustomerDto} from "../model/generated/CustomerDto";
import {ContactDto} from "../model/generated/ContactDto";
import { createSelector } from 'reselect';

export interface State {
  customerIds: Array<number>;
  contactIds: Array<number>;
  customerEntities: {[id:number]:CustomerDto};
  contactEntities:  {[id:number]:ContactDto};
  contactByCustomer: {[customerId:number]:Array<number>};
  selectedCustomerId:number;
  selectedContactId:number;
};

const initialState: State = {
  customerIds:[],
  contactIds:[],
  customerEntities: {},
  contactEntities:{},
  contactByCustomer:{},
  selectedCustomerId: null,
  selectedContactId: null
};


export function reducer(state = initialState, action: collection.Actions): State {
  switch (action.type) {
    case collection.ActionTypes.LOAD: {
      const customers = action.payload;
      const newCustomers = customers.filter(customer => !state.customerEntities[customer.id]);

      const newCustomerIds = newCustomers.map(customer => customer.id);
      const newCustomerEntities = newCustomers.reduce((entities: {[id:number]:CustomerDto},customer: CustomerDto) => {
        return Object.assign(entities,{
          [customer.id]:customer
        });
      },{});

      let contacts = [];
      action.payload.map(c => c.contacts).forEach(a =>
        contacts = contacts.concat(a));

      const newContacts = contacts.filter(contact => !state.contactEntities[contact.id]);

      const newContactsIds = newContacts.map(contact => contact.id);
      const newContactEntities = newContacts.reduce((entities: {[id:number]:ContactDto},contact: ContactDto) => {
        return Object.assign(entities,{
          [contact.id]:contact
        });
      },{});

      const newcontactByCustomer = newCustomers.reduce((entities: { [id: string]: Array<number> }, customer: CustomerDto) => {
        return Object.assign(entities, {
          [customer.id]: customer.contacts.map(c => c.id)
        });
      }, {});

      return {
        customerIds: [ ...state.customerIds, ...newCustomerIds ],
        contactIds: [...state.contactIds,...newContactsIds],
        customerEntities: Object.assign({}, state.customerEntities, newCustomerEntities),
        contactEntities: Object.assign({}, state.contactEntities, newContactEntities),
        contactByCustomer:Object.assign({}, state.contactByCustomer,newcontactByCustomer),
        selectedCustomerId: state.selectedCustomerId,
        selectedContactId: state.selectedContactId
      };
    }

    case collection.ActionTypes.ADD_CUSTOMER: {
      const customer = action.payload;
      return state;

    }

    case collection.ActionTypes.ADD_CONTACT: {
      const contact = action.payload;
      let customerId
      return state;

    }
    case collection.ActionTypes.SELEDT_CONTACT: {
      return Object.assign({}, state, {selectedCustomerId:action.payload.customer.id,selectedContactId:action.payload.contact.id});
    }
    default: {
      return state;
    }
  }
}

export const getCustomerEntities = (state: State) => state.customerEntities;

export const getCustomerIds = (state: State) => state.customerIds;

export const getAllCustomers = createSelector(getCustomerEntities, getCustomerIds, (entities, ids) => {
  return ids.map(id => entities[id]);
});

export const getContactEntities = (state: State) => state.contactEntities;

export const getContactIds = (state: State) => state.contactIds;

export const getAllContacts = createSelector(getContactEntities, getContactIds, (entities, ids) => {
  return ids.map(id => entities[id]);
});

export const getContactsByCustomerId = (state: State) => state.contactByCustomer;

export const getContactByCustomer = createSelector(getCustomerIds,getAllContacts,getContactsByCustomerId, (ids, contacts,contactsByCustomer) => {
  return ids.map(id => contactsByCustomer[id].map(conId => contacts[conId]));
});
