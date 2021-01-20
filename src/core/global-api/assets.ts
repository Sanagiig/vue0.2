import { ASSET_TYPES, isPlainObject, validateComponentName } from "@utils/index";

export function initAssetRegisters(Vue: GlobalAPI) {
  ASSET_TYPES.forEach(type => {
    Vue[type] = function (
      id: string,
      definition: Function | Object | any
    ): Function | Object | void {
      let optType = type + 's';

      if(!definition){
        return this.options[optType][id];
      }else{
        /* istanbul ignore if */
        if (process.env.NODE_ENV !== 'production' && type === 'component') {
          validateComponentName(id)
        }

        if(type === 'component'&& isPlainObject(definition)){
          definition.name = definition.name || id;
          definition = this.options._base.extend(definition);
        }

        if (type === 'directive' && typeof definition === 'function') {
          definition = { bind: definition, update: definition }
        }
        this.options[optType][id] = definition;
        return definition;
      }
    }
  })
}