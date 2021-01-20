export default class VNode {
  constructor(
    tag?: string,
    data?: VNodeData,
    children?: VNodeInstance[],
    text?:string,
    elm?: Element,
    context?: Component,
    componentOptions?: VNodeComponentOptions,
    asyncFactory?:Function
  ) {}
}

// 创建空白vnode (comment)
export const createEmptyVNode = (text: string = ''): VNodeInstance => {
  return <VNodeInstance>{}
}

// 创建文本节点
export function createTextVNode (val: string | number):VNodeInstance {
  return <VNodeInstance>{}
}

export function cloneVNode (vnode: VNodeInstance): VNodeInstance {
  return <VNodeInstance>{}
}