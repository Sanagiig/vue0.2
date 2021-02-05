declare interface WatcherCtor {
    new(vm: Component,
        expOrFn: string | Function,
        cb: Function,
        options?: Object,
        isRenderWatcher?: boolean): WatcherInstance;
}

declare interface WatcherInstance {
    vm: Component;
    expression: string;

    id: number;
    deep: boolean;
    user: boolean;
    lazy: boolean;
    sync: boolean;
    dirty: boolean;
    value: any;
    // 实例化时自动 true
    active: boolean;
    deps: Array<DepInstance>;
    newDeps: Array<DepInstance>;
    depIds: SimpleSet;
    newDepIds: SimpleSet;
    // 通过 expOrFn 转换的 fn, 获取与 watcher 绑定的表达式 或 求值fn
    getter: () => any;
    // 更改Dep.target , 通过 getter 获取 value (traves)
    // 触发其所有 value 的 get, 更新当前watcher 的依赖
    // 最后会还原 target ， 调用 cleanupDeps
    get: () => any;
    // 将dep 添加到 newDepds newDeps 中，并更新 dep.subs
    addDep: (dep: DepInstance) => void;
    // 更改dirty || 同步、异步运行 run
    update: Function;
    // 检查 将没出现在this.newDepIds 的 dep && dep.removeSub(this) 解除原dep 的订阅
    // newDeps,newDepIds 交换 deps,depIds && 清空旧 newDeps，newDepIds
    cleanupDeps: () => void;
    cb: (value?: any, oldValue?: any) => void;
    evaluate: () => void;
    // 将watcher 中的 deps 重新订阅 当前 watcher 
    depend: () => void;
    before?: Function;
    // 调用 get , 更新value , 调用 cb
    run: Function;
    // vm._watchers 中删除 this , 清除 deps 中的订阅, 更改 active = false
    teardown: () => void;
}

declare type WatcherOption = {
    // 是否用户创建
    user?: boolean;
    // 是否立即cb
    immediate?: boolean;
    deep?: boolean;
    lazy?: boolean;
    sync?: boolean;
    before?: Function;
    handler?: Function;
}

declare type ComputedOption = {
    cache: boolean;
    get: () => any;
    set: (v: any) => void;
}