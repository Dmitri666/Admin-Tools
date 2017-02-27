import {ContactDto} from "./ContactDto";
import {CustomerDto} from "./CustomerDto";
export class CustomersContainer {
  customers: Array<CustomerDto>;
  constructor() {
    this.customers = new Array;
  }
}
