import {QNode, NodeType} from './QNode';
import {BinaryType} from './QNode';
import {MethodType} from './QNode';
import {QDescriptor} from './QDescriptor';
import {IProjection} from './IProjection';
import {IModelEntity} from './IModelEntity';
import {IDataModel} from './IDataModel';
import {DataRow} from './DataRow';
import {Observable} from 'rxjs';
import {DataService} from './DataService';
import {QBinding} from "./QBinding";
require('rxjs/add/operator/map');


export class QDescriptorBuilder<TM extends IModelEntity> {
    private query: QNode;
    private filters: Array<QNode>;
    private includes: string[];
    private sortingNodes: Map<string, QNode>;
    constructor() {
        this.includes = [];
        this.filters = [];
        this.sortingNodes = new Map<string, QNode>();
        this.query = {Type: NodeType.Querable, Value: ''}
    }

    addSorting(property: string) {
        if (this.sortingNodes.has(property)) {
            let node = this.sortingNodes.get(property);
            if (node.Value === MethodType.OrderBy) {
                node.Value = MethodType.OrderByDescending;
            } else {
                this.sortingNodes.delete(property);
            }

        } else {
            this.sortingNodes.set(property, {
                Type: NodeType.Method,
                Value: MethodType.OrderBy,
                Right: {
                    Type: NodeType.Member,
                    Value: property
                }
            });
        }
    }

    addFilter(path: (x: TM) => any, op: BinaryType, value: any) {
        this.filters.push({
            Type: NodeType.Binary,
            Value: op,
            Left: {
                Type: NodeType.Member,
                Value: this.convertLambdaToPath(path)
            },
            Right: {
                Type: NodeType.Constant,
                Value: value
            }
        });
    }

    private buildQuery(): QNode {
        let root: QNode = this.query;
        if (this.filters.length > 0) {
            let where: QNode = {
                Type: NodeType.Method,
                Value: MethodType.Where,
                Left: this.query
            };
            for (let i = 0; i < this.filters.length; i++) {
                let node = this.filters[i];
                if (i === 0) {
                    where.Right = node;
                } else {
                    let binary: QNode = {
                        Type: NodeType.Binary,
                        Value: BinaryType.And,
                        Left: where.Right,
                        Right: node
                    };
                    where.Right = binary;
                }
            }
            where.Left = root;
            root = where;
        }

        this.sortingNodes.forEach(function (node, key) {
          node.Left = root;
          root = node;
        });
        return root;
    }

    public getQDescriptor() {
      let root = this.buildQuery();
      let descriptor: QDescriptor = new QDescriptor();
      descriptor.IsProjection = false;
      descriptor.Root = root;
      return descriptor;
    }

    protected resetModel() {
        this.includes = [];
        this.filters = [];
    }

    protected convertLambdaToPath(lambda: any): string {
        let p = lambda.toString().split('.');
        let path;
        for (let i = 1; i < p.length; i++) {
            if (path === undefined) {
                path = p[i];
            } else {
                path = path + '.' + p[i];
            }

        }
        return path.split(';')[0];
    }
}


