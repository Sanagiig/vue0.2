| 方法                         | 作用                   |
| ---------------------------- | ---------------------- |
| initMixin(Vue)            | 混入 vm._init |
| stateMixin(Vue)               | 新建空对象并与vm.\$data，vm.\$props（对应 this._data，this._props）相关联（同时修改defData 和 defProps 的 get,set，不允许任意新增值）; 新增\$set，\$delete,$watch|
| eventsMixin(Vue)               | \$on,\$once,\$off,\$emit|
| lifecycleMixin(Vue)| _update,\$forceUpdate,\$destroy|
| renderMixin(Vue)           | \$nextTick,_render,|