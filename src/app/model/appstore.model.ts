import {ContactDto} from "./generated/ContactDto";
import {CustomerDto} from "./generated/CustomerDto";
export interface AppStore {
  contacts: ContactDto[];
  selectedContact: ContactDto;
  customers: CustomerDto[];
  selectedCustomer: CustomerDto;
};
