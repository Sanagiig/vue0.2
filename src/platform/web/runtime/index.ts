import Vue from "@core/index";
import config from '@core/config';
import {
  inBrowser,
  query,
  mustUseProp,
  isReservedTag,
  isReservedAttr,
  getTagNamespace,
  isUnknownElement,
  devtools,
  noop,
} from '@utils/index'
import platformDirectives from './directives/index'
import platformComponents from './components/index'

import { patch } from "./patch";

Vue.config.mustUseProp = mustUseProp
Vue.config.isReservedTag = isReservedTag
Vue.config.isReservedAttr = isReservedAttr
Vue.config.getTagNamespace = getTagNamespace
Vue.config.isUnknownElement = isUnknownElement

export default Vue;