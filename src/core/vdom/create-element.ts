import { isPrimitive, isTrue, isDef,isUndef,isObject,warn } from '@utils/index';
import VNode,{ createEmptyVNode } from '@core/vdom/vnode';
import config from '@config/index';
import { createComponent } from './create-component';
import { traverse } from '@core/observer/traverse';
import { resolveAsset } from '@utils/index';

import {
  normalizeChildren,
  simpleNormalizeChildren
} from './helpers/index'

const SIMPLE_NORMALIZE = 1;
const ALWAYS_NORMALIZE = 2;

// wrapper function for providing a more flexible interface
// without getting yelled at by flow
export function createElement (
  context: Component,
  tag: any,
  data: any,
  children: any,
  normalizationType: any,
  alwaysNormalize: boolean
): VNodeInstance | Array<VNodeInstance> {
  if (Array.isArray(data) || isPrimitive(data)) {
    normalizationType = children
    children = data
    data = undefined
  }
  if (isTrue(alwaysNormalize)) {
    normalizationType = ALWAYS_NORMALIZE
  }
  return _createElement(context, tag, data, children, normalizationType)
}

export function _createElement (
  context: Component,
  tag?: string | ComponentCtor | Function | Object,
  data?: VNodeData,
  children?: any,
  normalizationType?: number
): VNodeInstance | Array<VNodeInstance> {
  return {} as any;
}