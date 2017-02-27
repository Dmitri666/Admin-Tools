import {CustomersContainer} from "../model/generated/CustomersContainer";
import * as collection from '../actions/collection';

export interface State {
  container: CustomersContainer;
  selectedCustomerId:number;
  selectedContactId:number;
};

const initialState: State = {
  container: new CustomersContainer,
  selectedCustomerId: null,
  selectedContactId: null
};


export function reducer(state = initialState, action: collection.Actions): State {
  switch (action.type) {
    case collection.ActionTypes.LOAD: {
      return Object.assign({}, state, {
        container: Object.assign({},state.container,{customers:[...action.payload]})
      });
    }

    case collection.ActionTypes.ADD_CUSTOMER: {
      const customer = action.payload;
      return Object.assign({}, state, {
        container: Object.assign({},state.container,{customers:[...state.container.customers,action.payload]})
      });

    }

    case collection.ActionTypes.ADD_CONTACT: {
      const contact = action.payload;
      let customerId
      return Object.assign({}, state, {
        container: Object.assign({},state.container,{customers:[...state.container.customers,action.payload]})
      });

    }
    case collection.ActionTypes.SELEDT_CONTACT: {
      return Object.assign({}, state, {selectedCustomerId:action.payload.customer.id,selectedContactId:action.payload.contact.id});
    }
    default: {
      return state;
    }
  }
}
