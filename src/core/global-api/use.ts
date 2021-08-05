import { toArray } from "@shared/util"

export function initUse (Vue: GlobalAPI) {
  // 注册插件，arguments.unshif(this) 作为install 参数
  Vue.use = function (plugin: Function | Object | any) {
    const installedPlugins = (this._installedPlugins || (this._installedPlugins = []));
    if (installedPlugins.indexOf(plugin) > -1) {
      return this;
    }

    // additional parameters
    const args = toArray(arguments, 1);
    args.unshift(this);
    if (typeof plugin.install === 'function') {
      plugin.install.apply(plugin, args)
    } else if (typeof plugin === 'function') {
      plugin.apply(null, args)
    }

    installedPlugins.push(plugin)
    return this
  }
}