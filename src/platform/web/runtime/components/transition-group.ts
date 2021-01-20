import { warn, extend } from '@utils/index';
import { transitionProps, extractTransitionData } from './transition'

const props:any = extend({
  tag: String,
  moveClass: String
}, transitionProps)

delete props.mode

export default {
  props,
  beforeMount () {

  },
  render (h: Function) {

  },
  updated () {

  },
  methods: {
    hasMove (el: any, moveClass: string): boolean {
      return false;
    },
  }
}