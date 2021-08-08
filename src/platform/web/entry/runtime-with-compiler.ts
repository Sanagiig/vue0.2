import Vue from '@web/runtime/index';
import { warn, cached } from '@core/utils/index'
// import { mark, measure } from '@core/utils/perf'
import { compileToFunctions } from '@web/compiler/index';
import { query } from '@web/utils/index'
import { shouldDecodeNewlines, shouldDecodeNewlinesForHref } from '../utils/compat'

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
      console.log("compileToFunctions",template,compileToFunctions)
      const { render, staticRenderFns } = compileToFunctions(template, {
        outputSourceRange: process.env.NODE_ENV !== 'production',
        shouldDecodeNewlines,
        shouldDecodeNewlinesForHref,
        delimiters: options.delimiters,
        comments: options.comments
      }, this)
      console.log("render",render,staticRenderFns,render.toLocaleString ())
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

/**
 * Get outerHTML of elements, taking care
 * of SVG elements in IE as well.
 */
 function getOuterHTML (el: Element): string {
  if (el.outerHTML) {
    return el.outerHTML
  } else {
    const container = document.createElement('div')
    container.appendChild(el.cloneNode(true))
    return container.innerHTML
  }
}

Vue.compile = compileToFunctions;
export default Vue;