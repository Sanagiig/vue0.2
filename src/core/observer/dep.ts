import { remove } from "@shared/util";
import config from "@core/config";
let uid = 0

/**
 * A dep is an observable that can have multiple
 * directives subscribing to it.
 */
export default class Dep {
  static target: WatcherInstance | null;
  id: number;
  subs: Array<WatcherInstance>;
  constructor() {
    this.id = uid++
    this.subs = []
  }
  addSub(sub: WatcherInstance) {
    this.subs.push(sub)
  }

  removeSub(sub: WatcherInstance) {
    remove(this.subs, sub)
  }

  depend() {
    if (Dep.target) {
      Dep.target.addDep(this)
    }
  }

  notify () {
    // stabilize the subscriber list first
    const subs = this.subs.slice()
    if (process.env.NODE_ENV !== 'production' && !config.async) {
      // subs aren't sorted in scheduler if not running async
      // we need to sort them now to make sure they fire in correct
      // order
      subs.sort((a:WatcherInstance, b:WatcherInstance) => a.id - b.id)
    }
    for (let i = 0, l = subs.length; i < l; i++) {
      subs[i].update()
    }
  }
}

Dep.target = null
const targetStack = <WatcherInstance[]>[];

export function pushTarget(target: WatcherInstance | null) {
  targetStack.push(<WatcherInstance>target);
  Dep.target = target;
}

export function popTarget() {
  targetStack.pop();
  Dep.target = targetStack[targetStack.length - 1];
}
