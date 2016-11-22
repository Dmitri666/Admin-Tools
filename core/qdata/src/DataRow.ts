import {IProjection} from './IProjection';
/**
 * Created by user on 11/17/2016.
 */
export class DataRow<TP extends IProjection> {
    constructor(private source: TP) {
        this.values = [];
        this.properties = [];
        let properties = Object.getOwnPropertyNames(this.source);
        for (let i = 0; i < properties.length; i++) {
            let property = properties[i];
            let value = this.source[property];
            this.values.push(value);
            this.properties.push(property);
        }
    }
    values: string[];
    properties: string[];
}
