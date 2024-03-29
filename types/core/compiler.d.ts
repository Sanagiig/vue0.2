declare type CompilerOptions = {
  warn?: Function; // allow customizing warning in different environments; e.g. node
  modules?: ModuleOptions[]; // platform specific modules; e.g. style; class
  directives?: { [key: string]: Function }; // platform specific directives
  staticKeys?: string; // a list of AST properties to be considered static; for optimization
  isUnaryTag?: (tag: string) => boolean | void; // check if a tag is unary for the platform
  canBeLeftOpenTag?: (tag: string) => boolean | void; // check if a tag can be left opened
  isReservedTag?: (tag: string) => boolean | void; // check if a tag is a native for the platform
  preserveWhitespace?: boolean | void; // preserve whitespace between elements? (Deprecated)
  whitespace?: 'preserve' | 'condense' | void; // whitespace handling strategy
  optimize?: boolean | void; // optimize static content?

  // web specific
  mustUseProp?: (tag: string, type: string, name: string) => boolean; // check if an attribute should be bound as a property
  isPreTag?: (attr: string) => boolean; // check if a tag needs to preserve whitespace
  getTagNamespace?: (tag: string) => string | void; // check the namespace for a tag
  expectHTML?: boolean; // only false for non-web builds
  isFromDOM?: boolean;
  shouldDecodeTags?: boolean;
  shouldDecodeNewlines?: boolean;
  shouldDecodeNewlinesForHref?: boolean;
  outputSourceRange?: boolean;

  // runtime user-configurable
  delimiters?: [string, string]; // template delimiters
  comments?: boolean; // preserve comments in template

  // for ssr optimization compiler
  scopeId?: string;
};

declare type parseHTMLOptions = {
  warn: Function;
  expectHTML?: boolean;
  isUnaryTag?: (tag: string) => boolean | void;
  canBeLeftOpenTag: Function;
  shouldDecodeNewlines?: boolean;
  shouldDecodeNewlinesForHref?: boolean;
  shouldKeepComment?: boolean;
  outputSourceRange?: boolean;
  start: (tag, attrs, unary, start,end) => void;
  end: (tag, start, end) => void;
  chars: (text: string, start?: number, end?: number) => void;
  comment: (text: string, start, end) => void;
}

declare type WarningMessage = {
  msg: string;
  start?: number;
  end?: number;
};

declare type CompiledResult = {
  ast: ASTElement;
  render: string;
  staticRenderFns: Array<string>;
  stringRenderFns?: Array<string>;
  errors?: Array<string | WarningMessage>;
  tips?: Array<string | WarningMessage>;
};

declare type CompiledToFnResult = {
  render: Function;
  staticRenderFns: Function[];
}

declare type ModuleOptions = {
  // transform an AST node before any attributes are processed
  // returning an ASTElement from pre/transforms replaces the element
  preTransformNode?: (el: ASTElement) => ASTElement;
  // transform an AST node after built-ins like v-if, v-for are processed
  transformNode?: (el: ASTElement) => ASTElement;
  // transform an AST node after its children have been processed
  // cannot return replacement in postTransform because tree is already finalized
  postTransformNode?: (el: ASTElement) => void;
  genData?: (el: ASTElement) => string; // generate extra data string for an element
  transformCode?: (el: ASTElement, code: string) => string; // further transform generated code for an element
  staticKeys?: Array<string>; // AST properties to be considered static
};

declare type ASTModifiers = { [key: string]: boolean };
declare type ASTIfCondition = { exp: string; block: ASTElement };
declare type ASTIfConditions = Array<ASTIfCondition>;
declare type ASTAttr = { name: string; value: any; start?: number; end?: number };

declare type ASTElementHandler = {
  value: string;
  params?: Array<any>;
  modifiers: ASTModifiers;
  start?: number;
  end?: number;
};

declare type ASTElementHandlers = {
  [key: string]: ASTElementHandler | Array<ASTElementHandler>;
};

declare type ASTDirective = {
  name: string;
  rawName: string;
  value: string;
  arg: string;
  modifiers: ASTModifiers;
  start?: number;
  end?: number;
};

declare type ASTNode = ASTElement | ASTText | ASTExpression

declare type ASTElement = {
  type: 1;
  tag: string;
  attrsList: Array<ASTAttr>;
  attrsMap: { [key: string]: any };
  rawAttrsMap: { [key: string]: ASTAttr };
  parent: ASTElement | void;
  children: Array<ASTNode>;
  start?: number;
  end?: number;

  processed?: true;

  static?: boolean;
  staticRoot?: boolean;
  staticInFor?: boolean;
  staticProcessed?: boolean;
  // 有指令属性
  hasBindings?: boolean;

  text?: string;
  attrs?: Array<ASTAttr>;
  props?: Array<ASTAttr>;
  plain?: boolean;
  pre?: true;
  ns?: string;

  component?: string;
  inlineTemplate?: true;
  transitionMode?: string | null;
  slotName?: string;
  // 标签中 slot 属性
  slotTarget?: string;
  // <template> scope 或 slot-scope 属性
  // name = el.slotTarget 挂载到  parent.scopedSlots[name] = el;
  slotScope?: string;
  // 如果子节点存在 $slot 则存在改属性 ， 
  // 其 name 为 slotTarget , val 为一个空的 template 
  // parent = curEle , children = group, slotScope = $slot
  scopedSlots?: { [name: string]: ASTElement };

  ref?: string;
  refInFor?: boolean;

  if?: string;
  ifProcessed?: boolean;
  elseif?: string;
  else?: true;
  ifConditions?: ASTIfConditions;

  for?: string;
  forProcessed?: boolean;
  key?: string;
  alias?: string;
  iterator1?: string;
  iterator2?: string;

  staticClass?: string;
  classBinding?: string;
  staticStyle?: string;
  styleBinding?: string;
  events?: ASTElementHandlers;
  nativeEvents?: ASTElementHandlers;

  transition?: string | true;
  transitionOnAppear?: boolean;

  model?: {
    value: string;
    callback: string;
    expression: string;
  };

  directives?: Array<ASTDirective>;

  forbidden?: true;
  once?: true;
  onceProcessed?: boolean;
  wrapData?: (code: string) => string;
  // 当前 v-on = obj
  wrapListeners?: (code: string) => string;

  // 2.4 ssr optimization
  ssrOptimizability?: number;

  // weex specific
  appendAsTree?: boolean;

  // 2.6 $slot check
  has$Slot?: boolean
};

declare type ASTExpression = {
  type: 2;
  expression: string;
  text: string;
  tokens: Array<string | Object>;
  static?: boolean;
  // 2.4 ssr optimization
  ssrOptimizability?: number;
  start?: number;
  end?: number;
  // 2.6 $slot check
  has$Slot?: boolean
};

declare type ASTText = {
  type: 3;
  text: string;
  static?: boolean;
  isComment?: boolean;
  // 2.4 ssr optimization
  ssrOptimizability?: number;
  start?: number;
  end?: number;
  // 2.6 $slot check
  has$Slot?: boolean
};

declare type TagAttr = RegExpMatchArray & {
  start: number;
  end: number;
}

declare type StartTagMatch = {
  tagName: string;
  attrs: TagAttr[];
  start: number;
  end: number;
  unarySlash?:boolean;
}

// SFC-parser related declarations

// an object format describing a single-file component
declare type SFCDescriptor = {
  template: SFCBlock;
  script: SFCBlock;
  styles: Array<SFCBlock>;
  customBlocks: Array<SFCBlock>;
  errors: Array<string | WarningMessage>;
}

declare type SFCBlock = {
  type: string;
  content: string;
  attrs: { [attribute: string]: string };
  start?: number;
  end?: number;
  lang?: string;
  src?: string;
  scoped?: boolean;
  module?: string | boolean;
};

// 编译fn
type CompileFn = (template: string, options?: CompilerOptions) => CompiledResult;
// 编译fn 转 render fn
type CompileFnToRender = (compile: CompileFn) => Function;
declare type CreateCompilerResult = {
  compile: CompileFn,
  compileToFunctions: CompileFnToRender
}