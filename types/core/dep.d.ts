declare type DepCtor = {
  new: DepInstance;
  target: WatcherInstance | null;
}

declare type DepInstance = {
  id: number;
  subs: Array<WatcherInstance>;
  // 添加 watcher
  addSub: (sub: WatcherInstance) => void;
  // 删除 watcher
  removeSub: (sub: WatcherInstance) => void;
  // 为 target 添加当前依赖(this) 
  depend: () => void;
  // 为 subs 排序，并调用 subs 中所有watcher.update
  notify: () => void;
}