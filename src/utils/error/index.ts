import {
  isPromise,
  inBrowser,
  inWeex,
  warn
} from "@utils/index";
import config from "@core/config";

// 向上使用 $options.errorCaptured 报错，如果有则 globalHandleError
export function handleError(err: Error, vm: any, info: string) {
  if (vm) {
    let cur = vm
    while ((cur = cur.$parent)) {
      const hooks = cur.$options.errorCaptured
      if (hooks) {
        for (let i = 0; i < hooks.length; i++) {
          try {
            const capture = hooks[i].call(cur, err, vm, info) === false
            if (capture) return
          } catch (e) {
            globalHandleError(e, cur, 'errorCaptured hook')
          }
        }
      }
    }
  }
}

export function invokeWithErrorHandling(
  handler: Function,
  context: any,
  args: null | any[],
  vm: any,
  info: string
) {
  let res
  try {
    res = args ? handler.apply(context, args) : handler.call(context)
    if (isPromise(res)) {
      res.catch((e: any) => handleError(e, vm, info + ` (Promise/async)`))
    }
  } catch (e) {
    handleError(e, vm, info)
  }
  return res
}

// 使用 config.errorHandler 打印错误
function globalHandleError(err: Error, vm: any, info: string) {
  if (config.errorHandler) {
    try {
      return (<any>config.errorHandler).call(null, err, vm, info)
    } catch (e) {
      logError(e, null, 'config.errorHandler')
    }
  }
  logError(err, vm, info)
}

// warn || console.error
function logError(err: Error, vm: any, info: string) {
  if (process.env.NODE_ENV !== 'production') {
    warn(`Error in ${info}: "${err.toString()}"`, vm)
  }
  /* istanbul ignore else */
  if ((inBrowser || inWeex) && typeof console !== 'undefined') {
    console.error(err)
  } else {
    throw err
  }
}