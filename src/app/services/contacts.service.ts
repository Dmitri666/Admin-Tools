import {GlobalSettings} from "../constants/global-settings";
import {Headers, Http, RequestOptions} from "@angular/http";
import {ContactDto} from "../model/generated/ContactDto";
import {Observable} from "rxjs";
import {Injectable} from "@angular/core";
import {Store} from "@ngrx/store";
import {AppStore} from "../model/appstore.model";
import {QDescriptor} from "../../../core/qdata/src/QDescriptor";
import {ADD_CONTACTS, SET_CONTACTS} from "../reducers/contactsReducer";
/**
 * Created by dle on 30.12.2016.
 */
const BASE_URL = GlobalSettings.API_ENDPOINT + '/contact';
const HEADER = { headers: new Headers({ 'Content-Type': 'application/json' }) };

@Injectable()
export class ContactsService {
  contacts: Observable<Array<ContactDto>>;

  constructor(private http: Http, private store: Store<AppStore>) {
    this.contacts = store.select<ContactDto[]>('contactsReducer');
  }

  loadItems(query: QDescriptor) {
    let body = JSON.stringify(query);
    let options = new RequestOptions(HEADER);
    this.http.post(BASE_URL,body,options)
      .map(res => res.json())
      .map(payload => ({type: SET_CONTACTS, payload}))
      .subscribe(action => this.store.dispatch(action));
  }


}
