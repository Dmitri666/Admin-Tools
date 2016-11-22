import {DataModel} from '../../../core/qdata/src/DataModel';
import {QNode, NodeType, MethodType} from '../../../core/qdata/src/QNode';
import {TableView} from './TableView';
import {ContactDto} from '../model/generated/ContactDto';
import {DataService} from '../../../core/qdata/src/DataService';

export class Model extends DataModel<TableView, ContactDto> {
    constructor(dataService: DataService, url: string) {
        super(dataService, url);
    }

    getQuery(): QNode {
        let query: QNode = {
            Type: NodeType.Querable,
            Value: ''
        };
        let projection: QNode = {
            Type: NodeType.Method,
            Value: MethodType.Select,
            Right: {
                Type: NodeType.Member,
                Value: this.binding(x => x.name, x => x.firstName),
                Left: {
                    Type: NodeType.Member,
                    Value: this.binding(x => x.nachname, x => x.lastName),
                    Left: {
                        Type: NodeType.Member,
                        Value: this.binding(x => x.firma, x => x.customer.firma11),
                        Left: {
                            Type: NodeType.Member,
                            Value: this.binding(x => x.firma1, x => x.customer.firma21)
                        }

                    }
                }
            }
        }
        projection.Left = query;
        return projection;
    }


}
