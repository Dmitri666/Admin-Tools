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


export class QDescriptorProjectionBuilder<TP extends IProjection, TM extends IModelEntity> {
    private query: QNode;
    private filters: Array<QNode>;
    private includes: string[];
    private sortingNodes: Map<string, QNode>;
    private projectionNodes: Map<string, QNode>;
    constructor() {
        this.includes = [];
        this.filters = [];
        this.sortingNodes = new Map<string, QNode>();
        this.projectionNodes = new Map<string, QNode>();
    }

    addBinding(p: ((x: TP) => void), m: ((x: TM) => void)) {
        let property = this.convertLambdaToPath(p);
        let memberPath = this.convertLambdaToPath(m);
        let members = memberPath.split('.');
        let member:QNode = {Type: NodeType.Method,Value: members[0]};
        this.projectionNodes.set(property,member);
        for(let i = 1; i < members.length; i++){
            let parent = {Type:NodeType.Member,Value:members[i]};
            member.Left = parent;
            member = parent;
            this.projectionNodes.set(property,member);
        }

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

    addFilter(path: (x: TP) => any, op: BinaryType, value: any) {
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


