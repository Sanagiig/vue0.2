import { nextTick } from "@utils/index";

export function renderMixin(Vue: ComponentCtor) {
  // install runtime convenience helpers
  // installRenderHelpers(Vue.prototype)

  Vue.prototype.$nextTick = function (fn: Function) {
    return nextTick(fn, this)
  }

  Vue.prototype._render = function (): VNodeInstance {
    return <VNodeInstance>{}
  }
}

export function initRender (vm: Component) {
  
}