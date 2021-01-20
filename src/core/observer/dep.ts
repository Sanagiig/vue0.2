import type Watcher from './watcher';

let uid = 0

/**
 * A dep is an observable that can have multiple
 * directives subscribing to it.
 */
export default class Dep {
  static target : Watcher | null ;
  id: number;
  subs: Array<Watcher>;
  constructor () {
    this.id = uid++
    this.subs = []
  }
}

Dep.target = null
const targetStack = [];

export function pushTarget (target: Watcher | void) {
  // targetStack.push(target);
  // Dep.target = target;
}

export function popTarget () {
  // targetStack.pop();
  // Dep.target = targetStack[targetStack.length - 1];
}
