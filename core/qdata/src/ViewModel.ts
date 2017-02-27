import {IProjection} from './IProjection';
import {IDataModel} from './IDataModel';
import {DataRow} from './DataRow';

export abstract class ViewModel<TP extends IProjection>  {
    filter: any;
    data: DataRow<TP>[];
    sorting: string[];

    private filterMap: Map<string, Function>;

    constructor(protected model: IDataModel<TP>) {
        this.filter = {};
        this.sorting = [];
        this.filterMap = this.configureFilterMap();
    }

    protected abstract configureFilterMap(): Map<string, Function>;



    private applyFilterState() {
        let filters = Object.getOwnPropertyNames(this.filter);
        for (let i = 0; i < filters.length; i++) {
            let property = filters[i];
            let value = this.filter[property];
            let f = this.filterMap.get(property);
            f.call(this.model, value);
        }
    }

    isSortedByAscending(property: string): boolean {
        return true;
    }

    isSortedByDescending(property: string): boolean {
        return false;
    }

    sort(property: string) {
        this.applyFilterState();
        this.model.sort(property).subscribe(
            data => {
                this.data = data;
            });
    }

    refresh() {
        this.applyFilterState();
        this.model.refresh();
    }
}
