
import config from '../config'
import { initProxy } from './proxy'
import { initState } from './state'
import { initRender } from './render'
import { initEvents } from './events'
import { initLifecycle, callHook } from './lifecycle'
import { initProvide, initInjections } from './inject'
import { extend, mergeOptions, formatComponentName } from "@utils/index";

let uid = 0;
export function initMixin(Vue: ComponentCtor) {
  Vue.prototype._init = function (options?: ComponentOptions) {
    const vm: Component = this
    // a uid
    vm._uid = uid++;

    let startTag, endTag;
    /* istanbul ignore if */
    // if (process.env.NODE_ENV !== 'production' && config.performance && mark) {
    //   startTag = `vue-perf-start:${vm._uid}`
    //   endTag = `vue-perf-end:${vm._uid}`
    //   mark(startTag)
    // }

    // a flag to avoid this being observed
    vm._isVue = true;
    // merge options
    if (options && options._isComponent) {
      // optimize internal component instantiation
      // since dynamic options merging is pretty slow, and none of the
      // internal component options needs special treatment.
      initInternalComponent(vm, options)
    } else {
      vm.$options = mergeOptions(
        resolveConstructorOptions(vm.constructor),
        options || <ComponentOptions>{},
        vm
      )
    }

    /* istanbul ignore else */
    if (process.env.NODE_ENV !== 'production') {
      initProxy(vm)
    } else {
      vm._renderProxy = vm
    }

    // expose real self
    vm._self = vm
    initLifecycle(vm)
    initEvents(vm)
    initRender(vm)
    callHook(vm, 'beforeCreate')
    initInjections(vm) // resolve injections before data/props
    initState(vm)
    initProvide(vm) // resolve provide after data/props
    callHook(vm, 'created')
  }
}

export function initInternalComponent(vm: Component, options?: InternalComponentOptions): ComponentOptions {
  return <ComponentOptions>{}
}

export function resolveConstructorOptions(Ctor: ComponentCtor): ComponentOptions {
  let options = Ctor.options;
  if (Ctor.super) {
    // const superOptions = resolveConstructorOptions(Ctor.super)
    // const cachedSuperOptions = Ctor.superOptions
    // if (superOptions !== cachedSuperOptions) {
    //   // super option changed,
    //   // need to resolve new options.
    //   Ctor.superOptions = superOptions
    //   // check if there are any late-modified/attached options (#4976)
    //   const modifiedOptions = resolveModifiedOptions(Ctor)
    //   // update base extend options
    //   if (modifiedOptions) {
    //     extend(Ctor.extendOptions, modifiedOptions)
    //   }
    //   options = Ctor.options = mergeOptions(superOptions, Ctor.extendOptions)
    //   if (options.name) {
    //     options.components[options.name] = Ctor
    //   }
    // }
  }
  return options;
}

function resolveModifiedOptions (Ctor: ComponentCtor): Object | void {

}