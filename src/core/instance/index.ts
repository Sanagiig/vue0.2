import { warn } from "@utils/index";

var Vue:any = function(this: Component, options: ComponentOptions) {
  if (process.env.NODE_ENV !== 'production' &&
    !(this instanceof Vue)
  ) {
    warn('Vue is a constructor and should be called with the `new` keyword')
  }
  this._init(options)
}

export default Vue;