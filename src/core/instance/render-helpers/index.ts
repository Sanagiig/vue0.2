import { toString, toNumber, looseEqual, looseIndexOf } from "@utils/index";
import { resolveFilter } from './resolve-filter';
import { bindObjectListeners } from './bind-object-listeners'
import { bindObjectProps } from './bind-object-props'
import { renderStatic, markOnce } from './render-static'
import { renderList } from './render-list'
import { createTextVNode, createEmptyVNode } from '@core/vdom/vnode'
import { renderSlot } from './render-slot'
import { checkKeyCodes } from './check-keycodes'
import { resolveScopedSlots } from './resolve-slots'

export function installRenderHelpers(target: Component) {
  target._o = markOnce;
  target._n = toNumber;
  target._f = resolveFilter;
  target._s = toString;
  target._g = bindObjectListeners;
  target._b = bindObjectProps;
  target._m = renderStatic;
  target._l = renderList;
  target._e = createEmptyVNode;
  target._v = createTextVNode;
  target._t = renderSlot;
  target._k = checkKeyCodes;
  target._i = looseIndexOf;
  target._q = looseEqual;
  target._u = resolveScopedSlots
}