(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
  typeof define === 'function' && define.amd ? define(factory) :
  (global = typeof globalThis !== 'undefined' ? globalThis : global || self, global.Vvue = factory());
}(this, (function () { 'use strict';

  // xml
  var ASSET_TYPES = [
      'component',
      'directive',
      'filter'
  ];
  var LIFECYCLE_HOOKS = [
      'beforeCreate',
      'created',
      'beforeMount',
      'mounted',
      'beforeUpdate',
      'updated',
      'beforeDestroy',
      'destroyed',
      'activated',
      'deactivated',
      'errorCaptured',
      'ssrPrefetch'
  ];
  var config = {
    /**
    * Option merge strategies (used in core/util/options)
    */
    // $flow-disable-line
    optionMergeStrategies: {},
    /**
     * Whether to suppress warnings.
     */
    silent: false,
    /**
     * Warn handler for watcher warns
     */
    warnHandler: undefined,
    /**
     * Whether to enable devtools
     */
    devtools: undefined !== 'production',
    /**
     * Perform updates asynchronously. Intended to be used by Vue Test Utils
     * This will significantly reduce performance if set to false.
     */
    async: false,
    /**
     * Check if a tag is reserved so that it cannot be registered as a
     * component. This is platform-dependent and may be overwritten.
     */
    isReservedTag: no,
    /**
     * Check if a tag is an unknown element.
     * Platform-dependent.
     */
    isUnknownElement: no,
    /**
     * Check if an attribute is reserved so that it cannot be used as a component
     * prop. This is platform-dependent and may be overwritten.
     */
    isReservedAttr: no,
    /**
     * Ignore certain custom elements
     */
    ignoredElements: [],
    /**
     * Get the namespace of an element
     */
    getTagNamespace: noop,
    /**
     * Parse the real tag name for the specific platform.
     */
    parsePlatformTagName: identity,
    /**
     * Show production mode tip message on boot?
     */
    productionTip: false,
    /**
   * Error handler for watcher errors
   */
    errorHandler: null,
    /**
     * Whether to record perf
     */
    performance: false,
    /**
     * Check if an attribute must be bound using property, e.g. value
     * Platform-dependent.
     */
    mustUseProp: no,
    /**
     * Custom user key aliases for v-on
     */
    // $flow-disable-line
    keyCodes: Object.create(null),
    /**
     * Exposed for legacy reasons
     */
    _lifecycleHooks: LIFECYCLE_HOOKS
};
  var warn = noop;
  var tip = noop;
  var generateComponentTrace = (noop); // work around flow check
  var formatComponentName = (noop);
  {
      var hasConsole_1 = typeof console !== 'undefined';
      var classifyRE_1 = /(?:^|[-_])(\w)/g;
      // a-a_a => AAA
      var classify_1 = function (str) { return str
          .replace(classifyRE_1, function (c) { return c.toUpperCase(); })
          .replace(/[-_]/g, ''); };
      warn = function (msg, vm) {
          var trace = vm ? generateComponentTrace(vm) : '';
          if (config.warnHandler) {
              config.warnHandler.call(null, msg, vm, trace);
          }
          else if (hasConsole_1 && (!config.silent)) {
              console.error("[Vue warn]: " + msg + trace);
          }
      };
      tip = function (msg, vm) {
          if (hasConsole_1 && (!config.silent)) {
              console.warn("[Vue tip]: " + msg + (vm ? generateComponentTrace(vm) : ''));
          }
      };
      formatComponentName = function (vm, includeFile) {
          if (vm.$root === vm) {
              return '<Root>';
          }
          var options = (typeof vm === 'function' && vm.cid != null
              ? vm.options
              : vm._isVue
                  ? vm.$options || vm.constructor.options
                  : vm);
          var name = options.name || options._componentTag;
          var file = options.__file;
          if (!name && file) {
              var match = file.match(/([^/\\]+)\.vue$/);
              name = match && match[1];
          }
          return ((name ? "<" + classify_1(name) + ">" : "<Anonymous>") +
              (file && includeFile !== false ? " at " + file : ''));
      };
      var repeat_1 = function (str, n) {
          var res = '';
          while (n) {
              if (n % 2 === 1)
                  res += str;
              if (n > 1)
                  str += str;
              n >>= 1;
          }
          return res;
      };
      generateComponentTrace = function (vm) {
          if (vm._isVue && vm.$parent) {
              var tree = [];
              var currentRecursiveSequence = 0;
              // 将 vm.constructor 与 vm.$parent.constructor 做对比，记录连续出现次数
              while (vm) {
                  if (tree.length > 0) {
                      var last = tree[tree.length - 1];
                      if (last.constructor === vm.constructor) {
                          currentRecursiveSequence++;
                          vm = vm.$parent;
                          continue;
                      }
                      else if (currentRecursiveSequence > 0) {
                          tree[tree.length - 1] = [last, currentRecursiveSequence];
                          currentRecursiveSequence = 0;
                      }
                  }
                  tree.push(vm);
                  vm = vm.$parent;
              }
              return '\n\nfound in\n\n' + tree
                  .map(function (vm, i) { return "" + (i === 0 ? '---> ' : repeat_1(' ', 5 + i * 2)) + (Array.isArray(vm)
                  ? formatComponentName(vm[0]) + "... (" + vm[1] + " recursive calls)"
                  : formatComponentName(vm)); })
                  .join('\n');
          }
          else {
              return "\n\n(found in " + formatComponentName(vm) + ")";
          }
      };
  }

  var VNode = /** @class */ (function () {
      function VNode(tag, data, children, text, elm, context, componentOptions, asyncFactory) {
          this.tag = tag;
          this.data = data;
          this.children = children;
          this.text = text;
          this.elm = elm;
          this.ns = undefined;
          this.context = context;
          this.fnContext = undefined;
          this.fnOptions = undefined;
          this.fnScopeId = undefined;
          this.key = data && data.key;
          this.componentOptions = componentOptions;
          this.componentInstance = undefined;
          this.parent = undefined;
          this.raw = false;
          this.isStatic = false;
          this.isRootInsert = true;
          this.isComment = false;
          this.isCloned = false;
          this.isOnce = false;
          this.asyncFactory = asyncFactory;
          this.asyncMeta = undefined;
          this.isAsyncPlaceholder = false;
      }
      Object.defineProperty(VNode.prototype, "child", {
          // DEPRECATED: alias for componentInstance for backwards compat.
          /* istanbul ignore next */
          get: function () {
              return this.componentInstance;
          },
          enumerable: false,
          configurable: true
      });
      return VNode;
  }());
  // 创建空白vnode (comment)
  var createEmptyVNode = function (text) {
      if (text === void 0) { text = ''; }
      var node = new VNode();
      node.text = text;
      node.isComment = true;
      return node;
  };

  var emptyNode = new VNode("", {}, []);
  /**
   * Perform no operation.
   * Stubbing args to make Flow happy without leaving useless transpiled code
   * with ...rest (https://flow.org/blog/2017/05/07/Strict-Function-Call-Arity/).
   */
  function noop(a, b, c) { }
  /**
   * Always return false.
   */
  var no = function (a, b, c) { return false; };
  /**
   * Return the same value.
   */
  var identity = function (_) { return _; };
  /**
   * Define a property.
   */
  function def(obj, key, val, enumerable) {
      Object.defineProperty(obj, key, {
          value: val,
          enumerable: !!enumerable,
          writable: true,
          configurable: true
      });
  }
  function remove(arr, item) {
      if (arr.length) {
          var index = arr.indexOf(item);
          if (index > -1) {
              return arr.splice(index, 1);
          }
      }
  }
  /**
   * Create a cached version of a pure function.
   */
  function cached(fn) {
      var cache = Object.create(null);
      var cachedFn = function (str) {
          var hit = cache[str];
          return hit || (cache[str] = fn(str));
      };
      return cachedFn;
  }
  /**
   * Query an element selector if it's not an element already.
   */
  function query(el) {
      if (typeof el === 'string') {
          var selected = document.querySelector(el);
          if (!selected) {
               warn('Cannot find element: ' + el);
              return document.createElement('div');
          }
          return selected;
      }
      else {
          return el;
      }
  }
  /**
   * Get outerHTML of elements, taking care
   * of SVG elements in IE as well.
   */
  function getOuterHTML(el) {
      if (el.outerHTML) {
          return el.outerHTML;
      }
      else {
          var container = document.createElement('div');
          container.appendChild(el.cloneNode(true));
          return container.innerHTML;
      }
  }
  /**
   * Generate a string containing static keys from compiler modules.
   */
  function genStaticKeys(modules) {
      return modules.reduce(function (keys, m) {
          return keys.concat(m.staticKeys || []);
      }, []).join(',');
  }
  /* istanbul ignore next */
  function polyfillBind(fn, ctx) {
      function boundFn(a) {
          var l = arguments.length;
          return l
              ? l > 1
                  ? fn.apply(ctx, arguments)
                  : fn.call(ctx, a)
              : fn.call(ctx);
      }
      boundFn._length = fn.length;
      return boundFn;
  }
  function nativeBind(fn, ctx) {
      return fn.bind(ctx);
  }
  var bind = !!Function.prototype.bind
      ? nativeBind
      : polyfillBind;

  /**
   * Get the raw type string of a value, e.g., [object Object].
   */
  var _toString = Object.prototype.toString;
  function toRawType(value) {
      return _toString.call(value).slice(8, -1);
  }
  /**
   * Convert an Array-like object to a real Array.
   */
  function toArray(list, start) {
      start = start || 0;
      var i = list.length - start;
      var ret = new Array(i);
      while (i--) {
          ret[i] = list[i + start];
      }
      return ret;
  }
  /**
   * Camelize a hyphen-delimited string.
   */
  var camelizeRE = /-(\w)/g;
  var camelize = cached(function (str) {
      return str.replace(camelizeRE, function (_, c) { return c ? c.toUpperCase() : ''; });
  });
  /**
   * Hyphenate a camelCase string.
   */
  var hyphenateRE = /\B([A-Z])/g;
  var hyphenate = cached(function (str) {
      return str.replace(hyphenateRE, '-$1').toLowerCase();
  });
  /**
   * Make a map and return a function for checking if a key
   * is in that map.
   */
  function makeMap(str, expectsLowerCase) {
      var map = Object.create(null);
      var list = str.split(',');
      for (var i = 0; i < list.length; i++) {
          map[list[i]] = true;
      }
      return expectsLowerCase
          ? function (val) { return map[val.toLowerCase()]; }
          : function (val) { return map[val]; };
  }

  /**
   * Get the raw type string of a value, e.g., [object Object].
   */
  var _toString$1 = Object.prototype.toString;
  // Browser environment sniffing
  var inBrowser = typeof window !== 'undefined';
  var UA = inBrowser && window.navigator.userAgent.toLowerCase();
  var inWeex = false; // typeof WXEnvironment !== 'undefined' && !!WXEnvironment.platform
  var isIE = UA && /msie|trident/.test(UA);
  var isIE9 = UA && UA.indexOf('msie 9.0') > 0;
  var isEdge = UA && UA.indexOf('edge/') > 0;
  var isChrome = UA && /chrome\/\d+/.test(UA) && !isEdge;
  function isNative(Ctor) {
      return typeof Ctor === 'function' && /native code/.test(Ctor.toString());
  }
  function isDef(v) {
      return v !== undefined && v !== null;
  }
  /**
   * Strict object type check. Only returns true
   * for plain JavaScript objects.
   */
  function isPlainObject(obj) {
      return _toString$1.call(obj) === '[object Object]';
  }
  /**
   * Quick object check - this is primarily used to tell
   * Objects from primitive values when we know the value
   * is a JSON-compliant type.
   */
  function isObject(obj) {
      return obj !== null && typeof obj === 'object';
  }
  function isPromise(val) {
      return (isDef(val) &&
          typeof val.then === 'function' &&
          typeof val.catch === 'function');
  }
  /**
   * Check whether an object has the property.
   */
  var hasOwnProperty = Object.prototype.hasOwnProperty;
  function hasOwn(obj, key) {
      return hasOwnProperty.call(obj, key);
  }
  /**
   * Check if a tag is a built-in tag.
   */
  var isBuiltInTag = makeMap('slot,component', true);
  var isPreTag = function (tag) { return tag === 'pre'; };
  var isBooleanAttr = makeMap('allowfullscreen,async,autofocus,autoplay,checked,compact,controls,declare,' +
      'default,defaultchecked,defaultmuted,defaultselected,defer,disabled,' +
      'enabled,formnovalidate,hidden,indeterminate,inert,ismap,itemscope,loop,multiple,' +
      'muted,nohref,noresize,noshade,novalidate,nowrap,open,pauseonexit,readonly,' +
      'required,reversed,scoped,seamless,selected,sortable,translate,' +
      'truespeed,typemustmatch,visible');
  var isUnaryTag = makeMap('area,base,br,col,embed,frame,hr,img,input,isindex,keygen,' +
      'link,meta,param,source,track,wbr');
  // Elements that you can, intentionally, leave open
  // (and which close themselves)
  var canBeLeftOpenTag = makeMap('colgroup,dd,dt,li,options,p,td,tfoot,th,thead,tr,source');
  // HTML5 tags https://html.spec.whatwg.org/multipage/indices.html#elements-3
  // Phrasing Content https://html.spec.whatwg.org/multipage/dom.html#phrasing-content
  var isNonPhrasingTag = makeMap('address,article,aside,base,blockquote,body,caption,col,colgroup,dd,' +
      'details,dialog,div,dl,dt,fieldset,figcaption,figure,footer,form,' +
      'h1,h2,h3,h4,h5,h6,head,header,hgroup,hr,html,legend,li,menuitem,meta,' +
      'optgroup,option,param,rp,rt,source,style,summary,tbody,td,tfoot,th,thead,' +
      'title,tr,track');
  var isHTMLTag = makeMap('html,body,base,head,link,meta,style,title,' +
      'address,article,aside,footer,header,h1,h2,h3,h4,h5,h6,hgroup,nav,section,' +
      'div,dd,dl,dt,figcaption,figure,picture,hr,img,li,main,ol,p,pre,ul,' +
      'a,b,abbr,bdi,bdo,br,cite,code,data,dfn,em,i,kbd,mark,q,rp,rt,rtc,ruby,' +
      's,samp,small,span,strong,sub,sup,time,u,var,wbr,area,audio,map,track,video,' +
      'embed,object,param,source,canvas,script,noscript,del,ins,' +
      'caption,col,colgroup,table,thead,tbody,td,th,tr,' +
      'button,datalist,fieldset,form,input,label,legend,meter,optgroup,option,' +
      'output,progress,select,textarea,' +
      'details,dialog,menu,menuitem,summary,' +
      'content,element,shadow,template,blockquote,iframe,tfoot');
  // this map is intentionally selective, only covering SVG elements that may
  // contain child elements.
  var isSVG = makeMap('svg,animate,circle,clippath,cursor,defs,desc,ellipse,filter,font-face,' +
      'foreignObject,g,glyph,image,line,marker,mask,missing-glyph,path,pattern,' +
      'polygon,polyline,rect,switch,symbol,text,textpath,tspan,use,view', true);
  /**
   * Check if a string starts with $ or _
   */
  function isReserved(str) {
      var c = (str + '').charCodeAt(0);
      return c === 0x24 || c === 0x5F;
  }
  var isReservedTag = function (tag) {
      return isHTMLTag(tag) || isSVG(tag);
  };
  // these are reserved for web because they are directly compiled away
  // during template compilation
  var isReservedAttr = makeMap('style,class');
  /**
   * Check if an attribute is a reserved attribute.
   */
  var isReservedAttribute = makeMap('key,ref,slot,slot-scope,is');
  // svg && math
  function getTagNamespace(tag) {
      if (isSVG(tag)) {
          return 'svg';
      }
      // basic support for MathML
      // note it doesn't support other MathML elements being component roots
      if (tag === 'math') {
          return 'math';
      }
  }
  var unknownElementCache = Object.create(null);
  /**
   * 通过保留 tag 以及 该tagName 创建的element 判断是否未知 tag
   */
  function isUnknownElement(tag) {
      /* istanbul ignore if */
      if (!inBrowser) {
          return true;
      }
      if (isReservedTag(tag)) {
          return false;
      }
      tag = tag.toLowerCase();
      /* istanbul ignore if */
      if (unknownElementCache[tag] != null) {
          return unknownElementCache[tag];
      }
      var el = document.createElement(tag);
      if (tag.indexOf('-') > -1) {
          // http://stackoverflow.com/a/28210364/1070244
          return (unknownElementCache[tag] = (el.constructor === window.HTMLUnknownElement ||
              el.constructor === window.HTMLElement));
      }
      else {
          return (unknownElementCache[tag] = /HTMLUnknownElement/.test(el.toString()));
      }
  }
  var isTextInputType = makeMap('text,number,password,search,email,tel,url');
  var hasSymbol = typeof Symbol !== 'undefined' && isNative(Symbol) &&
      typeof Reflect !== 'undefined' && isNative(Reflect.ownKeys);
  // detect devtools
  var devtools = inBrowser && window.__VUE_DEVTOOLS_GLOBAL_HOOK__;
  // Firefox has a "watch" function on Object.prototype...
  var nativeWatch = {}.watch;
  var emptyObject = Object.freeze({});
  // can we use __proto__?
  var hasProto = '__proto__' in {};
  // this needs to be lazy-evaled because vue may be required before
  // vue-server-renderer can set VUE_ENV
  var _isServer;
  var isServerRendering = function () {
      if (_isServer === undefined) {
          /* istanbul ignore if */
          if (!inBrowser && !inWeex && typeof global !== 'undefined') {
              // detect presence of vue-server-renderer and avoid
              // Webpack shimming the process
              _isServer = global['process'] && global['process'].env.VUE_ENV === 'server';
          }
          else {
              _isServer = false;
          }
      }
      return _isServer;
  };
  var isEnumeratedAttr = makeMap('contenteditable,draggable,spellcheck');
  // check whether current browser encodes a char inside attribute values
  var div;
  function getShouldDecode(href) {
      div = div || document.createElement('div');
      div.innerHTML = href ? "<a href=\"\n\"/>" : "<div a=\"\n\"/>";
      return div.innerHTML.indexOf('&#10;') > 0;
  }
  // #3663: IE encodes newlines inside attribute values while other browsers don't
  var shouldDecodeNewlines = inBrowser ? getShouldDecode(false) : false;
  // #6828: chrome encodes content in a[href]
  var shouldDecodeNewlinesForHref = inBrowser ? getShouldDecode(true) : false;
  // attributes that should be using props for binding
  var acceptValue = makeMap('input,textarea,option,select,progress');
  var mustUseProp = function (tag, type, attr) {
      return ((attr === 'value' && acceptValue(tag)) && type !== 'button' ||
          (attr === 'selected' && tag === 'option') ||
          (attr === 'checked' && tag === 'input') ||
          (attr === 'muted' && tag === 'video'));
  };

  /**
   * Mix properties into target object.
   */
  function extend(to, from) {
      for (var key in from) {
          to[key] = from[key];
      }
      return to;
  }

  // 向上使用 $options.errorCaptured 报错，如果有则 globalHandleError
  function handleError(err, vm, info) {
      if (vm) {
          var cur = vm;
          while ((cur = cur.$parent)) {
              var hooks = cur.$options.errorCaptured;
              if (hooks) {
                  for (var i = 0; i < hooks.length; i++) {
                      try {
                          var capture = hooks[i].call(cur, err, vm, info) === false;
                          if (capture)
                              return;
                      }
                      catch (e) {
                          globalHandleError(e, cur, 'errorCaptured hook');
                      }
                  }
              }
          }
      }
  }
  function invokeWithErrorHandling(handler, context, args, vm, info) {
      var res;
      try {
          res = args ? handler.apply(context, args) : handler.call(context);
          if (isPromise(res)) {
              res.catch(function (e) { return handleError(e, vm, info + " (Promise/async)"); });
          }
      }
      catch (e) {
          handleError(e, vm, info);
      }
      return res;
  }
  // 使用 config.errorHandler 打印错误
  function globalHandleError(err, vm, info) {
      if (config.errorHandler) {
          try {
              return config.errorHandler.call(null, err, vm, info);
          }
          catch (e) {
              logError(e, null, 'config.errorHandler');
          }
      }
      logError(err, vm, info);
  }
  // warn || console.error
  function logError(err, vm, info) {
      {
          warn("Error in " + info + ": \"" + err.toString() + "\"", vm);
      }
      /* istanbul ignore else */
      if ((inBrowser || inWeex) && typeof console !== 'undefined') {
          console.error(err);
      }
      else {
          throw err;
      }
  }

  var callbacks = [];
  var pending = false;
  // Here we have async deferring wrappers using microtasks.
  // In 2.5 we used (macro) tasks (in combination with microtasks).
  // However, it has subtle problems when state is changed right before repaint
  // (e.g. #6813, out-in transitions).
  // Also, using (macro) tasks in event handler would cause some weird behaviors
  // that cannot be circumvented (e.g. #7109, #7153, #7546, #7834, #8109).
  // So we now use microtasks everywhere, again.
  // A major drawback of this tradeoff is that there are some scenarios
  // where microtasks have too high a priority and fire in between supposedly
  // sequential events (e.g. #4521, #6690, which have workarounds)
  // or even between bubbling of the same event (#6566).
  var timerFunc;
  function flushCallbacks() {
      pending = false;
      var copies = callbacks.slice(0);
      callbacks.length = 0;
      for (var i = 0; i < copies.length; i++) {
          copies[i]();
      }
  }
  // The nextTick behavior leverages the microtask queue, which can be accessed
  // via either native Promise.then or MutationObserver.
  // MutationObserver has wider support, however it is seriously bugged in
  // UIWebView in iOS >= 9.3.3 when triggered in touch event handlers. It
  // completely stops working after triggering a few times... so, if native
  // Promise is available, we will use it:
  /* istanbul ignore next, $flow-disable-line */
  if (typeof Promise !== 'undefined' && isNative(Promise)) {
      var p_1 = Promise.resolve();
      timerFunc = function () {
          p_1.then(flushCallbacks);
      };
  }
  else if (!isIE && typeof MutationObserver !== 'undefined' && (isNative(MutationObserver) ||
      // PhantomJS and iOS 7.x
      MutationObserver.toString() === '[object MutationObserverConstructor]')) {
      // Use MutationObserver where native Promise is not available,
      // e.g. PhantomJS, iOS7, Android 4.4
      // (#6466 MutationObserver is unreliable in IE11)
      var counter_1 = 1;
      var observer = new MutationObserver(flushCallbacks);
      var textNode_1 = document.createTextNode(String(counter_1));
      observer.observe(textNode_1, {
          characterData: true
      });
      timerFunc = function () {
          counter_1 = (counter_1 + 1) % 2;
          textNode_1.data = String(counter_1);
      };
  }
  else if (typeof setImmediate !== 'undefined' && isNative(setImmediate)) {
      // Fallback to setImmediate.
      // Techinically it leverages the (macro) task queue,
      // but it is still a better choice than setTimeout.
      timerFunc = function () {
          setImmediate(flushCallbacks);
      };
  }
  else {
      // Fallback to setTimeout.
      timerFunc = function () {
          setTimeout(flushCallbacks, 0);
      };
  }
  function nextTick(cb, ctx) {
      callbacks.push(function () {
          if (cb) {
              try {
                  cb.call(ctx);
              }
              catch (e) {
                  handleError(e, ctx, 'nextTick');
              }
          }
      });
      if (!pending) {
          pending = true;
          timerFunc();
      }
  }

  /**
   * unicode letters used for parsing html tags, component names and property paths.
   * using https://www.w3.org/TR/html53/semantics-scripting.html#potentialcustomelementname
   * skipping \u10000-\uEFFFF due to it freezing up PhantomJS
   */
  var unicodeLetters = 'a-zA-Z\u00B7\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u037D\u037F-\u1FFF\u200C-\u200D\u203F-\u2040\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD';

  /**
   * Option overwriting strategies are functions that handle
   * how to merge a parent option value and a child option
   * value into the final value.
   */
  var strats = config.optionMergeStrategies;
  /**
   * Validate component names
   */
  function checkComponents(options) {
      for (var key in options.components) {
          validateComponentName(key);
      }
  }
  /**
   * Ensure all props option syntax are normalized into the
   * Object-based format.
   */
  function normalizeProps(options, vm) {
      var props = options.props;
      var res = {};
      if (!props)
          return;
      var i, val, name;
      // props:['key'] => props:{key:{type:null}}
      if (Array.isArray(props)) {
          i = props.length;
          while (i--) {
              val = props[i];
              if (typeof val === 'string') {
                  name = camelize(val);
                  res[name] = { type: null };
              }
              else {
                  warn('props must be strings when using array syntax.');
              }
          }
          // props:{key:Type} => props:{key:{type:val}} | props:{key:val}
      }
      else if (isPlainObject(props)) {
          for (var key in props) {
              val = props[key];
              name = camelize(key);
              res[name] = isPlainObject(val)
                  ? val
                  : { type: val };
          }
      }
      else {
          warn("Invalid value for option \"props\": expected an Array or an Object, " +
              ("but got " + toRawType(props) + "."), vm);
      }
      options.props = res;
  }
  /**
   * Normalize all injections into Object-based format
   */
  function normalizeInject(options, vm) {
      var inject = options.inject;
      var normalized = options.inject = {};
      if (!inject)
          return;
      // inject:[key] => inject:{key:{from:key}}
      if (Array.isArray(inject)) {
          for (var i = 0; i < inject.length; i++) {
              normalized[inject[i]] = { from: inject[i] };
          }
          // inject:{key:val} => inject:{key:{from:val}} | inject:{key:{from:key} & val}
      }
      else if (isPlainObject(inject)) {
          for (var key in inject) {
              var val = inject[key];
              normalized[key] = isPlainObject(val)
                  ? extend({ from: key }, val)
                  : { from: val };
          }
      }
      else {
          warn("Invalid value for option \"inject\": expected an Array or an Object, " +
              ("but got " + toRawType(inject) + "."), vm);
      }
  }
  /**
   * Normalize raw function directives into object format.
   */
  function normalizeDirectives(options, vm) {
      var dirs = options.directives;
      if (dirs) {
          for (var key in dirs) {
              var def = dirs[key];
              if (typeof def === 'function') {
                  dirs[key] = { bind: def, update: def };
              }
          }
      }
  }
  /**
   * Default strategy.
   */
  var defaultStrat = function (parentVal, childVal, vm, key) {
      return childVal === undefined
          ? parentVal
          : childVal;
  };
  /**
   * Merge two option objects into a new one.
   * Core utility used in both instantiation and inheritance.
   * 会对非 Vue.extend 过的 options 的 extends && mixins 进行 merge
   */
  function mergeOptions(parent, child, vm) {
      {
          checkComponents(child);
      }
      if (typeof child === 'function') {
          child = child.options;
      }
      normalizeProps(child, vm);
      normalizeInject(child, vm);
      normalizeDirectives(child);
      // Apply extends and mixins on the child options,
      // but only if it is a raw options object that isn't
      // the result of another mergeOptions call.
      // Only merged options has the _base property.
      if (!child._base) {
          if (child.extends) {
              parent = mergeOptions(parent, child.extends, vm);
          }
          if (child.mixins) {
              for (var i = 0, l = child.mixins.length; i < l; i++) {
                  parent = mergeOptions(parent, child.mixins[i], vm);
              }
          }
      }
      var options = {};
      var key;
      for (key in parent) {
          mergeField(key);
      }
      for (key in child) {
          if (!hasOwn(parent, key)) {
              mergeField(key);
          }
      }
      function mergeField(key) {
          var strat = strats[key] || defaultStrat;
          options[key] = strat(parent[key], child[key], vm, key);
      }
      return options;
  }
  function validateComponentName(name) {
      if (!new RegExp("^[a-zA-Z][\\-\\.0-9_" + unicodeLetters + "]*$").test(name)) {
          warn('Invalid component name: "' + name + '". Component names ' +
              'should conform to valid custom element name in html5 specification.');
      }
      if (isBuiltInTag(name) || config.isReservedTag(name)) {
          warn('Do not use built-in or reserved HTML elements as component ' +
              'id: ' + name);
      }
  }

  function validateProp(key, propOptions, propsData, vm) {
  }

  /**
   * Parse simple path.
   */
  var bailRE = new RegExp("[^" + unicodeLetters + ".$_\\d]");
  function parsePath(path) {
      if (bailRE.test(path)) {
          return;
      }
      var segments = path.split('.');
      return function (obj) {
          for (var i = 0; i < segments.length; i++) {
              if (!obj)
                  return;
              obj = obj[segments[i]];
          }
          return obj;
      };
  }

  

  var initProxy;
  {
      var allowedGlobals_1 = makeMap('Infinity,undefined,NaN,isFinite,isNaN,' +
          'parseFloat,parseInt,decodeURI,decodeURIComponent,encodeURI,encodeURIComponent,' +
          'Math,Number,Date,Array,Object,Boolean,String,RegExp,Map,Set,JSON,Intl,' +
          'require' // for Webpack/Browserify
      );
      var warnNonPresent_1 = function (target, key) {
          warn("Property or method \"" + key + "\" is not defined on the instance but " +
              'referenced during render. Make sure that this property is reactive, ' +
              'either in the data option, or for class-based components, by ' +
              'initializing the property. ' +
              'See: https://vuejs.org/v2/guide/reactivity.html#Declaring-Reactive-Properties.', target);
      };
      var warnReservedPrefix_1 = function (target, key) {
          warn("Property \"" + key + "\" must be accessed with \"$data." + key + "\" because " +
              'properties starting with "$" or "_" are not proxied in the Vue instance to ' +
              'prevent conflicts with Vue internals' +
              'See: https://vuejs.org/v2/api/#data', target);
      };
      var hasProxy_1 = typeof Proxy !== 'undefined' && isNative(Proxy);
      // 禁止设置 Vue 内置键盘事件修饰符 (config.keyCodes)
      if (hasProxy_1) {
          var isBuiltInModifier_1 = makeMap('stop,prevent,self,ctrl,shift,alt,meta,exact');
          config.keyCodes = new Proxy(config.keyCodes, {
              set: function (target, key, value) {
                  if (isBuiltInModifier_1(key)) {
                      warn("Avoid overwriting built-in modifier in config.keyCodes: ." + key);
                      return false;
                  }
                  else {
                      target[key] = value;
                      return true;
                  }
              }
          });
      }
      var hasHandler_1 = {
          has: function (target, key) {
              var has = key in target;
              var isAllowed = allowedGlobals_1(key) ||
                  (typeof key === 'string' && key.charAt(0) === '_' && !(key in target.$data));
              if (!has && !isAllowed) {
                  if (key in target.$data)
                      warnReservedPrefix_1(target, key);
                  else
                      warnNonPresent_1(target, key);
              }
              return has || !isAllowed;
          }
      };
      var getHandler_1 = {
          get: function (target, key) {
              if (typeof key === 'string' && !(key in target)) {
                  if (key in target.$data)
                      warnReservedPrefix_1(target, key);
                  else
                      warnNonPresent_1(target, key);
              }
              return target[key];
          }
      };
      initProxy = function initProxy(vm) {
          if (hasProxy_1) {
              // determine which proxy handler to use
              var options = vm.$options;
              var handlers = options.render && options.render._withStripped
                  ? getHandler_1
                  : hasHandler_1;
              vm._renderProxy = new Proxy(vm, handlers);
          }
          else {
              vm._renderProxy = vm;
          }
      };
  }

  var uid = 0;
  /**
   * A dep is an observable that can have multiple
   * directives subscribing to it.
   */
  var Dep = /** @class */ (function () {
      function Dep() {
          this.id = uid++;
          this.subs = [];
      }
      Dep.prototype.addSub = function (sub) {
          this.subs.push(sub);
      };
      Dep.prototype.removeSub = function (sub) {
          remove(this.subs, sub);
      };
      Dep.prototype.depend = function () {
          if (Dep.target) {
              Dep.target.addDep(this);
          }
      };
      Dep.prototype.notify = function () {
          // stabilize the subscriber list first
          var subs = this.subs.slice();
          if ( !config.async) {
              // subs aren't sorted in scheduler if not running async
              // we need to sort them now to make sure they fire in correct
              // order
              subs.sort(function (a, b) { return a.id - b.id; });
          }
          for (var i = 0, l = subs.length; i < l; i++) {
              subs[i].update();
          }
      };
      return Dep;
  }());
  Dep.target = null;
  var targetStack = [];
  function pushTarget(target) {
      targetStack.push(target);
      Dep.target = target;
  }
  function popTarget() {
      targetStack.pop();
      Dep.target = targetStack[targetStack.length - 1];
  }

  /*
   * not type checking this file because flow doesn't play well with
   * dynamically accessing methods on Array prototype
   */
  var arrayProto = Array.prototype;
  var arrayMethods = Object.create(arrayProto);
  var methodsToPatch = [
      'push',
      'pop',
      'shift',
      'unshift',
      'splice',
      'sort',
      'reverse'
  ];
  /**
   * Intercept mutating methods and emit events
   */
  methodsToPatch.forEach(function (method) {
      // cache original method
      var original = arrayProto[method];
      def(arrayMethods, method, function mutator() {
          var args = [];
          for (var _i = 0; _i < arguments.length; _i++) {
              args[_i] = arguments[_i];
          }
          var result = original.apply(this, args);
          var ob = this.__ob__;
          var inserted;
          switch (method) {
              case 'push':
              case 'unshift':
                  inserted = args;
                  break;
              case 'splice':
                  inserted = args.slice(2);
                  break;
          }
          if (inserted)
              ob.observeArray(inserted);
          // notify change
          ob.dep.notify();
          return result;
      });
  });

  var arrayKeys = Object.getOwnPropertyNames(arrayMethods);
  /**
   * Augment a target Object or Array by intercepting
   * the prototype chain using __proto__
   */
  function protoAugment(target, src) {
      /* eslint-disable no-proto */
      target.__proto__ = src;
      /* eslint-enable no-proto */
  }
  /**
   * Augment a target Object or Array by defining
   * hidden properties.
   */
  /* istanbul ignore next */
  function copyAugment(target, src, keys) {
      for (var i = 0, l = keys.length; i < l; i++) {
          var key = keys[i];
          def(target, key, src[key]);
      }
  }
  /**
   * Collect dependencies on array elements when the array is touched, since
   * we cannot intercept array element access like property getters.
   */
  function dependArray(value) {
      for (var e = void 0, i = 0, l = value.length; i < l; i++) {
          e = value[i];
          e && e.__ob__ && e.__ob__.dep.depend();
          if (Array.isArray(e)) {
              dependArray(e);
          }
      }
  }
  /**
   * In some cases we may want to disable observation inside a component's
   * update computation.
   */
  var shouldObserve = true;
  function toggleObserving(value) {
      shouldObserve = value;
  }
  var Observer = /** @class */ (function () {
      function Observer(value) {
          this.value = value;
          this.dep = new Dep();
          this.vmCount = 0;
          def(value, '__ob__', this);
          if (Array.isArray(value)) {
              if (hasProto) {
                  protoAugment(value, arrayMethods);
              }
              else {
                  copyAugment(value, arrayMethods, arrayKeys);
              }
              this.observeArray(value);
          }
          else {
              this.walk(value);
          }
      }
      /**
       * Walk through all properties and convert them into
       * getter/setters. This method should only be called when
       * value type is Object.
       */
      Observer.prototype.walk = function (obj) {
          var keys = Object.keys(obj);
          for (var i = 0; i < keys.length; i++) {
              defineReactive(obj, keys[i]);
          }
      };
      /**
       * Observe a list of Array items.
       */
      Observer.prototype.observeArray = function (items) {
          for (var i = 0, l = items.length; i < l; i++) {
              observe(items[i]);
          }
      };
      return Observer;
  }());
  /**
   * Attempt to create an observer instance for a value,
   * returns the new observer if successfully observed,
   * or the existing observer if the value already has one.
   */
  function observe(value, asRootData) {
      if (!isObject(value) || value instanceof VNode) {
          return;
      }
      var ob;
      if (hasOwn(value, '__ob__') && value.__ob__ instanceof Observer) {
          ob = value.__ob__;
      }
      else if (shouldObserve &&
          !isServerRendering() &&
          (Array.isArray(value) || isPlainObject(value)) &&
          Object.isExtensible(value) &&
          !value._isVue) {
          ob = new Observer(value);
      }
      if (asRootData && ob) {
          ob.vmCount++;
      }
      return ob;
  }
  /**
   * Define a reactive property on an Object.
   */
  function defineReactive(obj, key, val, customSetter, shallow) {
      var dep = new Dep();
      var property = Object.getOwnPropertyDescriptor(obj, key);
      if (property && property.configurable === false) {
          return;
      }
      // cater for pre-defined getter/setters
      var getter = property && property.get;
      var setter = property && property.set;
      if ((!getter || setter) && arguments.length === 2) {
          val = obj[key];
      }
      var childOb = !shallow && observe(val);
      Object.defineProperty(obj, key, {
          enumerable: true,
          configurable: true,
          get: function reactiveGetter() {
              var value = getter ? getter.call(obj) : val;
              if (Dep.target) {
                  dep.depend();
                  if (childOb) {
                      childOb.dep.depend();
                      if (Array.isArray(value)) {
                          dependArray(value);
                      }
                  }
              }
              return value;
          },
          set: function reactiveSetter(newVal) {
              var value = getter ? getter.call(obj) : val;
              /* eslint-disable no-self-compare */
              if (newVal === value || (newVal !== newVal && value !== value)) {
                  return;
              }
              /* eslint-enable no-self-compare */
              if ( customSetter) {
                  customSetter();
              }
              // #7981: for accessor properties without setter
              if (getter && !setter)
                  return;
              if (setter) {
                  setter.call(obj, newVal);
              }
              else {
                  val = newVal;
              }
              childOb = !shallow && observe(newVal);
              dep.notify();
          }
      });
  }
  /**
   * Set a property on an object. Adds the new property and
   * triggers change notification if the property doesn't
   * already exist.
   */
  function set(target, key, val) { }
  /**
   * Delete a property and trigger change if necessary.
   */
  function del(target, key) { }

  var seenObjects = new Set();
  function traverse(val) {
      _traverse(val, seenObjects);
      seenObjects.clear();
  }
  // 对象下的所有val 都引用一次，让其 ob.dep 与 当前 watcher 关联
  function _traverse(val, seen) {
      var i, keys;
      var isA = Array.isArray(val);
      if ((!isA && !isObject(val)) || Object.isFrozen(val) || val instanceof VNode) {
          return;
      }
      if (val.__ob__) {
          var depId = val.__ob__.dep.id;
          if (seen.has(depId)) {
              return;
          }
          seen.add(depId);
      }
      if (isA) {
          i = val.length;
          while (i--)
              _traverse(val[i], seen);
      }
      else {
          keys = Object.keys(val);
          i = keys.length;
          while (i--)
              _traverse(val[keys[i]], seen);
      }
  }

  var isUpdatingChildComponent = false;
  function lifecycleMixin(Vue) {
      Vue.prototype._update = function (vnode, hydrating) {
          var vm = this;
          var prevEl = vm.$el;
          var prevVnode = vm._vnode;
          vm._vnode = vnode;
          // Vue.prototype.__patch__ is injected in entry points
          // based on the rendering backend used.
          if (!prevVnode) {
              // initial render
              vm.$el = vm.__patch__(vm.$el, vnode, hydrating, false /* removeOnly */);
          }
          else {
              // updates
              vm.$el = vm.__patch__(prevVnode, vnode);
          }
          // update __vue__ reference
          if (prevEl) {
              prevEl.__vue__ = null;
          }
          if (vm.$el) {
              vm.$el.__vue__ = vm;
          }
          // if parent is an HOC, update its $el as well
          if (vm.$vnode && vm.$parent && vm.$vnode === vm.$parent._vnode) {
              vm.$parent.$el = vm.$el;
          }
          // updated hook is called by the scheduler to ensure that children are
          // updated in a parent's updated hook.
      };
      Vue.prototype.$forceUpdate = function () { };
      Vue.prototype.$destroy = function () { };
  }
  function initLifecycle(vm) {
      var options = vm.$options;
      // locate first non-abstract parent
      var parent = options.parent;
      if (parent && !options.abstract) {
          while (parent.$options.abstract && parent.$parent) {
              parent = parent.$parent;
          }
          parent.$children.push(vm);
      }
      vm.$parent = parent;
      vm.$root = parent ? parent.$root : vm;
      vm.$children = [];
      vm.$refs = {};
      vm._watcher = null;
      vm._inactive = null;
      vm._directInactive = false;
      vm._isMounted = false;
      vm._isDestroyed = false;
      vm._isBeingDestroyed = false;
  }
  function mountComponent(vm, el, hydrating) {
      vm.$el = el;
      vm.$el = el;
      if (!vm.$options.render) {
          vm.$options.render = createEmptyVNode;
          {
              /* istanbul ignore if */
              if ((vm.$options.template && vm.$options.template.charAt(0) !== '#') ||
                  vm.$options.el || el) {
                  warn('You are using the runtime-only build of Vue where the template ' +
                      'compiler is not available. Either pre-compile the templates into ' +
                      'render functions, or use the compiler-included build.', vm);
              }
              else {
                  warn('Failed to mount component: template or render function not defined.', vm);
              }
          }
      }
      callHook(vm, 'beforeMount');
      var updateComponent;
      /* istanbul ignore if */
      // if (undefined !== 'production' && config.performance && mark) {
      // updateComponent = () => {
      //   const name = vm._name
      //   const id = vm._uid
      //   const startTag = `vue-perf-start:${id}`
      //   const endTag = `vue-perf-end:${id}`
      //   mark(startTag)
      //   const vnode = vm._render()
      //   mark(endTag)
      //   measure(`vue ${name} render`, startTag, endTag)
      //   mark(startTag)
      //   vm._update(vnode, hydrating)
      //   mark(endTag)
      //   measure(`vue ${name} patch`, startTag, endTag)
      // }
      // } else {
      //   updateComponent = () => {
      //     vm._update(vm._render(), hydrating)
      //   }
      // }
      updateComponent = function () {
          vm._update(vm._render(), hydrating);
      };
      // we set this to vm._watcher inside the watcher's constructor
      // since the watcher's initial patch may call $forceUpdate (e.g. inside child
      // component's mounted hook), which relies on vm._watcher being already defined
      new Watcher(vm, updateComponent, noop, {
          before: function () {
              if (vm._isMounted && !vm._isDestroyed) {
                  callHook(vm, 'beforeUpdate');
              }
          }
      }, true /* isRenderWatcher */);
      hydrating = false;
      // manually mounted instance, call mounted on self
      // mounted is called for render-created child components in its inserted hook
      if (vm.$vnode == null) {
          vm._isMounted = true;
          callHook(vm, 'mounted');
      }
      return vm;
  }
  /**
   * 调用 options[hook]
   * vm.$emit("hook:" + hook);
   */
  function callHook(vm, hook) {
      // #7573 disable dep collection when invoking lifecycle hooks
      pushTarget(null);
      var handlers = vm.$options[hook];
      var info = hook + " hook";
      if (handlers) {
          for (var i = 0, j = handlers.length; i < j; i++) {
              invokeWithErrorHandling(handlers[i], vm, null, vm, info);
          }
      }
      if (vm._hasHookEvent) {
          vm.$emit('hook:' + hook);
      }
      popTarget();
  }
  /**
   * 判断父系组件，是否 _inactive
   * @param vm
   */
  function isInInactiveTree(vm) {
      while (vm && (vm = vm.$parent)) {
          if (vm._inactive)
              return true;
      }
      return false;
  }
  /**
   * 1.传入 direct 时，只能直接更改父系非 _inactive 状态的 _inactive
   * 2.如果当前 vm 处于 _directInactive 则无法更改其 _inactive
   * 3.除此外更改其 _inactive 状态，并更改其 vm.$children 下的 _inactive
   * @param vm
   * @param direct
   */
  function activateChildComponent(vm, direct) {
      if (direct) {
          vm._directInactive = false;
          if (isInInactiveTree(vm)) {
              return;
          }
      }
      else if (vm._directInactive) {
          return;
      }
      if (vm._inactive || vm._inactive === null) {
          vm._inactive = false;
          for (var i = 0; i < vm.$children.length; i++) {
              activateChildComponent(vm.$children[i]);
          }
          callHook(vm, 'activated');
      }
  }

  // 同一个watcher 同一次 flushScheuler 最大的执行数
  var MAX_UPDATE_COUNT = 100;
  var waiting = false;
  var flushing = false;
  var index = 0;
  var queue = [];
  var activatedChildren = [];
  var has = {};
  // 循环 watcher 的id记录
  var circular = {};
  /**
   * 调用 watcher 绑定的 vm 的 hook:updated
   * @param queue
   */
  function callUpdatedHooks(queue) {
      var i = queue.length;
      while (i--) {
          var watcher = queue[i];
          var vm = watcher.vm;
          if (vm._watcher === watcher && vm._isMounted && !vm._isDestroyed) {
              callHook(vm, 'updated');
          }
      }
  }
  function callActivatedHooks(queue) {
      for (var i = 0; i < queue.length; i++) {
          queue[i]._inactive = true;
          activateChildComponent(queue[i], true /* true */);
      }
  }
  /**
   * Flush both queues and run the watchers.
   */
  function flushSchedulerQueue() {
      flushing = true;
      var watcher, id;
      // Sort queue before flush.
      // This ensures that:
      // 1. Components are updated from parent to child. (because parent is always
      //    created before the child)
      // 2. A component's user watchers are run before its render watcher (because
      //    user watchers are created before the render watcher)
      // 3. If a component is destroyed during a parent component's watcher run,
      //    its watchers can be skipped.
      queue.sort(function (a, b) { return a.id - b.id; });
      // do not cache length because more watchers might be pushed
      // as we run existing watchers
      for (index = 0; index < queue.length; index++) {
          watcher = queue[index];
          if (watcher.before) {
              watcher.before();
          }
          id = watcher.id;
          has[id] = null;
          watcher.run();
          // in dev build, check and stop circular updates.
          if ( has[id] != null) {
              circular[id] = (circular[id] || 0) + 1;
              if (circular[id] > MAX_UPDATE_COUNT) {
                  warn('You may have an infinite update loop ' + (watcher.user
                      ? "in watcher with expression \"" + watcher.expression + "\""
                      : "in a component render function."), watcher.vm);
                  break;
              }
          }
      }
      // keep copies of post queues before resetting state
      var activatedQueue = activatedChildren.slice();
      var updatedQueue = queue.slice();
      resetSchedulerState();
      // call component updated and activated hooks
      callActivatedHooks(activatedQueue);
      callUpdatedHooks(updatedQueue);
      // devtool hook
      /* istanbul ignore if */
      if (devtools && config.devtools) {
          devtools.emit('flush');
      }
  }
  /**
   * Reset the scheduler's state.
   */
  function resetSchedulerState() {
      index = queue.length = activatedChildren.length = 0;
      has = {};
      {
          circular = {};
      }
      waiting = flushing = false;
  }
  /**
   * Push a watcher into the watcher queue.
   * Jobs with duplicate IDs will be skipped unless it's
   * pushed when the queue is being flushed.
   */
  function queueWatcher(watcher) {
      var id = watcher.id;
      if (has[id] == null) {
          has[id] = true;
          if (!flushing) {
              queue.push(watcher);
          }
          else {
              // if already flushing, splice the watcher based on its id
              // if already past its id, it will be run next immediately.
              var i = queue.length - 1;
              while (i > index && queue[i].id > watcher.id) {
                  i--;
              }
              queue.splice(i + 1, 0, watcher);
          }
          // queue the flush
          if (!waiting) {
              waiting = true;
              if ( !config.async) {
                  flushSchedulerQueue();
                  return;
              }
              nextTick(flushSchedulerQueue);
          }
      }
  }

  var uid$1 = 0;
  /**
   * A watcher parses an expression, collects dependencies,
   * and fires callback when the expression value changes.
   * This is used for both the $watch() api and directives.
   */
  var Watcher = /** @class */ (function () {
      function Watcher(vm, expOrFn, cb, options, isRenderWatcher) {
          this.vm = vm;
          if (isRenderWatcher) {
              vm._watcher = this;
          }
          vm._watchers.push(this);
          // options
          if (options) {
              this.deep = !!options.deep;
              this.user = !!options.user;
              this.lazy = !!options.lazy;
              this.sync = !!options.sync;
              this.before = options.before;
          }
          else {
              this.deep = this.user = this.lazy = this.sync = false;
          }
          this.cb = cb;
          this.id = ++uid$1; // uid for batching
          this.active = true;
          this.dirty = this.lazy; // for lazy watchers
          this.deps = [];
          this.newDeps = [];
          this.depIds = new Set();
          this.newDepIds = new Set();
          this.expression =  expOrFn.toString()
              ;
          // parse expression for getter
          if (typeof expOrFn === 'function') {
              this.getter = expOrFn;
          }
          else {
              this.getter = parsePath(expOrFn);
              if (!this.getter) {
                  this.getter = noop;
                   warn("Failed watching path: \"" + expOrFn + "\" " +
                      'Watcher only accepts simple dot-delimited paths. ' +
                      'For full control, use a function instead.', vm);
              }
          }
          this.value = this.lazy
              ? undefined
              : this.get();
      }
      /**
       * Evaluate the getter, and re-collect dependencies.
       */
      Watcher.prototype.get = function () {
          pushTarget(this);
          var value;
          var vm = this.vm;
          try {
              value = this.getter.call(vm, vm);
          }
          catch (e) {
              if (this.user) {
                  handleError(e, vm, "getter for watcher \"" + this.expression + "\"");
              }
              else {
                  throw e;
              }
          }
          finally {
              // "touch" every property so they are all tracked as
              // dependencies for deep watching
              if (this.deep) {
                  traverse(value);
              }
              popTarget();
              this.cleanupDeps();
          }
          return value;
      };
      /**
       * Add a dependency to this directive.
       */
      Watcher.prototype.addDep = function (dep) {
          var id = dep.id;
          if (!this.newDepIds.has(id)) {
              this.newDepIds.add(id);
              this.newDeps.push(dep);
              if (!this.depIds.has(id)) {
                  dep.addSub(this);
              }
          }
      };
      /**
       * Clean up for dependency collection.
       */
      Watcher.prototype.cleanupDeps = function () {
          var i = this.deps.length;
          while (i--) {
              var dep = this.deps[i];
              if (!this.newDepIds.has(dep.id)) {
                  dep.removeSub(this);
              }
          }
          var tmp = this.depIds;
          this.depIds = this.newDepIds;
          this.newDepIds = tmp;
          this.newDepIds.clear();
          tmp = this.deps;
          this.deps = this.newDeps;
          this.newDeps = tmp;
          this.newDeps.length = 0;
      };
      /**
       * Subscriber interface.
       * Will be called when a dependency changes.
       */
      Watcher.prototype.update = function () {
          /* istanbul ignore else */
          if (this.lazy) {
              this.dirty = true;
          }
          else if (this.sync) {
              this.run();
          }
          else {
              queueWatcher(this);
          }
      };
      /**
       * Scheduler job interface.
       * Will be called by the scheduler.
       */
      Watcher.prototype.run = function () {
          if (this.active) {
              var value = this.get();
              if (value !== this.value ||
                  // Deep watchers and watchers on Object/Arrays should fire even
                  // when the value is the same, because the value may
                  // have mutated.
                  isObject(value) ||
                  this.deep) {
                  // set new value
                  var oldValue = this.value;
                  this.value = value;
                  if (this.user) {
                      try {
                          this.cb.call(this.vm, value, oldValue);
                      }
                      catch (e) {
                          handleError(e, this.vm, "callback for watcher \"" + this.expression + "\"");
                      }
                  }
                  else {
                      this.cb.call(this.vm, value, oldValue);
                  }
              }
          }
      };
      /**
      * Evaluate the value of the watcher.
      * This only gets called for lazy watchers.
      */
      Watcher.prototype.evaluate = function () {
          this.value = this.get();
          this.dirty = false;
      };
      /**
       * Depend on all deps collected by this watcher.
       */
      Watcher.prototype.depend = function () {
          var i = this.deps.length;
          while (i--) {
              this.deps[i].depend();
          }
      };
      /**
      * Remove self from all dependencies' subscriber list.
      */
      Watcher.prototype.teardown = function () {
          if (this.active) {
              // remove self from vm's watcher list
              // this is a somewhat expensive operation so we skip it
              // if the vm is being destroyed.
              if (!this.vm._isBeingDestroyed) {
                  remove(this.vm._watchers, this);
              }
              var i = this.deps.length;
              while (i--) {
                  this.deps[i].removeSub(this);
              }
              this.active = false;
          }
      };
      return Watcher;
  }());

  var sharedPropertyDefinition = {
      enumerable: true,
      configurable: true,
      get: noop,
      set: noop
  };
  function createWatcher(vm, expOrFn, handler, options) {
      if (isPlainObject(handler)) {
          options = handler;
          handler = handler.handler;
      }
      if (typeof handler === 'string') {
          handler = vm[handler];
      }
      return vm.$watch(expOrFn, handler, options);
  }
  function createComputedGetter(key) {
      return function computedGetter() {
          var watcher = this._computedWatchers && this._computedWatchers[key];
          if (watcher) {
              if (watcher.dirty) {
                  watcher.evaluate();
              }
              if (Dep.target) {
                  watcher.depend();
              }
              return watcher.value;
          }
      };
  }
  function createGetterInvoker(fn) {
      return function computedGetter() {
          return fn.call(this, this);
      };
  }
  function stateMixin(Vue) {
      // flow somehow has problems with directly declared definition object
      // when using Object.defineProperty, so we have to procedurally build up
      // the object here.
      var dataDef = {};
      dataDef.get = function () { return this._data; };
      var propsDef = {};
      propsDef.get = function () { return this._props; };
      {
          dataDef.set = function () {
              warn('Avoid replacing instance root $data. ' +
                  'Use nested data properties instead.', this);
          };
          propsDef.set = function () {
              warn("$props is readonly.", this);
          };
      }
      Object.defineProperty(Vue.prototype, '$data', dataDef);
      Object.defineProperty(Vue.prototype, '$props', propsDef);
      Vue.prototype.$set = set;
      Vue.prototype.$delete = del;
      Vue.prototype.$watch = function (expOrFn, cb, options) {
          var vm = this;
          if (isPlainObject(cb)) {
              return createWatcher(vm, expOrFn, cb, options);
          }
          options = options || {};
          options.user = true;
          var watcher = new Watcher(vm, expOrFn, cb, options);
          if (options.immediate) {
              try {
                  cb.call(vm, watcher.value);
              }
              catch (error) {
                  handleError(error, vm, "callback for immediate watcher \"" + watcher.expression + "\"");
              }
          }
          return function unwatchFn() {
              watcher.teardown();
          };
      };
  }
  function proxy(target, sourceKey, key) {
      sharedPropertyDefinition.get = function proxyGetter() {
          return this[sourceKey][key];
      };
      sharedPropertyDefinition.set = function proxySetter(val) {
          this[sourceKey][key] = val;
      };
      Object.defineProperty(target, key, sharedPropertyDefinition);
  }
  function defineComputed(target, key, userDef) {
      var shouldCache = !isServerRendering();
      if (typeof userDef === 'function') {
          sharedPropertyDefinition.get = shouldCache
              ? createComputedGetter(key)
              : createGetterInvoker(userDef);
          sharedPropertyDefinition.set = noop;
      }
      else {
          sharedPropertyDefinition.get = userDef.get
              ? shouldCache && userDef.cache !== false
                  ? createComputedGetter(key)
                  : createGetterInvoker(userDef.get)
              : noop;
          sharedPropertyDefinition.set = userDef.set || noop;
      }
      if (
          sharedPropertyDefinition.set === noop) {
          sharedPropertyDefinition.set = function () {
              warn("Computed property \"" + key + "\" was assigned to but it has no setter.", this);
          };
      }
      Object.defineProperty(target, key, sharedPropertyDefinition);
  }
  function initState(vm) {
      vm._watchers = [];
      var opts = vm.$options;
      if (opts.props)
          initProps(vm, opts.props);
      if (opts.methods)
          initMethods(vm, opts.methods);
      if (opts.data) {
          initData(vm);
      }
      else {
          observe(vm._data = {}, true /* asRootData */);
      }
      if (opts.computed)
          initComputed(vm, opts.computed);
      if (opts.watch && opts.watch !== nativeWatch) {
          initWatch(vm, opts.watch);
      }
  }
  function initProps(vm, propsOptions) {
      var propsData = vm.$options.propsData || {};
      var props = vm._props = {};
      // cache prop keys so that future props updates can iterate using Array
      // instead of dynamic object key enumeration.
      var keys = vm.$options._propKeys = [];
      var isRoot = !vm.$parent;
      // root instance props should be converted
      if (!isRoot) {
          toggleObserving(false);
      }
      var _loop_1 = function (key) {
          keys.push(key);
          var value = validateProp() || propsOptions[key];
          /* istanbul ignore else */
          {
              var hyphenatedKey = hyphenate(key);
              if (isReservedAttribute(hyphenatedKey) ||
                  config.isReservedAttr(hyphenatedKey)) {
                  warn("\"" + hyphenatedKey + "\" is a reserved attribute and cannot be used as component prop.", vm);
              }
              defineReactive(props, key, value, function () {
                  if (!isRoot && !isUpdatingChildComponent) {
                      warn("Avoid mutating a prop directly since the value will be " +
                          "overwritten whenever the parent component re-renders. " +
                          "Instead, use a data or computed property based on the prop's " +
                          ("value. Prop being mutated: \"" + key + "\""), vm);
                  }
              });
          }
          // static props are already proxied on the component's prototype
          // during Vue.extend(). We only need to proxy props defined at
          // instantiation here.
          if (!(key in vm)) {
              proxy(vm, "_props", key);
          }
      };
      for (var key in propsOptions) {
          _loop_1(key);
      }
      toggleObserving(true);
  }
  function initData(vm) {
      var data = vm.$options.data;
      data = vm._data = typeof data === 'function'
          ? getData(data, vm)
          : data || {};
      if (!isPlainObject(data)) {
          data = {};
           warn('data functions should return an object:\n' +
              'https://vuejs.org/v2/guide/components.html#data-Must-Be-a-Function', vm);
      }
      // proxy data on instance
      var keys = Object.keys(data);
      var props = vm.$options.props;
      var methods = vm.$options.methods;
      var i = keys.length;
      while (i--) {
          var key = keys[i];
          {
              if (methods && hasOwn(methods, key)) {
                  warn("Method \"" + key + "\" has already been defined as a data property.", vm);
              }
          }
          if (props && hasOwn(props, key)) {
               warn("The data property \"" + key + "\" is already declared as a prop. " +
                  "Use prop default value instead.", vm);
          }
          else if (!isReserved(key)) {
              proxy(vm, "_data", key);
          }
      }
      // observe data
      observe(data, true /* asRootData */);
  }
  function getData(data, vm) {
      // #7573 disable dep collection when invoking data getters
      pushTarget(null);
      try {
          return data.call(vm, vm);
      }
      catch (e) {
          handleError(e, vm, "data()");
          return {};
      }
      finally {
          popTarget();
      }
  }
  var computedWatcherOptions = { lazy: true };
  function initComputed(vm, computed) {
      // $flow-disable-line
      var watchers = vm._computedWatchers = Object.create(null);
      // computed properties are just getters during SSR
      var isSSR = isServerRendering();
      for (var key in computed) {
          var userDef = computed[key];
          var getter = typeof userDef === 'function' ? userDef : userDef.get;
          if ( getter == null) {
              warn("Getter is missing for computed property \"" + key + "\".", vm);
          }
          if (!isSSR) {
              // create internal watcher for the computed property.
              watchers[key] = new Watcher(vm, getter || noop, noop, computedWatcherOptions);
          }
          // component-defined computed properties are already defined on the
          // component prototype. We only need to define computed properties defined
          // at instantiation here.
          if (!(key in vm)) {
              defineComputed(vm, key, userDef);
          }
          else {
              if (key in vm.$data) {
                  warn("The computed property \"" + key + "\" is already defined in data.", vm);
              }
              else if (vm.$options.props && key in vm.$options.props) {
                  warn("The computed property \"" + key + "\" is already defined as a prop.", vm);
              }
          }
      }
  }
  function initMethods(vm, methods) {
      var props = vm.$options.props;
      for (var key in methods) {
          {
              if (typeof methods[key] !== 'function') {
                  warn("Method \"" + key + "\" has type \"" + typeof methods[key] + "\" in the component definition. " +
                      "Did you reference the function correctly?", vm);
              }
              if (props && hasOwn(props, key)) {
                  warn("Method \"" + key + "\" has already been defined as a prop.", vm);
              }
              if ((key in vm) && isReserved(key)) {
                  warn("Method \"" + key + "\" conflicts with an existing Vue instance method. " +
                      "Avoid defining component methods that start with _ or $.");
              }
          }
          vm[key] = typeof methods[key] !== 'function' ? noop : bind(methods[key], vm);
      }
  }
  function initWatch(vm, watch) {
  }

  function renderMixin(Vue) {
      // install runtime convenience helpers
      // installRenderHelpers(Vue.prototype)
      Vue.prototype.$nextTick = function (fn) {
          return nextTick(fn, this);
      };
      Vue.prototype._render = function () {
          var vm = this;
          var _a = vm.$options, render = _a.render, _parentVnode = _a._parentVnode;
          // if (_parentVnode) {
          //   vm.$scopedSlots = normalizeScopedSlots(
          //     _parentVnode.data.scopedSlots,
          //     vm.$slots
          //   )
          // }
          // set parent vnode. this allows render functions to have access
          // to the data on the placeholder node.
          vm.$vnode = _parentVnode;
          // render self
          var vnode;
          try {
              vnode = render.call(vm._renderProxy, vm.$createElement);
          }
          catch (e) {
              handleError(e, vm, "render");
              // return error render result,
              // or previous vnode to prevent render error causing blank component
              /* istanbul ignore else */
              if ( vm.$options.renderError) {
                  try {
                      vnode = vm.$options.renderError.call(vm._renderProxy, vm.$createElement, e);
                  }
                  catch (e) {
                      handleError(e, vm, "renderError");
                      vnode = vm._vnode;
                  }
              }
              else {
                  vnode = vm._vnode;
              }
          }
          // if the returned array contains only a single node, allow it
          if (Array.isArray(vnode) && vnode.length === 1) {
              vnode = vnode[0];
          }
          // return empty vnode in case the render function errored out
          if (!(vnode instanceof VNode)) {
              if ( Array.isArray(vnode)) {
                  warn('Multiple root nodes returned from render function. Render function ' +
                      'should return a single root node.', vm);
              }
              vnode = createEmptyVNode();
          }
          // set parent
          vnode.parent = _parentVnode;
          return vnode;
      };
  }

  function eventsMixin(Vue) {
      var hookRE = /^hook:/;
      Vue.prototype.$on = function (event, fn) {
          var vm = this;
          if (Array.isArray(event)) {
              for (var i = 0, l = event.length; i < l; i++) {
                  vm.$on(event[i], fn);
              }
          }
          else {
              (vm._events[event] || (vm._events[event] = [])).push(fn);
              // optimize hook:event cost by using a boolean flag marked at registration
              // instead of a hash lookup
              if (hookRE.test(event)) {
                  vm._hasHookEvent = true;
              }
          }
          return vm;
      };
      Vue.prototype.$once = function (event, fn) {
          var vm = this;
          function on() {
              vm.$off(event, on);
              fn.apply(vm, arguments);
          }
          // ???
          on.fn = fn;
          vm.$on(event, on);
          return vm;
      };
      Vue.prototype.$off = function (event, fn) {
          var vm = this;
          // all
          if (!arguments.length) {
              vm._events = Object.create(null);
              return vm;
              // array of events
          }
          else if (Array.isArray(event)) {
              for (var i_1 = 0, l = event.length; i_1 < l; i_1++) {
                  vm.$off(event[i_1], fn);
              }
              return vm;
          }
          // specific event
          var cbs = vm._events[event];
          if (!cbs) {
              return vm;
          }
          if (!fn) {
              vm._events[event] = null;
              return vm;
          }
          // specific handler
          var cb;
          var i = cbs.length;
          while (i--) {
              cb = cbs[i];
              if (cb === fn || cb.fn === fn) {
                  cbs.splice(i, 1);
                  break;
              }
          }
          return vm;
      };
      Vue.prototype.$emit = function (event) {
          var vm = this;
          {
              var lowerCaseEvent = event.toLowerCase();
              // 提示 event 与 vm._events 中的大小写不一致
              if (lowerCaseEvent !== event && vm._events[lowerCaseEvent]) {
                  tip("Event \"" + lowerCaseEvent + "\" is emitted in component " +
                      (formatComponentName(vm) + " but the handler is registered for \"" + event + "\". ") +
                      "Note that HTML attributes are case-insensitive and you cannot use " +
                      "v-on to listen to camelCase events when using in-DOM templates. " +
                      ("You should probably use \"" + hyphenate(event) + "\" instead of \"" + event + "\"."));
              }
          }
          var cbs = vm._events[event];
          if (cbs) {
              cbs = cbs.length > 1 ? toArray(cbs) : cbs;
              var args = toArray(arguments, 1);
              var info = "event handler for \"" + event + "\"";
              for (var i = 0, l = cbs.length; i < l; i++) {
                  invokeWithErrorHandling(cbs[i], vm, args, vm, info);
              }
          }
          return vm;
      };
  }
  function initEvents(vm) {
      vm._events = Object.create(null);
      vm._hasHookEvent = false;
      // init parent attached events
      // const listeners = vm.$options._parentListeners
      // if (listeners) {
      //   updateComponentListeners(vm, listeners)
      // }
  }

  function initProvide(vm) {
      var provide = vm.$options.provide;
      if (provide) {
          vm._provided = typeof provide === 'function'
              ? provide.call(vm)
              : provide;
      }
  }
  function initInjections(vm) {
      var result = resolveInject(vm.$options.inject, vm);
      if (result) {
          toggleObserving(false);
          Object.keys(result).forEach(function (key) {
              /* istanbul ignore else */
              {
                  defineReactive(vm, key, result[key], function () {
                      warn("Avoid mutating an injected value directly since the changes will be " +
                          "overwritten whenever the provided component re-renders. " +
                          ("injection being mutated: \"" + key + "\""), vm);
                  });
              }
          });
          toggleObserving(true);
      }
  }
  function resolveInject(inject, vm) {
      if (inject) {
          // inject is :any because flow is not smart enough to figure out cached
          var result = Object.create(null);
          var keys = hasSymbol
              ? Reflect.ownKeys(inject)
              : Object.keys(inject);
          for (var i = 0; i < keys.length; i++) {
              var key = keys[i];
              // #6574 in case the inject object is observed...
              if (key === '__ob__')
                  continue;
              var provideKey = inject[key].from;
              var source = vm;
              while (source) {
                  if (source._provided && hasOwn(source._provided, provideKey)) {
                      result[key] = source._provided[provideKey];
                      break;
                  }
                  source = source.$parent;
              }
              if (!source) {
                  if ('default' in inject[key]) {
                      var provideDefault = inject[key].default;
                      result[key] = typeof provideDefault === 'function'
                          ? provideDefault.call(vm)
                          : provideDefault;
                  }
                  else {
                      warn("Injection \"" + key + "\" not found", vm);
                  }
              }
          }
          return result;
      }
  }

  var uid$2 = 0;
  function initMixin(Vue) {
      Vue.prototype._init = function (options) {
          var vm = this;
          // a uid
          vm._uid = uid$2++;
          /* istanbul ignore if */
          // if (undefined !== 'production' && config.performance && mark) {
          //   startTag = `vue-perf-start:${vm._uid}`
          //   endTag = `vue-perf-end:${vm._uid}`
          //   mark(startTag)
          // }
          // a flag to avoid this being observed
          vm._isVue = true;
          // merge options
          if (options && options._isComponent) ;
          else {
              vm.$options = mergeOptions(resolveConstructorOptions(vm.constructor), options || {}, vm);
          }
          /* istanbul ignore else */
          {
              initProxy(vm);
          }
          // expose real self
          vm._self = vm;
          initLifecycle(vm);
          initEvents(vm);
          callHook(vm, 'beforeCreate');
          initInjections(vm); // resolve injections before data/props
          initState(vm);
          initProvide(vm); // resolve provide after data/props
          callHook(vm, 'created');
          /* istanbul ignore if */
          // if (undefined !== 'production' && config.performance && mark) {
          //   vm._name = formatComponentName(vm, false)
          //   mark(endTag)
          //   measure(`vue ${vm._name} init`, startTag, endTag)
          // }
          if (vm.$options.el) {
              vm.$mount(vm.$options.el);
          }
      };
  }
  function resolveConstructorOptions(Ctor) {
      var options = Ctor.options;
      if (Ctor.super) ;
      return options;
  }

  var Vue = function (options) {
      if (
          !(this instanceof Vue)) {
          warn('Vue is a constructor and should be called with the `new` keyword');
      }
      this._init(options);
  };
  initMixin(Vue);
  stateMixin(Vue);
  eventsMixin(Vue);
  lifecycleMixin(Vue);
  renderMixin(Vue);

  function initUse(Vue) {
      // 注册插件，arguments.unshif(this) 作为install 参数
      Vue.use = function (plugin) {
          var installedPlugins = (this._installedPlugins || (this._installedPlugins = []));
          if (installedPlugins.indexOf(plugin) > -1) {
              return this;
          }
          // additional parameters
          var args = toArray(arguments, 1);
          args.unshift(this);
          if (typeof plugin.install === 'function') {
              plugin.install.apply(plugin, args);
          }
          else if (typeof plugin === 'function') {
              plugin.apply(null, args);
          }
          installedPlugins.push(plugin);
          return this;
      };
  }

  function initMixin$1(Vue) {
      Vue.mixin = function (mixin) {
          this.options = mergeOptions(this.options, mixin);
          return this;
      };
  }

  function initExtend(Vue) {
      /**
       * Each instance constructor, including Vue, has a unique
       * cid. This enables us to create wrapped "child
       * constructors" for prototypal inheritance and cache them.
       */
      Vue.cid = 0;
      var cid = 1;
      /**
       * Class inheritance
       */
      Vue.extend = function (extendOptions) {
          if (extendOptions === void 0) { extendOptions = {}; }
          var Super = this;
          var SuperId = Super.cid;
          var cachedCtors = extendOptions._Ctor || (extendOptions._Ctor = {});
          if (cachedCtors[SuperId]) {
              return cachedCtors[SuperId];
          }
          var name = extendOptions.name || Super.options.name;
          if ( name) {
              validateComponentName(name);
          }
          var Sub = function VueComponent(options) {
              this._init(options);
          };
          Sub.prototype = Object.create(Super.prototype);
          Sub.prototype.constructor = Sub;
          Sub.cid = cid++;
          Sub.options = mergeOptions(Super.options, extendOptions);
          Sub['super'] = Super;
          // For props and computed properties, we define the proxy getters on
          // the Vue instances at extension time, on the extended prototype. This
          // avoids Object.defineProperty calls for each instance created.
          if (Sub.options.props) {
              initProps$1(Sub);
          }
          if (Sub.options.computed) {
              initComputed$1(Sub);
          }
          // allow further extension/mixin/plugin usage
          Sub.extend = Super.extend;
          Sub.mixin = Super.mixin;
          Sub.use = Super.use;
          // create asset registers, so extended classes
          // can have their private assets too.
          ASSET_TYPES.forEach(function (type) {
              Sub[type] = Super[type];
          });
          // enable recursive self-lookup
          if (name) {
              Sub.options.components[name] = Sub;
          }
          // keep a reference to the super options at extension time.
          // later at instantiation we can check if Super's options have
          // been updated.
          Sub.superOptions = Super.options;
          Sub.extendOptions = extendOptions;
          Sub.sealedOptions = extend({}, Sub.options);
          // cache constructor
          cachedCtors[SuperId] = Sub;
          return Sub;
      };
  }
  function initProps$1(Comp) {
      var props = Comp.options.props;
      for (var key in props) {
          proxy(Comp.prototype, "_props", key);
      }
  }
  function initComputed$1(Comp) {
      var computed = Comp.options.computed;
      for (var key in computed) {
          defineComputed(Comp.prototype, key, computed[key]);
      }
  }

  function initAssetRegisters(Vue) {
      ASSET_TYPES.forEach(function (type) {
          Vue[type] = function (id, definition) {
              var optType = type + 's';
              if (!definition) {
                  return this.options[optType][id];
              }
              else {
                  /* istanbul ignore if */
                  if ( type === 'component') {
                      validateComponentName(id);
                  }
                  if (type === 'component' && isPlainObject(definition)) {
                      definition.name = definition.name || id;
                      definition = this.options._base.extend(definition);
                  }
                  if (type === 'directive' && typeof definition === 'function') {
                      definition = { bind: definition, update: definition };
                  }
                  this.options[optType][id] = definition;
                  return definition;
              }
          };
      });
  }

  var patternTypes = [String, RegExp, Array];
  var KeepAlive = {
      name: 'keep-alive',
      abstract: true,
      props: {
          include: patternTypes,
          exclude: patternTypes,
          max: [String, Number]
      },
      created: function () {
      },
      destroyed: function () {
      },
  };

  var builtInComponents = {
      KeepAlive: KeepAlive
  };

  function initGlobalAPI(Vue) {
      // config
      var configDef = {};
      configDef.get = function () { return config; };
      {
          configDef.set = function () {
              warn('Do not replace the Vue.config object, set individual fields instead.');
          };
      }
      Object.defineProperty(Vue, 'config', configDef);
      // exposed util methods.
      // NOTE: these are not considered part of the public API - avoid relying on
      // them unless you are aware of the risk.
      Vue.util = {
          warn: warn,
          extend: extend,
          mergeOptions: mergeOptions,
          defineReactive: defineReactive
      };
      Vue.set = set;
      Vue.delete = del;
      Vue.nextTick = nextTick;
      // 2.6 explicit observable API
      Vue.observable = function (obj) {
          observe(obj);
          return obj;
      };
      Vue.options = Object.create(null);
      ASSET_TYPES.forEach(function (type) {
          Vue.options[type + 's'] = Object.create(null);
      });
      // this is used to identify the "base" constructor to extend all plain-object
      // components with in Weex's multi-instance scenarios.
      Vue.options._base = Vue;
      extend(Vue.options.components, builtInComponents);
      initUse(Vue);
      initMixin$1(Vue);
      initExtend(Vue);
      initAssetRegisters(Vue);
  }

  function FunctionalRenderContext() {
  }

  initGlobalAPI(Vue);
  Object.defineProperty(Vue.prototype, '$isServer', {
      get: isServerRendering
  });
  Object.defineProperty(Vue.prototype, '$ssrContext', {
      get: function () {
          /* istanbul ignore next */
          return this.$vnode && this.$vnode.ssrContext;
      }
  });
  // expose FunctionalRenderContext for ssr runtime helper installation
  Object.defineProperty(Vue, 'FunctionalRenderContext', {
      value: FunctionalRenderContext
  });
  Vue.version = '__VERSION__';

  var directive = {
      inserted: function (el, binding, vnode, oldVnode) {
      },
      componentUpdated: function (el, binding, vnode) {
      }
  };

  var show = {
      bind: function (el, _a, vnode) {
          var value = _a.value;
      },
      update: function (el, _a, vnode) {
          var value = _a.value, oldValue = _a.oldValue;
      },
      unbind: function (el, binding, vnode, oldVnode, isDestroy) {
      }
  };

  var platformDirectives = {
      model: directive,
      show: show
  };

  var transitionProps = {
      name: String,
      appear: Boolean,
      css: Boolean,
      mode: String,
      type: String,
      enterClass: String,
      leaveClass: String,
      enterToClass: String,
      leaveToClass: String,
      enterActiveClass: String,
      leaveActiveClass: String,
      appearClass: String,
      appearActiveClass: String,
      appearToClass: String,
      duration: [Number, String, Object]
  };
  var Transition = {
      name: 'transition',
      props: transitionProps,
      abstract: true,
      render: function (h) {
      }
  };

  var props = extend({
      tag: String,
      moveClass: String
  }, transitionProps);
  delete props.mode;
  var TransitionGroup = {
      props: props,
      beforeMount: function () {
      },
      render: function (h) {
      },
      updated: function () {
      },
      methods: {
          hasMove: function (el, moveClass) {
              return false;
          },
      }
  };

  var platformComponents = {
      Transition: Transition,
      TransitionGroup: TransitionGroup
  };

  function createPatchFunction(backend) {
      return function () { };
  }

  var patch = createPatchFunction();

  Vue.config.mustUseProp = mustUseProp;
  Vue.config.isReservedTag = isReservedTag;
  Vue.config.isReservedAttr = isReservedAttr;
  Vue.config.getTagNamespace = getTagNamespace;
  Vue.config.isUnknownElement = isUnknownElement;
  // install platform runtime directives & components
  extend(Vue.options.directives, platformDirectives);
  extend(Vue.options.components, platformComponents);
  // install platform patch function
  Vue.prototype.__patch__ = inBrowser ? patch : noop;
  // public mount method
  Vue.prototype.$mount = function (el, hydrating) {
      el = el && inBrowser ? query(el) : undefined;
      return mountComponent(this, el, hydrating);
  };
  // devtools global hook
  /* istanbul ignore next */
  if (inBrowser) {
      setTimeout(function () {
          if (config.devtools) {
              if (devtools) {
                  devtools.emit('init', Vue);
              }
              else {
                  console[console.info ? 'info' : 'log']('Download the Vue Devtools extension for a better development experience:\n' +
                      'https://github.com/vuejs/vue-devtools');
              }
          }
          if (
              config.productionTip !== false &&
              typeof console !== 'undefined') {
              console[console.info ? 'info' : 'log']("You are running Vue in development mode.\n" +
                  "Make sure to turn on production mode when deploying for production.\n" +
                  "See more tips at https://vuejs.org/guide/deployment.html");
          }
      }, 0);
  }

  var validDivisionCharRE = /[\w).+\-_$\]]/;
  // exp | filter(xx)  =>  _f(filter)(exp,xx)
  function parseFilters(exp) {
      var inSingle = false;
      var inDouble = false;
      var inTemplateString = false;
      var inRegex = false;
      var curly = 0;
      var square = 0;
      var paren = 0;
      var lastFilterIndex = 0;
      var c, prev, i, expression, filters;
      for (i = 0; i < exp.length; i++) {
          prev = c;
          c = exp.charCodeAt(i);
          if (inSingle) {
              if (c === 0x27 && prev !== 0x5C)
                  inSingle = false;
          }
          else if (inDouble) {
              if (c === 0x22 && prev !== 0x5C)
                  inDouble = false;
          }
          else if (inTemplateString) {
              if (c === 0x60 && prev !== 0x5C)
                  inTemplateString = false;
          }
          else if (inRegex) {
              if (c === 0x2f && prev !== 0x5C)
                  inRegex = false;
          }
          else if (c === 0x7C && // pipe
              exp.charCodeAt(i + 1) !== 0x7C &&
              exp.charCodeAt(i - 1) !== 0x7C &&
              !curly && !square && !paren) {
              if (expression === undefined) {
                  // first filter, end of expression
                  lastFilterIndex = i + 1;
                  expression = exp.slice(0, i).trim();
              }
              else {
                  pushFilter();
              }
          }
          else {
              switch (c) {
                  case 0x22:
                      inDouble = true;
                      break; // "
                  case 0x27:
                      inSingle = true;
                      break; // '
                  case 0x60:
                      inTemplateString = true;
                      break; // `
                  case 0x28:
                      paren++;
                      break; // (
                  case 0x29:
                      paren--;
                      break; // )
                  case 0x5B:
                      square++;
                      break; // [
                  case 0x5D:
                      square--;
                      break; // ]
                  case 0x7B:
                      curly++;
                      break; // {
                  case 0x7D:
                      curly--;
                      break; // }
              }
              if (c === 0x2f) { // /
                  var j = i - 1;
                  var p 
                  // find first non-whitespace prev char
                  = void 0;
                  // find first non-whitespace prev char
                  for (; j >= 0; j--) {
                      p = exp.charAt(j);
                      if (p !== ' ')
                          break;
                  }
                  if (!p || !validDivisionCharRE.test(p)) {
                      inRegex = true;
                  }
              }
          }
      }
      if (expression === undefined) {
          expression = exp.slice(0, i).trim();
      }
      else if (lastFilterIndex !== 0) {
          pushFilter();
      }
      function pushFilter() {
          (filters || (filters = [])).push(exp.slice(lastFilterIndex, i).trim());
          lastFilterIndex = i + 1;
      }
      if (filters) {
          for (i = 0; i < filters.length; i++) {
              expression = wrapFilter(expression, filters[i]);
          }
      }
      return expression;
  }
  function wrapFilter(exp, filter) {
      var i = filter.indexOf('(');
      if (i < 0) {
          // _f: resolveFilter
          return "_f(\"" + filter + "\")(" + exp + ")";
      }
      else {
          var name_1 = filter.slice(0, i);
          var args = filter.slice(i + 1);
          return "_f(\"" + name_1 + "\")(" + exp + (args !== ')' ? ',' + args : args);
      }
  }

  var defaultTagRE = /\{\{((?:.|\r?\n)+?)\}\}/g;
  var regexEscapeRE = /[-.*+?^${}()|[\]\/\\]/g;
  var buildRegex = cached(function (delimiters) {
      var open = delimiters[0].replace(regexEscapeRE, '\\$&');
      var close = delimiters[1].replace(regexEscapeRE, '\\$&');
      return new RegExp(open + '((?:.|\\n)+?)' + close, 'g');
  });
  function parseText(text, delimiters) {
      var tagRE = delimiters ? buildRegex(delimiters) : defaultTagRE;
      if (!tagRE.test(text)) {
          return;
      }
      var tokens = [];
      var rawTokens = [];
      var lastIndex = tagRE.lastIndex = 0;
      var match, index, tokenValue;
      while ((match = tagRE.exec(text))) {
          index = match.index;
          // push text token
          if (index > lastIndex) {
              rawTokens.push(tokenValue = text.slice(lastIndex, index));
              tokens.push(JSON.stringify(tokenValue));
          }
          // tag token
          var exp = parseFilters(match[1].trim());
          tokens.push("_s(" + exp + ")");
          rawTokens.push({ '@binding': exp });
          lastIndex = index + match[0].length;
      }
      if (lastIndex < text.length) {
          rawTokens.push(tokenValue = text.slice(lastIndex));
          tokens.push(JSON.stringify(tokenValue));
      }
      return {
          expression: tokens.join('+'),
          tokens: rawTokens
      };
  }

  function baseWarn(msg, range) {
      console.error("[Vue compiler]: " + msg);
  }
  function addProp(el, name, value, range) {
      (el.props || (el.props = [])).push(rangeSetItem({ name: name, value: value }, range));
      el.plain = false;
  }
  function addAttr(el, name, value, range) {
      (el.attrs || (el.attrs = [])).push(rangeSetItem({ name: name, value: value }, range));
      el.plain = false;
  }
  // add a raw attr (use this in preTransforms)
  function addRawAttr(el, name, value, range) {
      el.attrsMap[name] = value;
      el.attrsList.push(rangeSetItem({ name: name, value: value }, range));
  }
  function addDirective(el, name, rawName, value, arg, modifiers, range) {
      (el.directives || (el.directives = [])).push(rangeSetItem({ name: name, rawName: rawName, value: value, arg: arg, modifiers: modifiers }, range));
      el.plain = false;
  }
  function addHandler(el, name, value, modifiers, important, warn, range) {
      modifiers = modifiers || emptyObject;
      // warn prevent and passive modifier
      /* istanbul ignore if */
      if ( warn &&
          modifiers.prevent && modifiers.passive) {
          warn('passive and prevent can\'t be used together. ' +
              'Passive handler can\'t prevent default event.', range);
      }
      // normalize click.right and click.middle since they don't actually fire
      // this is technically browser-specific, but at least for now browsers are
      // the only target envs that have right/middle clicks.
      if (name === 'click') {
          if (modifiers.right) {
              name = 'contextmenu';
              delete modifiers.right;
          }
          else if (modifiers.middle) {
              name = 'mouseup';
          }
      }
      // check capture modifier
      if (modifiers.capture) {
          delete modifiers.capture;
          name = '!' + name; // mark the event as captured
      }
      if (modifiers.once) {
          delete modifiers.once;
          name = '~' + name; // mark the event as once
      }
      /* istanbul ignore if */
      if (modifiers.passive) {
          delete modifiers.passive;
          name = '&' + name; // mark the event as passive
      }
      var events;
      if (modifiers.native) {
          delete modifiers.native;
          events = el.nativeEvents || (el.nativeEvents = {});
      }
      else {
          events = el.events || (el.events = {});
      }
      var newHandler = rangeSetItem({ value: value.trim() }, range);
      if (modifiers !== emptyObject) {
          newHandler.modifiers = modifiers;
      }
      var handlers = events[name];
      /* istanbul ignore if */
      if (Array.isArray(handlers)) {
          important ? handlers.unshift(newHandler) : handlers.push(newHandler);
      }
      else if (handlers) {
          events[name] = important ? [newHandler, handlers] : [handlers, newHandler];
      }
      else {
          events[name] = newHandler;
      }
      el.plain = false;
  }
  function getBindingAttr(el, name, getStatic) {
      var dynamicValue = getAndRemoveAttr(el, ':' + name) ||
          getAndRemoveAttr(el, 'v-bind:' + name);
      if (dynamicValue != null) {
          return parseFilters(dynamicValue);
      }
      else if (getStatic !== false) {
          var staticValue = getAndRemoveAttr(el, name);
          if (staticValue != null) {
              return JSON.stringify(staticValue);
          }
      }
  }
  // note: this only removes the attr from the Array (attrsList) so that it
  // doesn't get processed by processAttrs.
  // By default it does NOT remove it from the map (attrsMap) because the map is
  // needed during codegen.
  function getAndRemoveAttr(el, name, removeFromMap) {
      var val;
      if ((val = el.attrsMap[name]) != null) {
          var list = el.attrsList;
          for (var i = 0, l = list.length; i < l; i++) {
              if (list[i].name === name) {
                  list.splice(i, 1);
                  break;
              }
          }
      }
      if (removeFromMap) {
          delete el.attrsMap[name];
      }
      return val;
  }
  function getRawBindingAttr(el, name) {
      return el.rawAttrsMap[':' + name] ||
          el.rawAttrsMap['v-bind:' + name] ||
          el.rawAttrsMap[name];
  }
  /* eslint-enable no-unused-vars */
  function pluckModuleFunction(modules, key) {
      return modules
          ? modules.map(function (m) { return m[key]; }).filter(function (_) { return _; })
          : [];
  }
  function rangeSetItem(item, range) {
      if (range) {
          if (range.start != null) {
              item.start = range.start;
          }
          if (range.end != null) {
              item.end = range.end;
          }
      }
      return item;
  }

  function transformNode(el, options) {
      var warn = options.warn || baseWarn;
      var staticClass = getAndRemoveAttr(el, 'class');
      if ( staticClass) {
          var res = parseText(staticClass, options.delimiters);
          if (res) {
              warn("class=\"" + staticClass + "\": " +
                  'Interpolation inside attributes has been removed. ' +
                  'Use v-bind or the colon shorthand instead. For example, ' +
                  'instead of <div class="{{ val }}">, use <div :class="val">.', el.rawAttrsMap['class']);
          }
      }
      if (staticClass) {
          el.staticClass = JSON.stringify(staticClass);
      }
      var classBinding = getBindingAttr(el, 'class', false /* getStatic */);
      if (classBinding) {
          el.classBinding = classBinding;
      }
  }
  function genData(el) {
      var data = '';
      if (el.staticClass) {
          data += "staticClass:" + el.staticClass + ",";
      }
      if (el.classBinding) {
          data += "class:" + el.classBinding + ",";
      }
      return data;
  }
  var klass = {
      staticKeys: ['staticClass'],
      transformNode: transformNode,
      genData: genData
  };

  /* @flow */
  var parseStyleText = cached(function (cssText) {
      var res = {};
      var listDelimiter = /;(?![^(]*\))/g;
      var propertyDelimiter = /:(.+)/;
      cssText.split(listDelimiter).forEach(function (item) {
          if (item) {
              var tmp = item.split(propertyDelimiter);
              tmp.length > 1 && (res[tmp[0].trim()] = tmp[1].trim());
          }
      });
      return res;
  });

  function transformNode$1(el, options) {
      var warn = options.warn || baseWarn;
      var staticStyle = getAndRemoveAttr(el, 'style');
      if (staticStyle) {
          /* istanbul ignore if */
          {
              var res = parseText(staticStyle, options.delimiters);
              if (res) {
                  warn("style=\"" + staticStyle + "\": " +
                      'Interpolation inside attributes has been removed. ' +
                      'Use v-bind or the colon shorthand instead. For example, ' +
                      'instead of <div style="{{ val }}">, use <div :style="val">.', el.rawAttrsMap['style']);
              }
          }
          el.staticStyle = JSON.stringify(parseStyleText(staticStyle));
      }
      var styleBinding = getBindingAttr(el, 'style', false /* getStatic */);
      if (styleBinding) {
          el.styleBinding = styleBinding;
      }
  }
  function genData$1(el) {
      var data = '';
      if (el.staticStyle) {
          data += "staticStyle:" + el.staticStyle + ",";
      }
      if (el.styleBinding) {
          data += "style:(" + el.styleBinding + "),";
      }
      return data;
  }
  var style = {
      staticKeys: ['staticStyle'],
      transformNode: transformNode$1,
      genData: genData$1
  };

  // Regular Expressions for parsing tags and attributes
  var attribute = /^\s*([^\s"'<>\/=]+)(?:\s*(=)\s*(?:"([^"]*)"+|'([^']*)'+|([^\s"'=<>`]+)))?/;
  var ncname = "[a-zA-Z_][\\-\\.0-9_a-zA-Z" + unicodeLetters + "]*";
  var qnameCapture = "((?:" + ncname + "\\:)?" + ncname + ")";
  var startTagOpen = new RegExp("^<" + qnameCapture);
  var startTagClose = /^\s*(\/?)>/;
  var endTag = new RegExp("^<\\/" + qnameCapture + "[^>]*>");
  var doctype = /^<!DOCTYPE [^>]+>/i;
  // #7298: escape - to avoid being pased as HTML comment when inlined in page
  var comment = /^<!\--/;
  var conditionalComment = /^<!\[/;
  // Special Elements (can contain anything)
  var isPlainTextElement = makeMap('script,style,textarea', true);
  var reCache = {};
  var decodingMap = {
      '&lt;': '<',
      '&gt;': '>',
      '&quot;': '"',
      '&amp;': '&',
      '&#10;': '\n',
      '&#9;': '\t'
  };
  var encodedAttr = /&(?:lt|gt|quot|amp);/g;
  var encodedAttrWithNewLines = /&(?:lt|gt|quot|amp|#10|#9);/g;
  // #5992
  var isIgnoreNewlineTag = makeMap('pre,textarea', true);
  var shouldIgnoreFirstNewline = function (tag, html) { return tag && isIgnoreNewlineTag(tag) && html[0] === '\n'; };
  function decodeAttr(value, shouldDecodeNewlines) {
      var re = shouldDecodeNewlines ? encodedAttrWithNewLines : encodedAttr;
      return value.replace(re, function (match) { return decodingMap[match]; });
  }
  function parseHTML(html, options) {
      var stack = [];
      var expectHTML = options.expectHTML;
      var isUnaryTag = options.isUnaryTag || no;
      var canBeLeftOpenTag = options.canBeLeftOpenTag || no;
      var index = 0;
      var last, lastTag;
      var _loop_1 = function () {
          last = html;
          // Make sure we're not in a plaintext content element like script/style
          if (!lastTag || !isPlainTextElement(lastTag)) {
              var textEnd = html.indexOf('<');
              if (textEnd === 0) {
                  // Comment:
                  if (comment.test(html)) {
                      var commentEnd = html.indexOf('-->');
                      if (commentEnd >= 0) {
                          if (options.shouldKeepComment) {
                              options.comment(html.substring(4, commentEnd), index, index + commentEnd + 3);
                          }
                          advance(commentEnd + 3);
                          return "continue";
                      }
                  }
                  // http://en.wikipedia.org/wiki/Conditional_comment#Downlevel-revealed_conditional_comment
                  if (conditionalComment.test(html)) {
                      var conditionalEnd = html.indexOf(']>');
                      if (conditionalEnd >= 0) {
                          advance(conditionalEnd + 2);
                          return "continue";
                      }
                  }
                  // Doctype:
                  var doctypeMatch = html.match(doctype);
                  if (doctypeMatch) {
                      advance(doctypeMatch[0].length);
                      return "continue";
                  }
                  // End tag:
                  var endTagMatch = html.match(endTag);
                  if (endTagMatch) {
                      var curIndex = index;
                      advance(endTagMatch[0].length);
                      parseEndTag(endTagMatch[1], curIndex, index);
                      return "continue";
                  }
                  // Start tag:
                  var startTagMatch = parseStartTag();
                  if (startTagMatch) {
                      handleStartTag(startTagMatch);
                      if (shouldIgnoreFirstNewline(startTagMatch.tagName, html)) {
                          advance(1);
                      }
                      return "continue";
                  }
              }
              var text = void 0, rest = void 0, next = void 0;
              if (textEnd >= 0) {
                  rest = html.slice(textEnd);
                  while (!endTag.test(rest) &&
                      !startTagOpen.test(rest) &&
                      !comment.test(rest) &&
                      !conditionalComment.test(rest)) {
                      // < in plain text, be forgiving and treat it as text
                      next = rest.indexOf('<', 1);
                      if (next < 0)
                          break;
                      textEnd += next;
                      rest = html.slice(textEnd);
                  }
                  text = html.substring(0, textEnd);
              }
              if (textEnd < 0) {
                  text = html;
              }
              if (text) {
                  advance(text.length);
              }
              if (options.chars && text) {
                  options.chars(text, index - text.length, index);
              }
          }
          else {
              var endTagLength_1 = 0;
              var stackedTag_1 = lastTag.toLowerCase();
              var reStackedTag = reCache[stackedTag_1] || (reCache[stackedTag_1] = new RegExp('([\\s\\S]*?)(</' + stackedTag_1 + '[^>]*>)', 'i'));
              var rest = html.replace(reStackedTag, function (all, text, endTag) {
                  endTagLength_1 = endTag.length;
                  if (!isPlainTextElement(stackedTag_1) && stackedTag_1 !== 'noscript') {
                      text = text
                          .replace(/<!\--([\s\S]*?)-->/g, '$1') // #7298
                          .replace(/<!\[CDATA\[([\s\S]*?)]]>/g, '$1');
                  }
                  if (shouldIgnoreFirstNewline(stackedTag_1, text)) {
                      text = text.slice(1);
                  }
                  if (options.chars) {
                      options.chars(text);
                  }
                  return '';
              });
              index += html.length - rest.length;
              html = rest;
              parseEndTag(stackedTag_1, index - endTagLength_1, index);
          }
          if (html === last) {
              options.chars && options.chars(html);
              if ( !stack.length && options.warn) {
                  options.warn("Mal-formatted tag at end of template: \"" + html + "\"", { start: index + html.length });
              }
              return "break";
          }
      };
      while (html) {
          var state_1 = _loop_1();
          if (state_1 === "break")
              break;
      }
      function advance(n) {
          index += n;
          html = html.substring(n);
      }
      function parseStartTag() {
          var start = html.match(startTagOpen);
          if (start) {
              var match = {
                  tagName: start[1],
                  attrs: [],
                  start: index
              };
              advance(start[0].length);
              var end = void 0, attr = void 0;
              while (!(end = html.match(startTagClose)) && (attr = html.match(attribute))) {
                  attr.start = index;
                  advance(attr[0].length);
                  attr.end = index;
                  match.attrs.push(attr);
              }
              if (end) {
                  match.unarySlash = end[1];
                  advance(end[0].length);
                  match.end = index;
                  return match;
              }
          }
      }
      function handleStartTag(match) {
          var tagName = match.tagName;
          var unarySlash = match.unarySlash;
          if (expectHTML) {
              if (lastTag === 'p' && isNonPhrasingTag(tagName)) {
                  parseEndTag(lastTag);
              }
              if (canBeLeftOpenTag(tagName) && lastTag === tagName) {
                  parseEndTag(tagName);
              }
          }
          var unary = isUnaryTag(tagName) || !!unarySlash;
          var l = match.attrs.length;
          var attrs = new Array(l);
          for (var i = 0; i < l; i++) {
              var args = match.attrs[i];
              var value = args[3] || args[4] || args[5] || '';
              var shouldDecodeNewlines = tagName === 'a' && args[1] === 'href'
                  ? options.shouldDecodeNewlinesForHref
                  : options.shouldDecodeNewlines;
              attrs[i] = {
                  name: args[1],
                  value: decodeAttr(value, shouldDecodeNewlines)
              };
              if ( options.outputSourceRange) {
                  attrs[i].start = args.start + args[0].match(/^\s*/).length;
                  attrs[i].end = args.end;
              }
          }
          if (!unary) {
              stack.push({ tag: tagName, lowerCasedTag: tagName.toLowerCase(), attrs: attrs, start: match.start, end: match.end });
              lastTag = tagName;
          }
          if (options.start) {
              options.start(tagName, attrs, unary, match.start, match.end);
          }
      }
      function parseEndTag(tagName, start, end) {
          var pos, lowerCasedTagName;
          if (start == null)
              start = index;
          if (end == null)
              end = index;
          // Find the closest opened tag of the same type
          if (tagName) {
              lowerCasedTagName = tagName.toLowerCase();
              for (pos = stack.length - 1; pos >= 0; pos--) {
                  if (stack[pos].lowerCasedTag === lowerCasedTagName) {
                      break;
                  }
              }
          }
          else {
              // If no tag name is provided, clean shop
              pos = 0;
          }
          if (pos >= 0) {
              // Close all the open elements, up the stack
              for (var i = stack.length - 1; i >= pos; i--) {
                  if (
                      (i > pos || !tagName) &&
                      options.warn) {
                      options.warn("tag <" + stack[i].tag + "> has no matching end tag.", { start: stack[i].start });
                  }
                  if (options.end) {
                      options.end(stack[i].tag, start, end);
                  }
              }
              // Remove the open elements from the stack
              stack.length = pos;
              lastTag = pos && stack[pos - 1].tag;
          }
          else if (lowerCasedTagName === 'br') {
              if (options.start) {
                  options.start(tagName, [], true, start, end);
              }
          }
          else if (lowerCasedTagName === 'p') {
              if (options.start) {
                  options.start(tagName, [], false, start, end);
              }
              if (options.end) {
                  options.end(tagName, start, end);
              }
          }
      }
  }

  /* @flow */
  /**
   * Cross-platform code generation for component v-model
   */
  function genComponentModel(el, value, modifiers) {
      var _a = modifiers || {}, number = _a.number, trim = _a.trim;
      var baseValueExpression = '$$v';
      var valueExpression = baseValueExpression;
      if (trim) {
          valueExpression =
              "(typeof " + baseValueExpression + " === 'string'" +
                  ("? " + baseValueExpression + ".trim()") +
                  (": " + baseValueExpression + ")");
      }
      if (number) {
          valueExpression = "_n(" + valueExpression + ")";
      }
      var assignment = genAssignmentCode(value, valueExpression);
      el.model = {
          value: "(" + value + ")",
          expression: JSON.stringify(value),
          callback: "function (" + baseValueExpression + ") {" + assignment + "}"
      };
  }
  /**
   * Cross-platform codegen helper for generating v-model value assignment code.
   */
  function genAssignmentCode(value, assignment) {
      var res = parseModel(value);
      if (res.key === null) {
          return value + "=" + assignment;
      }
      else {
          return "$set(" + res.exp + ", " + res.key + ", " + assignment + ")";
      }
  }
  /**
   * Parse a v-model expression into a base path and a final key segment.
   * Handles both dot-path and possible square brackets.
   *
   * Possible cases:
   *
   * - test
   * - test[key]
   * - test[test1[key]]
   * - test["a"][key]
   * - xxx.test[a[a].test1[key]]
   * - test.xxx.a["asa"][test1[key]]
   *
   */
  var len, str, chr, index$1, expressionPos, expressionEndPos;
  function parseModel(val) {
      // Fix https://github.com/vuejs/vue/pull/7730
      // allow v-model="obj.val " (trailing whitespace)
      val = val.trim();
      len = val.length;
      if (val.indexOf('[') < 0 || val.lastIndexOf(']') < len - 1) {
          index$1 = val.lastIndexOf('.');
          if (index$1 > -1) {
              return {
                  exp: val.slice(0, index$1),
                  key: '"' + val.slice(index$1 + 1) + '"'
              };
          }
          else {
              return {
                  exp: val,
                  key: null
              };
          }
      }
      str = val;
      index$1 = expressionPos = expressionEndPos = 0;
      while (!eof()) {
          chr = next();
          /* istanbul ignore if */
          if (isStringStart(chr)) {
              parseString(chr);
          }
          else if (chr === 0x5B) {
              parseBracket(chr);
          }
      }
      return {
          exp: val.slice(0, expressionPos),
          key: val.slice(expressionPos + 1, expressionEndPos)
      };
  }
  function next() {
      return str.charCodeAt(++index$1);
  }
  function eof() {
      return index$1 >= len;
  }
  function isStringStart(chr) {
      return chr === 0x22 || chr === 0x27;
  }
  function parseBracket(chr) {
      var inBracket = 1;
      expressionPos = index$1;
      while (!eof()) {
          chr = next();
          if (isStringStart(chr)) {
              parseString(chr);
              continue;
          }
          if (chr === 0x5B)
              inBracket++;
          if (chr === 0x5D)
              inBracket--;
          if (inBracket === 0) {
              expressionEndPos = index$1;
              break;
          }
      }
  }
  function parseString(chr) {
      var stringQuote = chr;
      while (!eof()) {
          chr = next();
          if (chr === stringQuote) {
              break;
          }
      }
  }

  var onRE = /^@|^v-on:/;
  var dirRE = /^v-|^@|^:|^\./;
  var forAliasRE = /([\s\S]*?)\s+(?:in|of)\s+([\s\S]*)/;
  var forIteratorRE = /,([^,\}\]]*)(?:,([^,\}\]]*))?$/;
  var stripParensRE = /^\(|\)$/g;
  var argRE = /:(.*)$/;
  var bindRE = /^:|^\.|^v-bind:/;
  var propBindRE = /^\./;
  var modifierRE = /\.[^.]+/g;
  var lineBreakRE = /[\r\n]/;
  var whitespaceRE = /\s+/g;
  var decoder;
  var he = {
      decode: function decode(html) {
          decoder = decoder || document.createElement('div');
          decoder.innerHTML = html;
          return decoder.textContent;
      }
  };
  var decodeHTMLCached = cached(he.decode);
  // configurable state
  var warn$1;
  var delimiters;
  var transforms;
  var preTransforms;
  var postTransforms;
  var platformIsPreTag;
  var platformMustUseProp;
  var platformGetTagNamespace;
  var maybeComponent;
  function createASTElement(tag, attrs, parent) {
      return {
          type: 1,
          tag: tag,
          attrsList: attrs,
          attrsMap: makeAttrsMap(attrs),
          rawAttrsMap: {},
          parent: parent,
          children: []
      };
  }
  /**
   * Convert HTML string to AST.
   */
  function parse(template, options) {
      warn$1 = options.warn || baseWarn;
      platformIsPreTag = options.isPreTag || no;
      platformMustUseProp = options.mustUseProp || no;
      platformGetTagNamespace = options.getTagNamespace || no;
      var isReservedTag = options.isReservedTag || no;
      maybeComponent = function (el) { return !!el.component || !isReservedTag(el.tag); };
      transforms = pluckModuleFunction(options.modules, 'transformNode');
      preTransforms = pluckModuleFunction(options.modules, 'preTransformNode');
      postTransforms = pluckModuleFunction(options.modules, 'postTransformNode');
      delimiters = options.delimiters;
      var stack = [];
      var preserveWhitespace = options.preserveWhitespace !== false;
      var whitespaceOption = options.whitespace;
      var root;
      var currentParent;
      var inVPre = false;
      var inPre = false;
      var warned = false;
      function warnOnce(msg, range) {
          if (!warned) {
              warned = true;
              warn$1(msg, range);
          }
      }
      function closeElement(element) {
          if (!inVPre && !element.processed) {
              element = processElement(element, options);
          }
          // tree management
          // root 带 if 的处理
          if (!stack.length && element !== root) {
              // allow root elements with v-if, v-else-if and v-else
              if (root.if && (element.elseif || element.else)) {
                  {
                      checkRootConstraints(element);
                  }
                  addIfCondition(root, {
                      exp: element.elseif,
                      block: element
                  });
              }
              else {
                  warnOnce("Component template should contain exactly one root element. " +
                      "If you are using v-if on multiple elements, " +
                      "use v-else-if to chain them instead.", { start: element.start });
              }
          }
          if (currentParent && !element.forbidden) {
              if (element.elseif || element.else) {
                  processIfConditions(element, currentParent);
              }
              else if (element.slotScope) { // scoped slot
                  var name_1 = element.slotTarget || '"default"';
                  (currentParent.scopedSlots || (currentParent.scopedSlots = {}))[name_1] = element;
              }
              else {
                  currentParent.children.push(element);
                  element.parent = currentParent;
              }
          }
          // check pre state
          if (element.pre) {
              inVPre = false;
          }
          if (platformIsPreTag(element.tag)) {
              inPre = false;
          }
          // apply post-transforms
          for (var i = 0; i < postTransforms.length; i++) {
              postTransforms[i](element, options);
          }
      }
      function checkRootConstraints(el) {
          if (el.tag === 'slot' || el.tag === 'template') {
              warnOnce("Cannot use <" + el.tag + "> as component root element because it may " +
                  'contain multiple nodes.', { start: el.start });
          }
          if (hasOwn(el.attrsMap, 'v-for')) {
              warnOnce('Cannot use v-for on stateful component root element because ' +
                  'it renders multiple elements.', el.rawAttrsMap['v-for']);
          }
      }
      parseHTML(template, {
          warn: warn$1,
          expectHTML: options.expectHTML,
          isUnaryTag: options.isUnaryTag,
          canBeLeftOpenTag: options.canBeLeftOpenTag,
          shouldDecodeNewlines: options.shouldDecodeNewlines,
          shouldDecodeNewlinesForHref: options.shouldDecodeNewlinesForHref,
          shouldKeepComment: options.comments,
          outputSourceRange: options.outputSourceRange,
          start: function (tag, attrs, unary, start, end) {
              // check namespace.
              // inherit parent ns if there is one
              var ns = (currentParent && currentParent.ns) || platformGetTagNamespace(tag);
              // handle IE svg bug
              /* istanbul ignore if */
              if (isIE && ns === 'svg') {
                  attrs = guardIESVGBug(attrs);
              }
              var element = createASTElement(tag, attrs, currentParent);
              if (ns) {
                  element.ns = ns;
              }
              if ( options.outputSourceRange) {
                  element.start = start;
                  element.rawAttrsMap = element.attrsList.reduce(function (cumulated, attr) {
                      cumulated[attr.name] = attr;
                      return cumulated;
                  }, {});
              }
              if (isForbiddenTag(element) && !isServerRendering()) {
                  element.forbidden = true;
                   warn$1('Templates should only be responsible for mapping the state to the ' +
                      'UI. Avoid placing tags with side-effects in your templates, such as ' +
                      ("<" + tag + ">") + ', as they will not be parsed.', { start: element.start });
              }
              // apply pre-transforms
              for (var i = 0; i < preTransforms.length; i++) {
                  element = preTransforms[i](element, options) || element;
              }
              if (!inVPre) {
                  processPre(element);
                  if (element.pre) {
                      inVPre = true;
                  }
              }
              if (platformIsPreTag(element.tag)) {
                  inPre = true;
              }
              if (inVPre) {
                  processRawAttrs(element);
              }
              else if (!element.processed) {
                  // structural directives
                  processFor(element);
                  processIf(element);
                  processOnce(element);
              }
              if (!root) {
                  root = element;
                  {
                      checkRootConstraints(root);
                  }
              }
              if (!unary) {
                  currentParent = element;
                  stack.push(element);
              }
              else {
                  closeElement(element);
              }
          },
          end: function (tag, start, end) {
              var element = stack[stack.length - 1];
              if (!inPre) {
                  // remove trailing whitespace node
                  var lastNode = element.children[element.children.length - 1];
                  if (lastNode && lastNode.type === 3 && lastNode.text === ' ') {
                      element.children.pop();
                  }
              }
              // pop stack
              stack.length -= 1;
              currentParent = stack[stack.length - 1];
              if ( options.outputSourceRange) {
                  element.end = end;
              }
              closeElement(element);
          },
          chars: function (text, start, end) {
              if (!currentParent) {
                  {
                      if (text === template) {
                          warnOnce('Component template requires a root element, rather than just text.', { start: start });
                      }
                      else if ((text = text.trim())) {
                          warnOnce("text \"" + text + "\" outside root element will be ignored.", { start: start });
                      }
                  }
                  return;
              }
              // IE textarea placeholder bug
              /* istanbul ignore if */
              if (isIE &&
                  currentParent.tag === 'textarea' &&
                  currentParent.attrsMap.placeholder === text) {
                  return;
              }
              var children = currentParent.children;
              if (inPre || text.trim()) {
                  text = isTextTag(currentParent) ? text : decodeHTMLCached(text);
              }
              else if (!children.length) {
                  // remove the whitespace-only node right after an opening tag
                  text = '';
              }
              else if (whitespaceOption) {
                  if (whitespaceOption === 'condense') {
                      // in condense mode, remove the whitespace node if it contains
                      // line break, otherwise condense to a single space
                      text = lineBreakRE.test(text) ? '' : ' ';
                  }
                  else {
                      text = ' ';
                  }
              }
              else {
                  text = preserveWhitespace ? ' ' : '';
              }
              if (text) {
                  if (whitespaceOption === 'condense') {
                      // condense consecutive whitespaces into single space
                      text = text.replace(whitespaceRE, ' ');
                  }
                  var res = void 0;
                  var child = void 0;
                  if (!inVPre && text !== ' ' && (res = parseText(text, delimiters))) {
                      child = {
                          type: 2,
                          expression: res.expression,
                          tokens: res.tokens,
                          text: text
                      };
                  }
                  else if (text !== ' ' || !children.length || children[children.length - 1].text !== ' ') {
                      child = {
                          type: 3,
                          text: text
                      };
                  }
                  if (child) {
                      if ( options.outputSourceRange) {
                          child.start = start;
                          child.end = end;
                      }
                      children.push(child);
                  }
              }
          },
          comment: function (text, start, end) {
              var child = {
                  type: 3,
                  text: text,
                  isComment: true
              };
              if ( options.outputSourceRange) {
                  child.start = start;
                  child.end = end;
              }
              currentParent.children.push(child);
          }
      });
      return root;
  }
  function processPre(el) {
      if (getAndRemoveAttr(el, 'v-pre') != null) {
          el.pre = true;
      }
  }
  function processRawAttrs(el) {
      var list = el.attrsList;
      var len = list.length;
      if (len) {
          var attrs = el.attrs = new Array(len);
          for (var i = 0; i < len; i++) {
              attrs[i] = {
                  name: list[i].name,
                  value: JSON.stringify(list[i].value)
              };
              if (list[i].start != null) {
                  attrs[i].start = list[i].start;
                  attrs[i].end = list[i].end;
              }
          }
      }
      else if (!el.pre) {
          // non root node in pre blocks with no attributes
          el.plain = true;
      }
  }
  function findPrevElement(children) {
      var i = children.length;
      while (i--) {
          if (children[i].type === 1) {
              return children[i];
          }
          else {
              if ( children[i].text !== ' ') {
                  warn$1("text \"" + children[i].text.trim() + "\" between v-if and v-else(-if) " +
                      "will be ignored.", children[i]);
              }
              children.pop();
          }
      }
  }
  function processIfConditions(el, parent) {
      var prev = findPrevElement(parent.children);
      if (prev && prev.if) {
          addIfCondition(prev, {
              exp: el.elseif,
              block: el
          });
      }
      else {
          warn$1("v-" + (el.elseif ? ('else-if="' + el.elseif + '"') : 'else') + " " +
              ("used on element <" + el.tag + "> without corresponding v-if."), el.rawAttrsMap[el.elseif ? 'v-else-if' : 'v-else']);
      }
  }
  function processElement(element, options) {
      processKey(element);
      // determine whether this is a plain element after
      // removing structural attributes
      element.plain = (!element.key &&
          !element.scopedSlots &&
          !element.attrsList.length);
      processRef(element);
      processSlot(element);
      processComponent(element);
      for (var i = 0; i < transforms.length; i++) {
          element = transforms[i](element, options) || element;
      }
      processAttrs(element);
      return element;
  }
  function processKey(el) {
      var exp = getBindingAttr(el, 'key');
      if (exp) {
          {
              if (el.tag === 'template') {
                  warn$1("<template> cannot be keyed. Place the key on real elements instead.", getRawBindingAttr(el, 'key'));
              }
              if (el.for) {
                  var iterator = el.iterator2 || el.iterator1;
                  var parent_1 = el.parent;
                  if (iterator && iterator === exp && parent_1 && parent_1.tag === 'transition-group') {
                      warn$1("Do not use v-for index as key on <transition-group> children, " +
                          "this is the same as not using keys.", getRawBindingAttr(el, 'key'), true /* tip */);
                  }
              }
          }
          el.key = exp;
      }
  }
  // el.ref && el.refInFor 
  function processRef(el) {
      var ref = getBindingAttr(el, 'ref');
      if (ref) {
          el.ref = ref;
          el.refInFor = checkInFor(el);
      }
  }
  function checkInFor(el) {
      var parent = el;
      while (parent) {
          if (parent.for !== undefined) {
              return true;
          }
          parent = parent.parent;
      }
      return false;
  }
  // 解析 <slot>  <xx slot-scope="">
  // slotName => <slot name="xx"></slot>
  // slotTarget => <xx slot="xx"></xx>
  // slotScope => <xx slot-scope="val"></xx>
  function processSlot(el) {
      if (el.tag === 'slot') {
          el.slotName = getBindingAttr(el, 'name');
          if ( el.key) {
              warn$1("`key` does not work on <slot> because slots are abstract outlets " +
                  "and can possibly expand into multiple elements. " +
                  "Use the key on a wrapping element instead.", getRawBindingAttr(el, 'key'));
          }
      }
      else {
          var slotScope = void 0;
          if (el.tag === 'template') {
              slotScope = getAndRemoveAttr(el, 'scope');
              /* istanbul ignore if */
              if ( slotScope) {
                  warn$1("the \"scope\" attribute for scoped slots have been deprecated and " +
                      "replaced by \"slot-scope\" since 2.5. The new \"slot-scope\" attribute " +
                      "can also be used on plain elements in addition to <template> to " +
                      "denote scoped slots.", el.rawAttrsMap['scope'], true);
              }
              el.slotScope = slotScope || getAndRemoveAttr(el, 'slot-scope');
          }
          else if ((slotScope = getAndRemoveAttr(el, 'slot-scope'))) {
              /* istanbul ignore if */
              if ( el.attrsMap['v-for']) {
                  warn$1("Ambiguous combined usage of slot-scope and v-for on <" + el.tag + "> " +
                      "(v-for takes higher priority). Use a wrapper <template> for the " +
                      "scoped slot to make it clearer.", el.rawAttrsMap['slot-scope'], true);
              }
              el.slotScope = slotScope;
              if ( nodeHas$Slot(el)) {
                  warn$1('Unepxected mixed usage of `slot-scope` and `$slot`.', el);
              }
          }
          else {
              // 2.6 $slot support
              // Context: https://github.com/vuejs/vue/issues/9180
              // Ideally, all slots should be compiled as functions (this is what we
              // are doing in 3.x), but for 2.x e want to preserve complete backwards
              // compatibility, and maintain the exact same compilation output for any
              // code that does not use the new syntax.
              // recursively check component children for presence of `$slot` in all
              // expressions until running into a nested child component.
              if (maybeComponent(el) && childrenHas$Slot(el)) {
                  processScopedSlots(el);
              }
          }
          var slotTarget = getBindingAttr(el, 'slot');
          if (slotTarget) {
              el.slotTarget = slotTarget === '""' ? '"default"' : slotTarget;
              // preserve slot as an attribute for native shadow DOM compat
              // only for non-scoped slots.
              if (el.tag !== 'template' && !el.slotScope && !nodeHas$Slot(el)) {
                  addAttr(el, 'slot', slotTarget, getRawBindingAttr(el, 'slot'));
              }
          }
      }
  }
  function childrenHas$Slot(el) {
      return el.children ? el.children.some(nodeHas$Slot) : false;
  }
  var $slotRE = /(^|[^\w_$])\$slot($|[^\w_$])/;
  // 判断节点 attrsMap[key：[v- , : , @ \.]] || {{ ... }} 是否 引用 $slot
  function nodeHas$Slot(node) {
      // caching
      if (hasOwn(node, 'has$Slot')) {
          return (node.has$Slot);
      }
      if (node.type === 1) { // element
          for (var key in node.attrsMap) {
              if (dirRE.test(key) && $slotRE.test(node.attrsMap[key])) {
                  return (node.has$Slot = true);
              }
          }
          return (node.has$Slot = childrenHas$Slot(node));
      }
      else if (node.type === 2) { // expression
          // TODO more robust logic for checking $slot usage
          return (node.has$Slot = $slotRE.test(node.expression));
      }
      return false;
  }
  // 生成 el.scopedSlots , el.scopedSlots[name].children = group
  // 过滤 el.children <=> group
  function processScopedSlots(el) {
      // 1. group children by slot target
      var groups = {};
      for (var i = 0; i < el.children.length; i++) {
          var child = el.children[i];
          var target = child.slotTarget || '"default"';
          if (!groups[target]) {
              groups[target] = [];
          }
          groups[target].push(child);
      }
      var _loop_1 = function (name_2) {
          var group = groups[name_2];
          if (group.some(nodeHas$Slot)) {
              // 3. if a group contains $slot, all nodes in that group gets assigned
              // as a scoped slot to el and removed from children
              el.plain = false;
              var slots = el.scopedSlots || (el.scopedSlots = {});
              var slotContainer = slots[name_2] = createASTElement('template', [], el);
              slotContainer.children = group;
              slotContainer.slotScope = '$slot';
              el.children = el.children.filter(function (c) { return group.indexOf(c) === -1; });
          }
      };
      // 2. for each slot group, check if the group contains $slot
      for (var name_2 in groups) {
          _loop_1(name_2);
      }
  }
  function addIfCondition(el, condition) {
      if (!el.ifConditions) {
          el.ifConditions = [];
      }
      el.ifConditions.push(condition);
  }
  function processOnce(el) {
      var once = getAndRemoveAttr(el, 'v-once');
      if (once != null) {
          el.once = true;
      }
  }
  // 解析 v-for="(alias,iterator1,iterator2) in for"
  function parseFor(exp) {
      var inMatch = exp.match(forAliasRE);
      if (!inMatch)
          return;
      var res = {};
      res.for = inMatch[2].trim();
      var alias = inMatch[1].trim().replace(stripParensRE, '');
      var iteratorMatch = alias.match(forIteratorRE);
      if (iteratorMatch) {
          res.alias = alias.replace(forIteratorRE, '').trim();
          res.iterator1 = iteratorMatch[1].trim();
          if (iteratorMatch[2]) {
              res.iterator2 = iteratorMatch[2].trim();
          }
      }
      else {
          res.alias = alias;
      }
      return res;
  }
  function processFor(el) {
      var exp;
      if ((exp = getAndRemoveAttr(el, 'v-for'))) {
          var res = parseFor(exp);
          if (res) {
              extend(el, res);
          }
          else {
              warn$1("Invalid v-for expression: " + exp, el.rawAttrsMap['v-for']);
          }
      }
  }
  function processIf(el) {
      var exp = getAndRemoveAttr(el, 'v-if');
      if (exp) {
          el.if = exp;
          addIfCondition(el, {
              exp: exp,
              block: el
          });
      }
      else {
          if (getAndRemoveAttr(el, 'v-else') != null) {
              el.else = true;
          }
          var elseif = getAndRemoveAttr(el, 'v-else-if');
          if (elseif) {
              el.elseif = elseif;
          }
      }
  }
  function processComponent(el) {
      var binding;
      if ((binding = getBindingAttr(el, 'is'))) {
          el.component = binding;
      }
      if (getAndRemoveAttr(el, 'inline-template') != null) {
          el.inlineTemplate = true;
      }
  }
  function processAttrs(el) {
      var list = el.attrsList;
      var i, l, name, rawName, value, modifiers, isProp, syncGen;
      for (i = 0, l = list.length; i < l; i++) {
          name = rawName = list[i].name;
          value = list[i].value;
          if (dirRE.test(name)) {
              // mark element as dynamic
              el.hasBindings = true;
              // modifiers
              modifiers = parseModifiers(name.replace(dirRE, ''));
              // support .foo shorthand syntax for the .prop modifier
              if (propBindRE.test(name)) {
                  (modifiers || (modifiers = {})).prop = true;
                  name = "." + name.slice(1).replace(modifierRE, '');
                  // name.prop => name
              }
              else if (modifiers) {
                  name = name.replace(modifierRE, '');
              }
              if (bindRE.test(name)) { // v-bind
                  name = name.replace(bindRE, '');
                  value = parseFilters(value);
                  isProp = false;
                  if (
                      value.trim().length === 0) {
                      warn$1("The value for a v-bind expression cannot be empty. Found in \"v-bind:" + name + "\"");
                  }
                  if (modifiers) {
                      if (modifiers.prop) {
                          isProp = true;
                          name = camelize(name);
                          if (name === 'innerHtml')
                              name = 'innerHTML';
                      }
                      if (modifiers.camel) {
                          name = camelize(name);
                      }
                      if (modifiers.sync) {
                          syncGen = genAssignmentCode(value, "$event");
                          addHandler(el, "update:" + camelize(name), syncGen, null, false, warn$1, list[i]);
                          if (hyphenate(name) !== camelize(name)) {
                              addHandler(el, "update:" + hyphenate(name), syncGen, null, false, warn$1, list[i]);
                          }
                      }
                  }
                  if (isProp || (!el.component && platformMustUseProp(el.tag, el.attrsMap.type, name))) {
                      addProp(el, name, value, list[i]);
                  }
                  else {
                      addAttr(el, name, value, list[i]);
                  }
              }
              else if (onRE.test(name)) { // v-on
                  name = name.replace(onRE, '');
                  addHandler(el, name, value, modifiers, false, warn$1, list[i]);
              }
              else { // normal directives
                  name = name.replace(dirRE, '');
                  // parse arg
                  var argMatch = name.match(argRE);
                  var arg = argMatch && argMatch[1];
                  if (arg) {
                      name = name.slice(0, -(arg.length + 1));
                  }
                  addDirective(el, name, rawName, value, arg, modifiers, list[i]);
                  if ( name === 'model') {
                      checkForAliasModel(el, value);
                  }
              }
          }
          else {
              // literal attribute
              {
                  var res = parseText(value, delimiters);
                  if (res) {
                      warn$1(name + "=\"" + value + "\": " +
                          'Interpolation inside attributes has been removed. ' +
                          'Use v-bind or the colon shorthand instead. For example, ' +
                          'instead of <div id="{{ val }}">, use <div :id="val">.', list[i]);
                  }
              }
              addAttr(el, name, JSON.stringify(value), list[i]);
              // #6887 firefox doesn't update muted state if set via attribute
              // even immediately after element creation
              if (!el.component &&
                  name === 'muted' &&
                  platformMustUseProp(el.tag, el.attrsMap.type, name)) {
                  addProp(el, name, 'true', list[i]);
              }
          }
      }
  }
  // for script (e.g. type="x/template") or style, do not decode content
  function isTextTag(el) {
      return el.tag === 'script' || el.tag === 'style';
  }
  function isForbiddenTag(el) {
      return (el.tag === 'style' ||
          (el.tag === 'script' && (!el.attrsMap.type ||
              el.attrsMap.type === 'text/javascript')));
  }
  function makeAttrsMap(attrs) {
      var map = {};
      for (var i = 0, l = attrs.length; i < l; i++) {
          if (
              map[attrs[i].name] && !isIE && !isEdge) {
              warn$1('duplicate attribute: ' + attrs[i].name, attrs[i]);
          }
          map[attrs[i].name] = attrs[i].value;
      }
      return map;
  }
  // 返回 [.prop] => {prop:true}
  function parseModifiers(name) {
      var match = name.match(modifierRE);
      if (match) {
          var ret_1 = {};
          match.forEach(function (m) { ret_1[m.slice(1)] = true; });
          return ret_1;
      }
  }
  var ieNSBug = /^xmlns:NS\d+/;
  var ieNSPrefix = /^NS\d+:/;
  /* istanbul ignore next */
  function guardIESVGBug(attrs) {
      var res = [];
      for (var i = 0; i < attrs.length; i++) {
          var attr = attrs[i];
          if (!ieNSBug.test(attr.name)) {
              attr.name = attr.name.replace(ieNSPrefix, '');
              res.push(attr);
          }
      }
      return res;
  }
  function checkForAliasModel(el, value) {
      var _el = el;
      while (_el) {
          if (_el.for && _el.alias === value) {
              warn$1("<" + el.tag + " v-model=\"" + value + "\">: " +
                  "You are binding v-model directly to a v-for iteration alias. " +
                  "This will not be able to modify the v-for source array because " +
                  "writing to the alias is like modifying a function local variable. " +
                  "Consider using an array of objects and use v-model on an object property instead.", el.rawAttrsMap['v-model']);
          }
          _el = _el.parent;
      }
  }

  // 处理input的type,为其不同类型新增 ifConditions;
  // 如果本身就有 if,else if , else 则合并到 branch0
  function preTransformNode(el, options) {
      if (el.tag === 'input') {
          var map = el.attrsMap;
          if (!map['v-model']) {
              return;
          }
          var typeBinding = void 0;
          if (map[':type'] || map['v-bind:type']) {
              typeBinding = getBindingAttr(el, 'type');
          }
          if (!map.type && !typeBinding && map['v-bind']) {
              typeBinding = "(" + map['v-bind'] + ").type";
          }
          if (typeBinding) {
              var ifCondition = getAndRemoveAttr(el, 'v-if', true);
              var ifConditionExtra = ifCondition ? "&&(" + ifCondition + ")" : "";
              var hasElse = getAndRemoveAttr(el, 'v-else', true) != null;
              var elseIfCondition = getAndRemoveAttr(el, 'v-else-if', true);
              // 1. checkbox
              var branch0 = cloneASTElement(el);
              // process for on the main node
              processFor(branch0);
              addRawAttr(branch0, 'type', 'checkbox');
              processElement(branch0, options);
              branch0.processed = true; // prevent it from double-processed
              branch0.if = "(" + typeBinding + ")==='checkbox'" + ifConditionExtra;
              addIfCondition(branch0, {
                  exp: branch0.if,
                  block: branch0
              });
              // 2. add radio else-if condition
              var branch1 = cloneASTElement(el);
              getAndRemoveAttr(branch1, 'v-for', true);
              addRawAttr(branch1, 'type', 'radio');
              processElement(branch1, options);
              addIfCondition(branch0, {
                  exp: "(" + typeBinding + ")==='radio'" + ifConditionExtra,
                  block: branch1
              });
              // 3. other
              var branch2 = cloneASTElement(el);
              getAndRemoveAttr(branch2, 'v-for', true);
              addRawAttr(branch2, ':type', typeBinding);
              processElement(branch2, options);
              addIfCondition(branch0, {
                  exp: ifCondition,
                  block: branch2
              });
              if (hasElse) {
                  branch0.else = true;
              }
              else if (elseIfCondition) {
                  branch0.elseif = elseIfCondition;
              }
              return branch0;
          }
      }
  }
  function cloneASTElement(el) {
      return createASTElement(el.tag, el.attrsList.slice(), el.parent);
  }
  var model = {
      preTransformNode: preTransformNode
  };

  var modules = [
      klass,
      style,
      model
  ];

  var warn$2;
  // in some cases, the event used has to be determined at runtime
  // so we used some reserved tokens during compile.
  var RANGE_TOKEN = '__r';
  function model$1(el, dir, _warn) {
      warn$2 = _warn;
      var value = dir.value;
      var modifiers = dir.modifiers;
      var tag = el.tag;
      var type = el.attrsMap.type;
      {
          // inputs with type="file" are read only and setting the input's
          // value will throw an error.
          if (tag === 'input' && type === 'file') {
              warn$2("<" + el.tag + " v-model=\"" + value + "\" type=\"file\">:\n" +
                  "File inputs are read only. Use a v-on:change listener instead.", el.rawAttrsMap['v-model']);
          }
      }
      if (el.component) {
          genComponentModel(el, value, modifiers);
          // component v-model doesn't need extra runtime
          return false;
      }
      else if (tag === 'select') {
          genSelect(el, value, modifiers);
      }
      else if (tag === 'input' && type === 'checkbox') {
          genCheckboxModel(el, value, modifiers);
      }
      else if (tag === 'input' && type === 'radio') {
          genRadioModel(el, value, modifiers);
      }
      else if (tag === 'input' || tag === 'textarea') {
          genDefaultModel(el, value, modifiers);
      }
      else if (!config.isReservedTag(tag)) {
          genComponentModel(el, value, modifiers);
          // component v-model doesn't need extra runtime
          return false;
      }
      else {
          warn$2("<" + el.tag + " v-model=\"" + value + "\">: " +
              "v-model is not supported on this element type. " +
              'If you are working with contenteditable, it\'s recommended to ' +
              'wrap a library dedicated for that purpose inside a custom component.', el.rawAttrsMap['v-model']);
      }
      // ensure runtime directive metadata
      return true;
  }
  // change 中获取选中的 option
  function genSelect(el, value, modifiers) {
      var number = modifiers && modifiers.number;
      var selectedVal = "Array.prototype.filter" +
          ".call($event.target.options,function(o){return o.selected})" +
          ".map(function(o){var val = \"_value\" in o ? o._value : o.value;" +
          ("return " + (number ? '_n(val)' : 'val') + "})");
      var assignment = '$event.target.multiple ? $$selectedVal : $$selectedVal[0]';
      var code = "var $$selectedVal = " + selectedVal + ";";
      code = code + " " + genAssignmentCode(value, assignment);
      addHandler(el, 'change', code, null, true);
  }
  // el.true-value , el.false-value
  // 根据 value 类型确定当前 el.checked
  // change 时根据类型改变 value 
  // (当使用 true-val || false-val 并且 value !== arr) value 会更新为 false-val
  function genCheckboxModel(el, value, modifiers) {
      var number = modifiers && modifiers.number;
      var valueBinding = getBindingAttr(el, 'value') || 'null';
      var trueValueBinding = getBindingAttr(el, 'true-value') || 'true';
      var falseValueBinding = getBindingAttr(el, 'false-value') || 'false';
      addProp(el, 'checked', "Array.isArray(" + value + ")" +
          ("?_i(" + value + "," + valueBinding + ")>-1") + (trueValueBinding === 'true'
          ? ":(" + value + ")"
          : ":_q(" + value + "," + trueValueBinding + ")"));
      addHandler(el, 'change', "var $$a=" + value + "," +
          '$$el=$event.target,' +
          ("$$c=$$el.checked?(" + trueValueBinding + "):(" + falseValueBinding + ");") +
          'if(Array.isArray($$a)){' +
          ("var $$v=" + (number ? '_n(' + valueBinding + ')' : valueBinding) + ",") +
          '$$i=_i($$a,$$v);' +
          ("if($$el.checked){$$i<0&&(" + genAssignmentCode(value, '$$a.concat([$$v])') + ")}") +
          ("else{$$i>-1&&(" + genAssignmentCode(value, '$$a.slice(0,$$i).concat($$a.slice($$i+1))') + ")}") +
          ("}else{" + genAssignmentCode(value, '$$c') + "}"), null, true);
  }
  function genRadioModel(el, value, modifiers) {
      var number = modifiers && modifiers.number;
      var valueBinding = getBindingAttr(el, 'value') || 'null';
      valueBinding = number ? "_n(" + valueBinding + ")" : valueBinding;
      addProp(el, 'checked', "_q(" + value + "," + valueBinding + ")");
      addHandler(el, 'change', genAssignmentCode(value, valueBinding), null, true);
  }
  function genDefaultModel(el, value, modifiers) {
      var type = el.attrsMap.type;
      // warn if v-bind:value conflicts with v-model
      // except for inputs with v-bind:type
      {
          var value_1 = el.attrsMap['v-bind:value'] || el.attrsMap[':value'];
          var typeBinding = el.attrsMap['v-bind:type'] || el.attrsMap[':type'];
          if (value_1 && !typeBinding) {
              var binding = el.attrsMap['v-bind:value'] ? 'v-bind:value' : ':value';
              warn$2(binding + "=\"" + value_1 + "\" conflicts with v-model on the same element " +
                  'because the latter already expands to a value binding internally', el.rawAttrsMap[binding]);
          }
      }
      var _a = modifiers || {}, lazy = _a.lazy, number = _a.number, trim = _a.trim;
      var needCompositionGuard = !lazy && type !== 'range';
      var event = lazy
          ? 'change'
          : type === 'range'
              ? RANGE_TOKEN
              : 'input';
      var valueExpression = '$event.target.value';
      if (trim) {
          valueExpression = "$event.target.value.trim()";
      }
      if (number) {
          valueExpression = "_n(" + valueExpression + ")";
      }
      var code = genAssignmentCode(value, valueExpression);
      if (needCompositionGuard) {
          code = "if($event.target.composing)return;" + code;
      }
      addProp(el, 'value', "(" + value + ")");
      addHandler(el, event, code, null, true);
      if (trim || number) {
          addHandler(el, 'blur', '$forceUpdate()');
      }
  }

  function text(el, dir) {
      if (dir.value) {
          addProp(el, 'textContent', "_s(" + dir.value + ")", dir);
      }
  }

  function html(el, dir) {
      if (dir.value) {
          addProp(el, 'innerHTML', "_s(" + dir.value + ")", dir);
      }
  }

  var directives = {
      model: model$1,
      text: text,
      html: html
  };

  var baseOptions = {
      expectHTML: true,
      modules: modules,
      directives: directives,
      isPreTag: isPreTag,
      isUnaryTag: isUnaryTag,
      mustUseProp: mustUseProp,
      canBeLeftOpenTag: canBeLeftOpenTag,
      isReservedTag: isReservedTag,
      getTagNamespace: getTagNamespace,
      staticKeys: genStaticKeys(modules)
  };

  var isStaticKey;
  var isPlatformReservedTag;
  var genStaticKeysCached = cached(genStaticKeys$1);
  /**
   * Goal of the optimizer: walk the generated template AST tree
   * and detect sub-trees that are purely static, i.e. parts of
   * the DOM that never needs to change.
   *
   * Once we detect these sub-trees, we can:
   *
   * 1. Hoist them into constants, so that we no longer need to
   *    create fresh nodes for them on each re-render;
   * 2. Completely skip them in the patching process.
   */
  function optimize(root, options) {
      if (!root)
          return;
      isStaticKey = genStaticKeysCached(options.staticKeys || '');
      isPlatformReservedTag = options.isReservedTag || no;
      // first pass: mark all non-static nodes.
      markStatic(root);
      // second pass: mark static roots.
      markStaticRoots(root, false);
  }
  function genStaticKeys$1(keys) {
      return makeMap('type,tag,attrsList,attrsMap,plain,parent,children,attrs,start,end,rawAttrsMap,has$Slot' +
          (keys ? ',' + keys : ''));
  }
  // 确定当前节点是否 static , 如果子节点非 static,父节点也会更新 
  function markStatic(node) {
      node.static = isStatic(node);
      if (node.type === 1) {
          // do not make component slot content static. this avoids
          // 1. components not able to mutate slot nodes
          // 2. static slot content fails for hot-reloading
          if (!isPlatformReservedTag(node.tag) &&
              !node.component &&
              node.tag !== 'slot' &&
              node.attrsMap['inline-template'] == null) {
              return;
          }
          for (var i = 0, l = node.children.length; i < l; i++) {
              var child = node.children[i];
              markStatic(child);
              if (!child.static) {
                  node.static = false;
              }
          }
          if (node.ifConditions) {
              for (var i = 1, l = node.ifConditions.length; i < l; i++) {
                  var block = node.ifConditions[i].block;
                  markStatic(block);
                  if (!block.static) {
                      node.static = false;
                  }
              }
          }
      }
  }
  // 确定 staticInFor
  // node.static && children.length && (chidlren > 1 || chidren[0] 不属于 text) 则为staticRoot
  // 更新 children && if 表达式的 staticRoot
  function markStaticRoots(node, isInFor) {
      if (node.type === 1) {
          if (node.static || node.once) {
              node.staticInFor = isInFor;
          }
          // For a node to qualify as a static root, it should have children that
          // are not just static text. Otherwise the cost of hoisting out will
          // outweigh the benefits and it's better off to just always render it fresh.
          if (node.static && node.children.length && !(node.children.length === 1 &&
              node.children[0].type === 3)) {
              node.staticRoot = true;
              return;
          }
          else {
              node.staticRoot = false;
          }
          if (node.children) {
              for (var i = 0, l = node.children.length; i < l; i++) {
                  markStaticRoots(node.children[i], isInFor || !!node.for);
              }
          }
          if (node.ifConditions) {
              for (var i = 1, l = node.ifConditions.length; i < l; i++) {
                  markStaticRoots(node.ifConditions[i].block, isInFor);
              }
          }
      }
  }
  // 判断节点是否 static
  function isStatic(node) {
      if (node.type === 2) { // expression
          return false;
      }
      if (node.type === 3) { // text
          return true;
      }
      return !!(node.pre || (!node.hasBindings && // no dynamic bindings
          !node.if && !node.for && // not v-if or v-for or v-else
          !isBuiltInTag(node.tag) && // not a built-in
          isPlatformReservedTag(node.tag) && // not a component
          !isDirectChildOfTemplateFor(node) &&
          Object.keys(node).every(isStaticKey)));
  }
  // 有 for 或 所有父级 tag = template
  function isDirectChildOfTemplateFor(node) {
      while (node.parent) {
          node = node.parent;
          if (node.tag !== 'template') {
              return false;
          }
          if (node.for) {
              return true;
          }
      }
      return false;
  }

  /* @flow */
  var fnExpRE = /^([\w$_]+|\([^)]*?\))\s*=>|^function\s*\(/;
  var fnInvokeRE = /\([^)]*?\);*$/;
  var simplePathRE = /^[A-Za-z_$][\w$]*(?:\.[A-Za-z_$][\w$]*|\['[^']*?']|\["[^"]*?"]|\[\d+]|\[[A-Za-z_$][\w$]*])*$/;
  // KeyboardEvent.keyCode aliases
  var keyCodes = {
      esc: 27,
      tab: 9,
      enter: 13,
      space: 32,
      up: 38,
      left: 37,
      right: 39,
      down: 40,
      'delete': [8, 46]
  };
  // KeyboardEvent.key aliases
  var keyNames = {
      // #7880: IE11 and Edge use `Esc` for Escape key name.
      esc: ['Esc', 'Escape'],
      tab: 'Tab',
      enter: 'Enter',
      // #9112: IE11 uses `Spacebar` for Space key name.
      space: [' ', 'Spacebar'],
      // #7806: IE11 uses key names without `Arrow` prefix for arrow keys.
      up: ['Up', 'ArrowUp'],
      left: ['Left', 'ArrowLeft'],
      right: ['Right', 'ArrowRight'],
      down: ['Down', 'ArrowDown'],
      // #9112: IE11 uses `Del` for Delete key name.
      'delete': ['Backspace', 'Delete', 'Del']
  };
  // #4868: modifiers that prevent the execution of the listener
  // need to explicitly return null so that we can determine whether to remove
  // the listener for .once
  var genGuard = function (condition) { return "if(" + condition + ")return null;"; };
  var modifierCode = {
      stop: '$event.stopPropagation();',
      prevent: '$event.preventDefault();',
      self: genGuard("$event.target !== $event.currentTarget"),
      ctrl: genGuard("!$event.ctrlKey"),
      shift: genGuard("!$event.shiftKey"),
      alt: genGuard("!$event.altKey"),
      meta: genGuard("!$event.metaKey"),
      left: genGuard("'button' in $event && $event.button !== 0"),
      middle: genGuard("'button' in $event && $event.button !== 1"),
      right: genGuard("'button' in $event && $event.button !== 2")
  };
  function genHandlers(events, isNative) {
      var res = isNative ? 'nativeOn:{' : 'on:{';
      for (var name_1 in events) {
          res += "\"" + name_1 + "\":" + genHandler(name_1, events[name_1]) + ",";
      }
      return res.slice(0, -1) + '}';
  }
  function genHandler(name, handler) {
      if (!handler) {
          return 'function(){}';
      }
      if (Array.isArray(handler)) {
          return "[" + handler.map(function (handler) { return genHandler(name, handler); }).join(',') + "]";
      }
      // @click = handleClick
      var isMethodPath = simplePathRE.test(handler.value);
      // @click = function(arg) { ... } 匿名函数
      var isFunctionExpression = fnExpRE.test(handler.value);
      // @click = xx();
      var isFunctionInvocation = simplePathRE.test(handler.value.replace(fnInvokeRE, ''));
      if (!handler.modifiers) {
          if (isMethodPath || isFunctionExpression) {
              return handler.value;
          }
          return "function($event){" + (isFunctionInvocation ? "return " + handler.value : handler.value) + "}"; // inline statement
      }
      else {
          var code = '';
          var genModifierCode = '';
          var keys = [];
          var _loop_1 = function (key) {
              if (modifierCode[key]) {
                  genModifierCode += modifierCode[key];
                  // left/right
                  if (keyCodes[key]) {
                      keys.push(key);
                  }
              }
              else if (key === 'exact') {
                  var modifiers_1 = (handler.modifiers);
                  genModifierCode += genGuard(['ctrl', 'shift', 'alt', 'meta']
                      .filter(function (keyModifier) { return !modifiers_1[keyModifier]; })
                      .map(function (keyModifier) { return "$event." + keyModifier + "Key"; })
                      .join('||'));
              }
              else {
                  keys.push(key);
              }
          };
          for (var key in handler.modifiers) {
              _loop_1(key);
          }
          if (keys.length) {
              code += genKeyFilter(keys);
          }
          // Make sure modifiers like prevent and stop get executed after key filtering
          if (genModifierCode) {
              code += genModifierCode;
          }
          var handlerCode = isMethodPath
              ? "return " + handler.value + "($event)"
              : isFunctionExpression
                  ? "return (" + handler.value + ")($event)"
                  : isFunctionInvocation
                      ? "return " + handler.value
                      : handler.value;
          return "function($event){" + code + handlerCode + "}";
      }
  }
  function genKeyFilter(keys) {
      return "if(!('button' in $event)&&" + keys.map(genFilterCode).join('&&') + ")return null;";
  }
  function genFilterCode(key) {
      var keyVal = parseInt(key, 10);
      if (keyVal) {
          return "$event.keyCode!==" + keyVal;
      }
      var keyCode = keyCodes[key];
      var keyName = keyNames[key];
      return ("_k($event.keyCode," +
          (JSON.stringify(key) + ",") +
          (JSON.stringify(keyCode) + ",") +
          "$event.key," +
          ("" + JSON.stringify(keyName)) +
          ")");
  }

  // v-on = obj
  function on(el, dir) {
      if ( dir.modifiers) {
          warn("v-on without argument does not support modifiers.");
      }
      el.wrapListeners = function (code) { return "_g(" + code + "," + dir.value + ")"; };
  }

  function bind$1(el, dir) {
      el.wrapData = function (code) {
          return "_b(" + code + ",'" + el.tag + "'," + dir.value + "," + (dir.modifiers && dir.modifiers.prop ? 'true' : 'false') + (dir.modifiers && dir.modifiers.sync ? ',true' : '') + ")";
      };
  }

  var baseDirectives = {
      on: on,
      bind: bind$1,
      cloak: noop
  };

  var CodegenState = /** @class */ (function () {
      function CodegenState(options) {
          this.options = options;
          this.warn = options.warn || baseWarn;
          this.transforms = pluckModuleFunction(options.modules, 'transformCode');
          this.dataGenFns = pluckModuleFunction(options.modules, 'genData');
          this.directives = extend(extend({}, baseDirectives), options.directives);
          var isReservedTag = options.isReservedTag || no;
          this.maybeComponent = function (el) { return !!el.component || !isReservedTag(el.tag); };
          this.onceId = 0;
          this.staticRenderFns = [];
          this.pre = false;
      }
      return CodegenState;
  }());
  function generate(ast, options) {
      var state = new CodegenState(options);
      var code = ast ? genElement(ast, state) : '_c("div")';
      return {
          render: "with(this){return " + code + "}",
          staticRenderFns: state.staticRenderFns
      };
  }
  function genElement(el, state) {
      if (el.parent) {
          el.pre = el.pre || el.parent.pre;
      }
      if (el.staticRoot && !el.staticProcessed) {
          return genStatic(el, state);
      }
      else if (el.once && !el.onceProcessed) {
          return genOnce(el, state);
      }
      else if (el.for && !el.forProcessed) {
          return genFor(el, state);
      }
      else if (el.if && !el.ifProcessed) {
          return genIf(el, state);
      }
      else if (el.tag === 'template' && !el.slotTarget && !state.pre) {
          return genChildren(el, state) || 'void 0';
      }
      else if (el.tag === 'slot') {
          return genSlot(el, state);
      }
      else {
          // component or element
          var code = void 0;
          if (el.component) {
              code = genComponent(el.component, el, state);
          }
          else {
              var data = void 0;
              if (!el.plain || (el.pre && state.maybeComponent(el))) {
                  data = genData$2(el, state);
              }
              var children = el.inlineTemplate ? null : genChildren(el, state, true);
              code = "_c('" + el.tag + "'" + (data ? "," + data : '' // data
              ) + (children ? "," + children : '' // children
              ) + ")";
          }
          // module transforms
          for (var i = 0; i < state.transforms.length; i++) {
              code = state.transforms[i](el, code);
          }
          return code;
      }
  }
  // hoist static sub-trees out
  function genStatic(el, state) {
      el.staticProcessed = true;
      // Some elements (templates) need to behave differently inside of a v-pre
      // node.  All pre nodes are static roots, so we can use this as a location to
      // wrap a state change and reset it upon exiting the pre node.
      var originalPreState = state.pre;
      if (el.pre) {
          state.pre = el.pre;
      }
      state.staticRenderFns.push("with(this){return " + genElement(el, state) + "}");
      state.pre = originalPreState;
      return "_m(" + (state.staticRenderFns.length - 1) + (el.staticInFor ? ',true' : '') + ")";
  }
  // v-once
  function genOnce(el, state) {
      el.onceProcessed = true;
      if (el.if && !el.ifProcessed) {
          return genIf(el, state);
      }
      else if (el.staticInFor) {
          var key = '';
          var parent_1 = el.parent;
          while (parent_1) {
              if (parent_1.for) {
                  key = parent_1.key;
                  break;
              }
              parent_1 = parent_1.parent;
          }
          if (!key) {
               state.warn("v-once can only be used inside v-for that is keyed. ", el.rawAttrsMap['v-once']);
              return genElement(el, state);
          }
          return "_o(" + genElement(el, state) + "," + state.onceId++ + "," + key + ")";
      }
      else {
          return genStatic(el, state);
      }
  }
  // 生成的 list 带有 _isVList
  function genFor(el, state, altGen, altHelper) {
      var exp = el.for;
      var alias = el.alias;
      var iterator1 = el.iterator1 ? "," + el.iterator1 : '';
      var iterator2 = el.iterator2 ? "," + el.iterator2 : '';
      if (
          state.maybeComponent(el) &&
          el.tag !== 'slot' &&
          el.tag !== 'template' &&
          !el.key) {
          state.warn("<" + el.tag + " v-for=\"" + alias + " in " + exp + "\">: component lists rendered with " +
              "v-for should have explicit keys. " +
              "See https://vuejs.org/guide/list.html#key for more info.", el.rawAttrsMap['v-for'], true /* tip */);
      }
      el.forProcessed = true; // avoid recursion
      return (altHelper || '_l') + "((" + exp + ")," +
          ("function(" + alias + iterator1 + iterator2 + "){") +
          ("return " + (altGen || genElement)(el, state)) +
          '})';
  }
  function genIf(el, state, altGen, altEmpty) {
      el.ifProcessed = true; // avoid recursion
      return genIfConditions(el.ifConditions.slice(), state, altGen, altEmpty);
  }
  // conditions[0].exp ? genElement(conditions[0]) : genIfconditions(...)
  function genIfConditions(conditions, state, altGen, altEmpty) {
      if (!conditions.length) {
          return altEmpty || '_e()';
      }
      var condition = conditions.shift();
      if (condition.exp) {
          return "(" + condition.exp + ")?" + genTernaryExp(condition.block) + ":" + genIfConditions(conditions, state, altGen, altEmpty);
      }
      else {
          return "" + genTernaryExp(condition.block);
      }
      // v-if with v-once should generate code like (a)?_m(0):_m(1)
      function genTernaryExp(el) {
          return altGen
              ? altGen(el, state)
              : el.once
                  ? genOnce(el, state)
                  : genElement(el, state);
      }
  }
  function genChildren(el, state, checkSkip, altGenElement, altGenNode) {
      var children = el.children;
      if (children.length) {
          var el_1 = children[0];
          // optimize single v-for
          if (children.length === 1 &&
              el_1.for &&
              el_1.tag !== 'template' &&
              el_1.tag !== 'slot') {
              var normalizationType_1 = checkSkip
                  ? state.maybeComponent(el_1) ? ",1" : ",0"
                  : "";
              return "" + (altGenElement || genElement)(el_1, state) + normalizationType_1;
          }
          var normalizationType = checkSkip
              ? getNormalizationType(children, state.maybeComponent)
              : 0;
          var gen_1 = altGenNode || genNode;
          return "[" + children.map(function (c) { return gen_1(c, state); }).join(',') + "]" + (normalizationType ? "," + normalizationType : '');
      }
  }
  // determine the normalization needed for the children array.
  // type != 1
  // 0: no normalization needed
  // 组件 || ifConditions 存在组件
  // 1: simple normalization needed (possible 1-level deep nested array)
  // needsNormalization || ifConditions 存在 needsNormalization()
  // 2: full normalization needed
  function getNormalizationType(children, maybeComponent) {
      var res = 0;
      for (var i = 0; i < children.length; i++) {
          var el = children[i];
          if (el.type !== 1) {
              continue;
          }
          if (needsNormalization(el) ||
              (el.ifConditions && el.ifConditions.some(function (c) { return needsNormalization(c.block); }))) {
              res = 2;
              break;
          }
          if (maybeComponent(el) ||
              (el.ifConditions && el.ifConditions.some(function (c) { return maybeComponent(c.block); }))) {
              res = 1;
          }
      }
      return res;
  }
  // v-for || template || slot
  function needsNormalization(el) {
      return el.for !== undefined || el.tag === 'template' || el.tag === 'slot';
  }
  function genNode(node, state) {
      if (node.type === 1) {
          return genElement(node, state);
      }
      else if (node.type === 3 && node.isComment) {
          return genComment(node);
      }
      else {
          return genText(node);
      }
  }
  function genText(text) {
      return "_v(" + (text.type === 2
          ? text.expression // no need for () because already wrapped in _s()
          : transformSpecialNewlines(JSON.stringify(text.text))) + ")";
  }
  function genComment(comment) {
      return "_e(" + JSON.stringify(comment.text) + ")";
  }
  // _t => 查找 $slot[name] , $scopedSlots[name] , children(内部 slot内容) 
  // 合并 attrs , v-bind =》 $scopedslots[name](propsObj)
  function genSlot(el, state) {
      var slotName = el.slotName || '"default"';
      var children = genChildren(el, state);
      var res = "_t(" + slotName + (children ? "," + children : '');
      var attrs = el.attrs && "{" + el.attrs.map(function (a) { return camelize(a.name) + ":" + a.value; }).join(',') + "}";
      var bind = el.attrsMap['v-bind'];
      if ((attrs || bind) && !children) {
          res += ",null";
      }
      if (attrs) {
          res += "," + attrs;
      }
      if (bind) {
          res += (attrs ? '' : ',null') + "," + bind;
      }
      return res + ')';
  }
  // componentName is el.component, take it as argument to shun flow's pessimistic refinement
  function genComponent(componentName, el, state) {
      var children = el.inlineTemplate ? null : genChildren(el, state, true);
      return "_c(" + componentName + "," + genData$2(el, state) + (children ? "," + children : '') + ")";
  }
  function genData$2(el, state) {
      var data = '{';
      // directives first.
      // directives may mutate the el's other properties before they are generated.
      var dirs = genDirectives(el, state);
      if (dirs)
          data += dirs + ',';
      // key
      if (el.key) {
          data += "key:" + el.key + ",";
      }
      // ref
      if (el.ref) {
          data += "ref:" + el.ref + ",";
      }
      if (el.refInFor) {
          data += "refInFor:true,";
      }
      // pre
      if (el.pre) {
          data += "pre:true,";
      }
      // record original tag name for components using "is" attribute
      if (el.component) {
          data += "tag:\"" + el.tag + "\",";
      }
      // module data generation functions
      for (var i = 0; i < state.dataGenFns.length; i++) {
          data += state.dataGenFns[i](el);
      }
      // attributes
      if (el.attrs) {
          data += "attrs:{" + genProps(el.attrs) + "},";
      }
      // DOM props
      if (el.props) {
          data += "domProps:{" + genProps(el.props) + "},";
      }
      // event handlers
      if (el.events) {
          data += genHandlers(el.events, false) + ",";
      }
      if (el.nativeEvents) {
          data += genHandlers(el.nativeEvents, true) + ",";
      }
      // slot target
      // only for non-scoped slots
      if (el.slotTarget && !el.slotScope) {
          data += "slot:" + el.slotTarget + ",";
      }
      // scoped slots
      if (el.scopedSlots) {
          data += genScopedSlots(el.scopedSlots, state) + ",";
      }
      // component v-model
      if (el.model) {
          data += "model:{value:" + el.model.value + ",callback:" + el.model.callback + ",expression:" + el.model.expression + "},";
      }
      // inline-template
      if (el.inlineTemplate) {
          var inlineTemplate = genInlineTemplate(el, state);
          if (inlineTemplate) {
              data += inlineTemplate + ",";
          }
      }
      data = data.replace(/,$/, '') + '}';
      // v-bind data wrap
      if (el.wrapData) {
          data = el.wrapData(data);
      }
      // v-on data wrap
      if (el.wrapListeners) {
          data = el.wrapListeners(data);
      }
      return data;
  }
  function genDirectives(el, state) {
      var dirs = el.directives;
      if (!dirs)
          return;
      var res = 'directives:[';
      var hasRuntime = false;
      var i, l, dir, needRuntime;
      for (i = 0, l = dirs.length; i < l; i++) {
          dir = dirs[i];
          needRuntime = true;
          var gen = state.directives[dir.name];
          if (gen) {
              // compile-time directive that manipulates AST.
              // returns true if it also needs a runtime counterpart.
              needRuntime = !!gen(el, dir, state.warn);
          }
          if (needRuntime) {
              hasRuntime = true;
              res += "{name:\"" + dir.name + "\",rawName:\"" + dir.rawName + "\"" + (dir.value ? ",value:(" + dir.value + "),expression:" + JSON.stringify(dir.value) : '') + (dir.arg ? ",arg:\"" + dir.arg + "\"" : '') + (dir.modifiers ? ",modifiers:" + JSON.stringify(dir.modifiers) : '') + "},";
          }
      }
      if (hasRuntime) {
          return res.slice(0, -1) + ']';
      }
  }
  function genProps(props) {
      var res = '';
      for (var i = 0; i < props.length; i++) {
          var prop = props[i];
          /* istanbul ignore if */
          {
              res += "\"" + prop.name + "\":" + transformSpecialNewlines(prop.value) + ",";
          }
      }
      return res.slice(0, -1);
  }
  function genScopedSlots(slots, state) {
      return "scopedSlots:_u([" + Object.keys(slots).map(function (key) {
          return genScopedSlot(key, slots[key], state);
      }).join(',') + "])";
  }
  function genScopedSlot(key, el, state) {
      if (el.for && !el.forProcessed) {
          return genForScopedSlot(key, el, state);
      }
      var fn = "function(" + String(el.slotScope) + "){" +
          ("return " + (el.tag === 'template'
              ? el.if
                  ? "(" + el.if + ")?" + (genChildren(el, state) || 'undefined') + ":undefined"
                  : genChildren(el, state) || 'undefined'
              : genElement(el, state)) + "}");
      return "{key:" + key + ",fn:" + fn + "}";
  }
  function genForScopedSlot(key, el, state) {
      var exp = el.for;
      var alias = el.alias;
      var iterator1 = el.iterator1 ? "," + el.iterator1 : '';
      var iterator2 = el.iterator2 ? "," + el.iterator2 : '';
      el.forProcessed = true; // avoid recursion
      return "_l((" + exp + ")," +
          ("function(" + alias + iterator1 + iterator2 + "){") +
          ("return " + genScopedSlot(key, el, state)) +
          '})';
  }
  function genInlineTemplate(el, state) {
      var ast = el.children[0];
      if ( (el.children.length !== 1 || ast.type !== 1)) {
          state.warn('Inline-template components must have exactly one child element.', { start: el.start });
      }
      if (ast.type === 1) {
          var inlineRenderFns = generate(ast, state.options);
          return "inlineTemplate:{render:function(){" + inlineRenderFns.render + "},staticRenderFns:[" + inlineRenderFns.staticRenderFns.map(function (code) { return "function(){" + code + "}"; }).join(',') + "]}";
      }
  }
  // #3895, #4268
  function transformSpecialNewlines(text) {
      return text
          .replace(/\u2028/g, '\\u2028')
          .replace(/\u2029/g, '\\u2029');
  }

  // detect problematic expressions in a template
  function detectErrors(ast, warn) {
  }

  function generateCodeFrame(source, start, end) {
      if (end === void 0) { end = source.length; }
      return "";
  }

  function createFunction(code, errors) {
      try {
          return new Function(code);
      }
      catch (err) {
          errors.push({ err: err, code: code });
          return noop;
      }
  }
  function createCompileToFunctionFn(compile) {
      var cache = Object.create(null);
      return function compileToFunctions(template, options, vm) {
          options = extend({}, options);
          var warn$1 = options.warn || warn;
          delete options.warn;
          /* istanbul ignore if */
          {
              // detect possible CSP restriction
              try {
                  new Function('return 1');
              }
              catch (e) {
                  if (e.toString().match(/unsafe-eval|CSP/)) {
                      warn$1('It seems you are using the standalone build of Vue.js in an ' +
                          'environment with Content Security Policy that prohibits unsafe-eval. ' +
                          'The template compiler cannot work in this environment. Consider ' +
                          'relaxing the policy to allow unsafe-eval or pre-compiling your ' +
                          'templates into render functions.');
                  }
              }
          }
          // check cache
          var key = options.delimiters
              ? String(options.delimiters) + template
              : template;
          if (cache[key]) {
              return cache[key];
          }
          // compile
          var compiled = compile(template, options);
          // check compilation errors/tips
          {
              if (compiled.errors && compiled.errors.length) {
                  if (options.outputSourceRange) {
                      compiled.errors.forEach(function (e) {
                          warn$1("Error compiling template:\n\n" + e.msg + "\n\n" +
                              generateCodeFrame(template, e.start, e.end), vm);
                      });
                  }
                  else {
                      warn$1("Error compiling template:\n\n" + template + "\n\n" +
                          compiled.errors.map(function (e) { return "- " + e; }).join('\n') + '\n', vm);
                  }
              }
              if (compiled.tips && compiled.tips.length) {
                  if (options.outputSourceRange) {
                      compiled.tips.forEach(function (e) { return tip(e.msg, vm); });
                  }
                  else {
                      compiled.tips.forEach(function (msg) { return tip(msg, vm); });
                  }
              }
          }
          // turn code into functions
          var res = {};
          var fnGenErrors = [];
          res.render = createFunction(compiled.render, fnGenErrors);
          res.staticRenderFns = compiled.staticRenderFns.map(function (code) {
              return createFunction(code, fnGenErrors);
          });
      };
  }

  function createCompilerCreator(baseCompile) {
      // 创建编译器
      return function createCompiler(baseOptions) {
          function compile(template, options) {
              var finalOptions = Object.create(baseOptions);
              var errors = [];
              var tips = [];
              var warn = function (msg, range, tip) {
                  (tip ? tips : errors).push(msg);
              };
              if (options) {
                  if ( options.outputSourceRange) {
                      // $flow-disable-line
                      var leadingSpaceLength_1 = template.match(/^\s*/)[0].length;
                      warn = function (msg, range, tip) {
                          var data = { msg: msg };
                          if (range) {
                              if (range.start != null) {
                                  data.start = range.start + leadingSpaceLength_1;
                              }
                              if (range.end != null) {
                                  data.end = range.end + leadingSpaceLength_1;
                              }
                          }
                          (tip ? tips : errors).push(data);
                      };
                  }
                  // merge custom modules
                  if (options.modules) {
                      finalOptions.modules =
                          (baseOptions.modules || []).concat(options.modules);
                  }
                  // merge custom directives
                  if (options.directives) {
                      finalOptions.directives = extend(Object.create(baseOptions.directives || null), options.directives);
                  }
                  // copy other options
                  for (var key in options) {
                      if (key !== 'modules' && key !== 'directives') {
                          finalOptions[key] = options[key];
                      }
                  }
              }
              finalOptions.warn = warn;
              var compiled = baseCompile(template.trim(), finalOptions);
              {
                  detectErrors(compiled.ast);
              }
              compiled.errors = errors;
              compiled.tips = tips;
              return compiled;
          }
          return {
              compile: compile,
              compileToFunctions: createCompileToFunctionFn(compile)
          };
      };
  }

  var createCompiler = createCompilerCreator(function baseCompile(template, options) {
      var ast = parse(template.trim(), options);
      if (options.optimize !== false) {
          optimize(ast, options);
      }
      console.log("ast", ast);
      var code = generate(ast, options);
      console.log("code", code);
      console.log("\n")
      console.log("code", code.render);
      console.log("\n")
      console.log("code", code.staticRenderFns.join("\n"));
      return {
          ast: ast,
          render: '',
          staticRenderFns: []
      };
  });

  var _a = createCompiler(baseOptions), compileToFunctions = _a.compileToFunctions;

  var idToTemplate = cached(function (id) {
      var el = query(id);
      return el && el.innerHTML;
  });
  var mount = Vue.prototype.$mount;
  // 处理template => render && 挂载
  Vue.prototype.$mount = function (el, hydrating) {
      el = el && query(el);
      /* istanbul ignore if */
      if (el === document.body || el === document.documentElement) {
           warn("Do not mount Vue to <html> or <body> - mount to normal elements instead.");
          return this;
      }
      var options = this.$options;
      // resolve template/el and convert to render function
      if (!options.render) {
          var template = options.template;
          if (template) {
              if (typeof template === 'string') {
                  if (template.charAt(0) === '#') {
                      template = idToTemplate(template);
                      /* istanbul ignore if */
                      if ( !template) {
                          warn("Template element not found or is empty: " + options.template, this);
                      }
                  }
              }
              else if (template.nodeType) {
                  template = template.innerHTML;
              }
              else {
                  {
                      warn('invalid template option:' + template, this);
                  }
                  return this;
              }
          }
          else if (el) {
              template = getOuterHTML(el);
          }
          if (template) {
              /* istanbul ignore if */
              // if (undefined !== 'production' && config.performance && mark) {
              //   mark('compile')
              // }
              var _a = compileToFunctions(template, {
                  outputSourceRange: undefined !== 'production',
                  shouldDecodeNewlines: shouldDecodeNewlines,
                  shouldDecodeNewlinesForHref: shouldDecodeNewlinesForHref,
                  delimiters: options.delimiters,
                  comments: options.comments
              }, this), render = _a.render, staticRenderFns = _a.staticRenderFns;
              options.render = render;
              options.staticRenderFns = staticRenderFns;
              // /* istanbul ignore if */
              // if (undefined !== 'production' && config.performance && mark) {
              //   mark('compile end')
              //   measure(`vue ${this._name} compile`, 'compile', 'compile end')
              // }
          }
      }
      return mount.call(this, el, hydrating);
  };
  Vue.compile = compileToFunctions;

  return Vue;

})));
//# sourceMappingURL=dist.js.map
