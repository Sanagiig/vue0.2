import Vue from '@web/runtime/index';
import {
  cached,
  query,
  warn,
  getOuterHTML,
  shouldDecodeNewlines,
  shouldDecodeNewlinesForHref
} from '@utils/index';
import { compileToFunctions } from '@web/compiler/index';

const idToTemplate = cached((id:string | Element) => {
  const el = query(id);
  return el && el.innerHTML;
}) 

const mount = Vue.prototype.$mount;
// 处理template => render && 挂载
Vue.prototype.$mount = function (
  this:Component,
  el?: string | Element,
  hydrating?: boolean
): Component {
  el = el && query(el);

  /* istanbul ignore if */
  if (el === document.body || el === document.documentElement) {
    process.env.NODE_ENV !== 'production' && warn(
      `Do not mount Vue to <html> or <body> - mount to normal elements instead.`
    )
    return this
  }

  const options = this.$options;
  // resolve template/el and convert to render function
  if (!options.render) {
    let template:any = options.template;
    if (template) {
      if (typeof template === 'string') {
        if (template.charAt(0) === '#') {
          template = idToTemplate(template);
          /* istanbul ignore if */
          if (process.env.NODE_ENV !== 'production' && !template) {
            warn(
              `Template element not found or is empty: ${options.template}`,
              this
            );
          }
        }
      } else if (template.nodeType) {
        template = template.innerHTML;
      } else {
        if (process.env.NODE_ENV !== 'production') {
          warn('invalid template option:' + template, this)
        }
        return this;
      }
    } else if (el) {
      template = getOuterHTML(<Element>el);
    }

    if (template) {
      /* istanbul ignore if */
      // if (process.env.NODE_ENV !== 'production' && config.performance && mark) {
      //   mark('compile')
      // }

      const { render, staticRenderFns } = compileToFunctions(template, {
        outputSourceRange: process.env.NODE_ENV !== 'production',
        shouldDecodeNewlines,
        shouldDecodeNewlinesForHref,
        delimiters: options.delimiters,
        comments: options.comments
      }, this)
      options.render = render
      options.staticRenderFns = staticRenderFns

      // /* istanbul ignore if */
      // if (process.env.NODE_ENV !== 'production' && config.performance && mark) {
      //   mark('compile end')
      //   measure(`vue ${this._name} compile`, 'compile', 'compile end')
      // }
    }
  }

  return mount.call(this, el, hydrating);
}

Vue.compile = compileToFunctions;
export default Vue;