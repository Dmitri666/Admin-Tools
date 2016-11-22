import {ViewModel} from '../../../core/qdata/src/ViewModel';
import {Model} from './Model';
import {BinaryType} from '../../../core/qdata/src/QNode';
import {TableView} from './TableView';

export class TransactionsViewModel extends ViewModel<TableView> {
    constructor(model: Model) {
        super(model);

    }

    configureFilterMap(): Map<string, Function> {
        let map = new Map<string, Function>();
        map.set('firma', (value: any) => this.model.addFilter(x => x.firma, BinaryType.Contains, value));
        map.set('firma1', (value: any) => this.model.addFilter(x => x.firma1, BinaryType.Contains, value));
        map.set('vorname', (value: any) => this.model.addFilter(x => x.name, BinaryType.Contains, value));
        map.set('nachname', (value: any) => this.model.addFilter(x => x.nachname, BinaryType.Contains, value));
        return map;
    }







}
