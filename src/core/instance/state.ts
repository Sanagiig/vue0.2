import { noop, warn, isPlainObject, handleError } from "@utils/index";
import { set, del } from "@core/observer/index";
import Watcher from "@core/observer/watcher";

const sharedPropertyDefinition = {
  enumerable: true,
  configurable: true,
  get: noop,
  set: noop
}

function createWatcher(
  vm: Component,
  expOrFn: string | Function,
  handler: any,
  options?: WatcherOption
): Function {
  return function name() {

  }
}

export function stateMixin(Vue: ComponentCtor) {
  // flow somehow has problems with directly declared definition object
  // when using Object.defineProperty, so we have to procedurally build up
  // the object here.
  const dataDef: PropertyDescriptor = {};
  dataDef.get = function (this: Component) { return this._data };
  const propsDef: PropertyDescriptor = {};
  propsDef.get = function (this: Component) { return this._props };
  if (process.env.NODE_ENV !== 'production') {
    dataDef.set = function () {
      warn(
        'Avoid replacing instance root $data. ' +
        'Use nested data properties instead.',
        this
      )
    }
    propsDef.set = function () {
      warn(`$props is readonly.`, this)
    }
  }
  Object.defineProperty(Vue.prototype, '$data', dataDef);
  Object.defineProperty(Vue.prototype, '$props', propsDef);

  Vue.prototype.$set = set;
  Vue.prototype.$delete = del;

  Vue.prototype.$watch = function (
    expOrFn: string | Function,
    cb: any,
    options?: WatcherOption
  ): Function {
    const vm: Component = this;
    if (isPlainObject(cb)) {
      return createWatcher(vm, expOrFn, cb, options);
    }

    options = options || {};
    options.user = true;
    const watcher: WatcherInstance = <WatcherInstance>new Watcher(vm, expOrFn, cb, options);

    if (options.immediate) {
      try {
        cb.call(vm, watcher.value)
      } catch (error) {
        handleError(error, vm, `callback for immediate watcher "${watcher.expression}"`)
      }
    }

    return function unwatchFn() {
      watcher.teardown()
    }
  }
}

export function initState (vm: Component) {
  
}

export function proxy(this: any, target: Object, sourceKey: string, key: string) {
  sharedPropertyDefinition.get = function proxyGetter(this: any) {
    return this[sourceKey][key];
  }
  sharedPropertyDefinition.set = function proxySetter(this: any, val: any) {
    this[sourceKey][key] = val;
  }

  Object.defineProperty(target, key, sharedPropertyDefinition);
}

export function defineComputed(
  target: any,
  key: string,
  userDef: Object | Function
) {

}

