declare type ValueOf<T> = T[keyof T];

declare type NoopFn = (a?: any, b?: any, c?: any) => any;

declare type ExtendFn =
  (to: { [key: string]: any }, from: { [key: string]: any }) => { [key: string]: any };

declare type MergeOptionsFn = (
  parent: ComponentOptions,
  child: ComponentOptions,
  vm?: Component
) => ComponentOptions;

declare type DefineReactiveFn = (
  obj: Object,
  key: string,
  val: any,
  customSetter?: Function,
  shallow?: boolean
) => any;

declare interface SimpleSet {
  has(key: string | number): boolean;
  add(key: string | number): any;
  clear(): void;
}

// option.render
declare type OptionRender = {
  (h: () => VNodeInstance, c?: any): VNodeInstance;
  // 判断 proxy 处理 get 还是 has
  _withStripped:any;
}