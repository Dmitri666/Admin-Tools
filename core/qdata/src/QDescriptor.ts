import {QNode} from './QNode';
/**
 * Created by dle on 17.11.2016.
 */

export class QDescriptor {
  Root: QNode;
  Include: Array<QNode>;
  IsProjection: boolean;

  constructor() {
    this.Include = [];
  }
}
