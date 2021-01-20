import { defineReactive, toggleObserving } from '../observer/index';
import { hasSymbol, hasOwn, warn } from "@utils/index";

export function initProvide(vm: Component) {
  const provide = vm.$options.provide
  if (provide) {
    vm._provided = typeof provide === 'function'
      ? provide.call(vm)
      : provide
  }
}

export function initInjections(vm: Component) {

}

export function resolveInject(inject: any, vm: Component): InjectOption | void {
  if (inject) {
    // inject is :any because flow is not smart enough to figure out cached
    const result = <InjectOption>Object.create(null)
    const keys = hasSymbol
      ? Reflect.ownKeys(inject)
      : Object.keys(inject)

    for (let i = 0; i < keys.length; i++) {
      const key = <string>keys[i];
      // #6574 in case the inject object is observed...
      if (key === '__ob__') continue

      const provideKey = inject[key].from;
      let source = vm;
      while (source) {
        if (source._provided && hasOwn(source._provided, provideKey)) {
          result[key] = <ValueOf<InjectOption>>source._provided[provideKey]
          break
        }
        source = <Component>source.$parent;
      }

      if (!source) {
        if ('default' in inject[key]) {
          const provideDefault = inject[key].default
          result[key] = typeof provideDefault === 'function'
            ? provideDefault.call(vm)
            : provideDefault
        } else if (process.env.NODE_ENV !== 'production') {
          warn(`Injection "${key}" not found`, vm)
        }
      }
    }
    return result;
  }
}