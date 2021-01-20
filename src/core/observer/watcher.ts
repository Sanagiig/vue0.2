import Dep, { pushTarget, popTarget } from './dep'

let uid = 0

/**
 * A watcher parses an expression, collects dependencies,
 * and fires callback when the expression value changes.
 * This is used for both the $watch() api and directives.
 */
export default class Watcher {
  // vm: Component;
  // expression: string;
  // cb: Function;
  // id: number;
  // deep: boolean;
  // user: boolean;
  // lazy: boolean;
  // sync: boolean;
  // dirty: boolean;
  // active: boolean;
  // deps: Array<Dep>;
  // newDeps: Array<Dep>;
  // depIds: SimpleSet;
  // newDepIds: SimpleSet;
  // before: ?Function;
  // getter: Function;
  // value: any;
  constructor (
    vm: Component,
    expOrFn: string | Function,
    cb: Function,
    options?: Object | void,
    isRenderWatcher?: boolean
  ) {

  }
}