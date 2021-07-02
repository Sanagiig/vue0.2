
import config from "@core/config";
import { isBuiltInTag, isPlainObject } from "../assert/index";
import { unicodeLetters } from "../lang/index";
import { warn } from "../debug/index";
import { hasOwn, camelize, toRawType, extend,capitalize } from "@utils/index";

/**
 * Option overwriting strategies are functions that handle
 * how to merge a parent option value and a child option
 * value into the final value.
 */
const strats = config.optionMergeStrategies

/**
 * Validate component names
 */
function checkComponents(options: ComponentOptions) {
  for (const key in options.components) {
    validateComponentName(key)
  }
}

/**
 * Ensure all props option syntax are normalized into the
 * Object-based format.
 */
function normalizeProps(options: ComponentOptions, vm?: Component) {
  const props = options.props;
  const res: any = {};

  if (!props) return;

  let i, val, name;
  // props:['key'] => props:{key:{type:null}}
  if (Array.isArray(props)) {
    i = props.length;
    while (i--) {
      val = props[i]
      if (typeof val === 'string') {
        name = camelize(val)
        res[name] = { type: null }
      } else if (process.env.NODE_ENV !== 'production') {
        warn('props must be strings when using array syntax.')
      }
    }

    // props:{key:Type} => props:{key:{type:val}} | props:{key:val}
  } else if (isPlainObject(props)) {
    for (const key in props) {
      val = props[key]
      name = camelize(key)
      res[name] = isPlainObject(val)
        ? val
        : { type: val }
    }
  } else if (process.env.NODE_ENV !== 'production') {
    warn(
      `Invalid value for option "props": expected an Array or an Object, ` +
      `but got ${toRawType(props)}.`,
      vm
    )
  }
  options.props = res;
}

/**
 * Normalize all injections into Object-based format
 */
function normalizeInject(options: ComponentOptions, vm?: Component) {
  const inject: any = options.inject
  const normalized: any = options.inject = {}

  if (!inject) return

  // inject:[key] => inject:{key:{from:key}}
  if (Array.isArray(inject)) {
    for (let i = 0; i < inject.length; i++) {
      normalized[inject[i]] = { from: inject[i] }
    }

    // inject:{key:val} => inject:{key:{from:val}} | inject:{key:{from:key} & val}
  } else if (isPlainObject(inject)) {
    for (const key in inject) {
      const val = inject[key]
      normalized[key] = isPlainObject(val)
        ? extend({ from: key }, val)
        : { from: val }
    }
  } else if (process.env.NODE_ENV !== 'production') {
    warn(
      `Invalid value for option "inject": expected an Array or an Object, ` +
      `but got ${toRawType(inject)}.`,
      vm
    )
  }
}

/**
 * Normalize raw function directives into object format.
 */
function normalizeDirectives(options: ComponentOptions, vm?: Component) {
  const dirs = options.directives
  if (dirs) {
    for (const key in dirs) {
      const def = dirs[key]
      if (typeof def === 'function') {
        dirs[key] = { bind: def, update: def }
      }
    }
  }
}

/**
 * Default strategy.
 */
const defaultStrat = function (parentVal: any, childVal: any,vm?:Component, key?:string | number): any {
  return childVal === undefined
    ? parentVal
    : childVal
}
/**
 * Merge two option objects into a new one.
 * Core utility used in both instantiation and inheritance.
 * 会对非 Vue.extend 过的 options 的 extends && mixins 进行 merge
 */
export function mergeOptions(
  parent: ComponentOptions,
  child: ComponentOptions | ComponentCtor,
  vm?: Component
): ComponentOptions {
  if (process.env.NODE_ENV !== 'production') {
    checkComponents(<ComponentOptions>child)
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
      parent = mergeOptions(parent, child.extends, vm)
    }
    if (child.mixins) {
      for (let i = 0, l = child.mixins.length; i < l; i++) {
        parent = mergeOptions(parent, child.mixins[i], vm)
      }
    }
  }

  const options: ComponentOptions = <ComponentOptions>{};
  let key: keyof ComponentOptions;

  for (key in parent) {
    mergeField(key);
  }
  for (key in child) {
    if (!hasOwn(parent, key)) {
      mergeField(key);
    }
  }
  function mergeField(key: keyof ComponentOptions) {
    const strat = strats[key] || defaultStrat
    options[key] = strat(parent[key], (<ComponentOptions>child)[key], vm, key)
  }
  return options;
}

export function validateComponentName(name: string) {
  if (!new RegExp(`^[a-zA-Z][\\-\\.0-9_${unicodeLetters}]*$`).test(name)) {
    warn(
      'Invalid component name: "' + name + '". Component names ' +
      'should conform to valid custom element name in html5 specification.'
    )
  }
  if (isBuiltInTag(name) || config.isReservedTag(name)) {
    warn(
      'Do not use built-in or reserved HTML elements as component ' +
      'id: ' + name
    )
  }
}

/**
 * Resolve an asset.
 * This function is used because child instances need access
 * to assets defined in its ancestor chain.
 */
export function resolveAsset (
  options: Object,
  type: string,
  id: string,
  warnMissing?: boolean
): any {
  /* istanbul ignore if */
  if (typeof id !== 'string') {
    return
  }
  const assets = options[type]
  // check local registration variations first
  if (hasOwn(assets, id)) return assets[id]
  const camelizedId = camelize(id)
  if (hasOwn(assets, camelizedId)) return assets[camelizedId]
  const PascalCaseId = capitalize(camelizedId)
  if (hasOwn(assets, PascalCaseId)) return assets[PascalCaseId]
  // fallback to prototype chain
  const res = assets[id] || assets[camelizedId] || assets[PascalCaseId]
  if (process.env.NODE_ENV !== 'production' && warnMissing && !res) {
    warn(
      'Failed to resolve ' + type.slice(0, -1) + ': ' + id,
      options
    )
  }
  return res
}

