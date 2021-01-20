type Backend = {
  nodeOps:any,
  modules:any[]
}
export function createPatchFunction(backend:Backend):Function{
  return function(){};
}