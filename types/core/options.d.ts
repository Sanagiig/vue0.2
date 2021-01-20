declare type InjectKey = string | Symbol;
// 通过 from 寻找 parent.provide.key
declare type InjectOption =
  { [key: string]: { from?: InjectKey, default?: any } };


declare type InternalComponentOptions = {
  _isComponent?: boolean;
  parent?: Component;
  _parentVnode?: VNodeInstance;
  render: OptionRender;
  staticRenderFns?: Array<Function>
};

declare type ComponentOptions = {
  componentId?: string;
  // 抽象组件标识
  abstract?: boolean;
  // data
  data?: Object | Function;
  props?: { [key: string]: PropOptions };
  propsData?: any;
  computed?: {
    [key: string]: Function | {
      get?: Function;
      set?: Function;
      cache?: boolean
    }
  };
  methods?: { [key: string]: Function };
  watch?: { [key: string]: Function | string };

  // DOM
  el?: string | Element;
  template?: string;
  render: OptionRender;
  renderError?: (h: () => VNodeInstance, err: Error) => VNodeInstance;
  staticRenderFns?: Array<() => VNodeInstance>;

  // lifecycle
  beforeCreate?: Function;
  created?: Function;
  beforeMount?: Function;
  mounted?: Function;
  beforeUpdate?: Function;
  updated?: Function;
  activated?: Function;
  deactivated?: Function;
  beforeDestroy?: Function;
  destroyed?: Function;
  // 错误捕获 handleError 中会向上递归报错
  errorCaptured?: () => boolean | void;
  ssrPrefetch?: Function;

  // assets
  directives: { [key: string]: Object };
  components: { [key: string]: ComponentCtor };
  transitions: { [key: string]: Object };
  filters?: { [key: string]: Function };

  // context
  provide?: () => { [key: string]: any } | { [key: string]: any };
  inject?: InjectOption | Array<string>;

  // component v-model customization
  model?: {
    prop?: string;
    event?: string;
  };

  // misc
  parent?: Component;
  mixins?: Array<ComponentOptions | ComponentCtor>;
  name?: string;
  extends?: ComponentCtor | ComponentOptions;
  delimiters?: [string, string];
  comments?: boolean;
  inheritAttrs?: boolean;

  // private
  // 标记是否组件
  _isComponent?: boolean;
  _propKeys?: string[];
  _parentVnode?: VNodeInstance;
  _parentListeners?: Object;
  _renderChildren?: VNodeInstance[];
  _componentTag: string;
  _scopeId: string;
  // Vue 构造函数
  _base: ComponentCtor;
  // { SuperId : Sub} 父.cid 对应 Sub 子组件构造函数
  _Ctor?: { [key: string]: any };
  // 指定vue文件路径
  __file?: any;
}

declare type PropOptions = {
  type: Function | Array<Function> | null;
  default: any;
  required: boolean;
  validator: Function;
}
