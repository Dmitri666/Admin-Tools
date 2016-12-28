import {DataModel} from '../../../core/qdata/src/DataModel';
import {QNode, NodeType, MethodType} from '../../../core/qdata/src/QNode';
import {TableView} from './TableView';
import {ContactDto} from '../model/generated/ContactDto';
import {DataService} from '../../../core/qdata/src/DataService';
import {QDescriptorBuilder} from "../../../core/qdata/src/QDescriptorBuilder";

export class Model extends DataModel<TableView, ContactDto> {
  constructor(dataService: DataService, url: string) {
    super(dataService, url);
  }

  getQuery(): QNode {
    let builder = new QDescriptorBuilder<TableView,ContactDto>();
    builder.addBinding(x => x.name, x => x.firstName);
    builder.addBinding(x => x.nachname, x => x.lastName);
    builder.addBinding(x => x.firma, x => x.customer.firma11);
    builder.addBinding(x => x.firma1, x => x.customer.firma21);

    return builder.getQuery();
  }


}
