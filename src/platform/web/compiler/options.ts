import {
  isPreTag,
  mustUseProp,
  isReservedTag,
  getTagNamespace,
  genStaticKeys,
  isUnaryTag, 
  canBeLeftOpenTag
} from '@utils/index'

import modules from './modules/index'
import directives from './directives/index'

export const baseOptions: CompilerOptions = {
  expectHTML: true,
  modules,
  directives,
  isPreTag,
  isUnaryTag,
  mustUseProp,
  canBeLeftOpenTag,
  isReservedTag,
  getTagNamespace,
  staticKeys: genStaticKeys(modules)
}
