type ComponentCtorUtil = {
  warn: NoopFn
  extend: ExtendFn
  mergeOptions: MergeOptionsFn
  defineReactive: DefineReactiveFn
}

declare interface ComponentCtor {
  new(options: ComponentOptions): Component;
  cid:number;
  options: ComponentOptions;
  // 父构造函数
  super?: ComponentCtor;
  /**
   * 扩展相关
   */
  // 注册插件，会将this 与接受 N 个参数组成args, 确定ctx 调用 plugin.install(...args)
  use: (plugin: Function | Object | any, ...restArgs: any) => void;
  mixin: (mixin: ComponentOptions) => ComponentCtor;
  // 构件
  extend: (this: ComponentCtor, extendOptions: ComponentOptions) => Function;
  // 内部调用 observer
  observable: <T>(obj: T) => T;
  // 工具
  util: ComponentCtorUtil;
  set: (target: Array<any> | any, key: string, val: any) => any;
  delete: (target: Array<any> | any, key: string) => any;
  nextTick: (cb?: Function, ctx?: Component) => void;

  // Super.options
  superOptions: ComponentOptions;
  // extend 扩展时的选项 (Vue.extend(extendOptions))
  extendOptions: ComponentOptions;
  // Super.options, extendOptions 合并后的选项作为 opts的备份，为opts更改后做参考
  sealedOptions: ComponentOptions;

  // asset 资源
  component: (id: string, definition: Function | Object | any) => ComponentCtor;
  directive: (id: string, definition: Function | Object | any) => Function | void;
  filter: (id: string, definition: Function | Object | any) => Function | void;
}

declare interface Component {
  constructor: ComponentCtor;

  cid: number | null;
  // ???
  options?: ComponentOptions;
  /**
   * public properties
   */
  // this._data
  $data: any;
  // this._props
  $props: any;
  // element.__vue__
  $el: Element | any;
  $children: Component[];
  $options: ComponentOptions;
  $on: Function;
  // on.fn = fn && vm.$on(event,on)
  $once: (event: string, fn: Function) => Component;
  $off: Function;
  $emit: Function;
  $watch: Function;
  $mount: Function;
  $set: (target: Array<any> | any, key: string, val: any) => any;
  $delete: (target: Array<any> | any, key: string) => any;
  // 父组件实例
  // ???
  $parent?: Component;
  // 根节点实例
  $root: Component;
  $refs: { [key: string]: any };
  $slots: VNodeInstance[];
  $scopedSlots: { [key: string]: VNodeInstance };
  // ???
  $vnode?: VNodeInstance | void; // the placeholder node for the component in parent's render tree
  $createElement: (a: any, b: any, c: any, d: any) => Function;

  /**
   * private properties
   */
  _name: string;
  _uid: number;
  // ob 对象
  __ob__: any;
  // 当前 vm
  _self: Component;
  _data: { [key: string]: any };
  _props: { [key: string]: any };
  // provide obj
  _provided: { [key: string]: any };
  // v-once cached trees
  _staticTrees: Array<VNodeInstance> | null;
  // 防止被ob
  _isVue: boolean;
  _isMounted: boolean;
  _isDestroyed: boolean;
  _isBeingDestroyed: boolean;
  // 如果有相应的hook则会$emit(xxhook)
  _hasHookEvent: boolean;
  // 组件 inactive 状态
  _inactive: boolean | null;
  // 组件指令 inactive 状态 ？？
  _directInactive: boolean;
  // 调用render 的上下文 ， 开发环境时 proxy
  _renderProxy: Component;
  // vm 实例更新 watcher
  _watcher: WatcherInstance | null;
  _watchers: WatcherInstance[];
  // cb 有可能是带 fn 的对象
  _events: { [key: string]: Function[] | null };
  // 计算属性监听器列表
  _computedWatchers: WatcherInstance[];
  // 已安装的插件
  _installedPlugins: any[];
  // ???
  _vnode:VNodeWithData | VNodeInstance;
  _update: Function;
  // option.render 确定 $vnode
  _render: Function;
  __patch__:Function;
  // 初始化initLifecycle initEvents initRender callHook(beforeCreate)
  // initInjections initState initProvide callHook(created)
  // vm.$mount
  _init: (options?: ComponentOptions) => {}
  // createElement

  // _c is internal that accepts `normalizationType` optimization hint
  _c: (
    vnode?: VNodeInstance,
    data?: VNodeData,
    children?: VNodeChildren,
    normalizationType?: number
  ) => VNodeInstance | void;

  // renderStatic
  _m: (index: number, isInFor?: boolean) => VNodeInstance | VNodeChildren;
  // markOnce
  _o: (vnode: VNodeInstance | Array<VNodeInstance>, index: number, key: string) => VNodeInstance | VNodeChildren;
  // toString
  _s: (value: any) => string;
  // text to VNode
  _v: (value: string | number) => VNodeInstance;
  // toNumber
  _n: (value: string) => number | string;
  // empty vnode
  _e: () => VNodeInstance;
  // loose equal
  _q: (a: any, b: any) => boolean;
  // loose indexOf
  _i: (arr: Array<any>, val: any) => number;
  // resolveFilter
  _f: (id: string) => Function;
  // renderList
  _l: (val: any, render: RenderFn) => Array<VNodeInstance>;
  // renderSlot
  _t: (name: string, fallback: Array<VNodeInstance>, props: any, bindObject: any) => Array<VNodeInstance> | void;
  // apply v-bind object
  _b: (data: any, tag: string, value: any, asProp: boolean, isSync?: boolean) => VNodeData;
  // apply v-on object
  _g: (data: any, value: any) => VNodeData;
  // check custom keyCode
  _k: (
    eventKeyCode: number,
    key: string,
    builtInKeyCode?: number | Array<number>,
    eventKeyName?: string,
    builtInKeyName?: string | Array<string>
  ) => boolean | void;
  // resolve scoped slots
  _u: (scopedSlots: ScopedSlotsData, res?: any) => { [key: string]: Function };

  // SSR specific
  _ssrNode: Function;
  _ssrList: Function;
  _ssrEscape: Function;
  _ssrAttr: Function;
  _ssrAttrs: Function;
  _ssrDOMProps: Function;
  _ssrClass: Function;
  _ssrStyle: Function;
}