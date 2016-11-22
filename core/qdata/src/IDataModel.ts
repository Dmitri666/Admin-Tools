import {BinaryType} from './QNode';
import {IProjection} from './IProjection';
/**
 * Created by user on 11/17/2016.
 */
export interface IDataModel<TP extends IProjection> {
    addFilter(path: (x: TP) => any, op: BinaryType, value: any);
    sort(property: string);
    refresh();
}











