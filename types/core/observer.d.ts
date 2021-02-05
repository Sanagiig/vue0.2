declare type ObserverInstance = {
  // 观察的 val
  value: any;
  // 观察对应的依赖
  dep: DepInstance;
  vmCount: number; // number of vms that have this object as root $data
  // 为当前 obj 绑定 get,set 依赖收集与 更新触发通知 (defineReactive && observe)
  walk:(obj: Object) => void;
  // 将 当前 arr 遍历，并对每个 item 进行 observe
  observeArray:(items: Array<any>) => void;

}