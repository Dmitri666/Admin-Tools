import {IModelEntity} from "./IModelEntity";
import {IProjection} from "./IProjection";
export interface QBinding<TP extends IProjection, TM extends IModelEntity>{
    property: (x:TP) => void;
    member: (x:TM) => void;
}
