import { no, noop, identity, LIFECYCLE_HOOKS } from '@utils/index';

export default {
    /**
    * Option merge strategies (used in core/util/options)
    */
    // $flow-disable-line
    optionMergeStrategies: <{
        [key: string]:
        (parent: ComponentOptions,
            child: ComponentOptions | ComponentCtor,
            vm?: Component,
            key ?:string) => any
    }>{},

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
    devtools: process.env.NODE_ENV !== 'production',

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
}
