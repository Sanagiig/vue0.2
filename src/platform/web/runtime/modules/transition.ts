import {inBrowser} from "@utils/index";

export function leave (vnode: VNodeWithData, rm: Function) {

}

function _enter (_: any, vnode: VNodeWithData) {

}

export default inBrowser ? {
  create: _enter,
  activate: _enter,
  remove (vnode: VNodeWithData, rm: Function) {
    /* istanbul ignore else */
    if (vnode.data.show !== true) {
      leave(vnode, rm)
    } else {
      rm()
    }
  }
} : {}