
import { mergeOptions } from "@utils/index";

export function initMixin (Vue: GlobalAPI) {
  Vue.mixin = function (mixin: ComponentOptions) {
    this.options = mergeOptions(this.options, mixin)
    return this
  }
}
