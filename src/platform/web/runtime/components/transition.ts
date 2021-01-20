export const transitionProps = {
  name: String,
  appear: Boolean,
  css: Boolean,
  mode: String,
  type: String,
  enterClass: String,
  leaveClass: String,
  enterToClass: String,
  leaveToClass: String,
  enterActiveClass: String,
  leaveActiveClass: String,
  appearClass: String,
  appearActiveClass: String,
  appearToClass: String,
  duration: [Number, String, Object]
}

export function extractTransitionData (comp: Component): Object {
  return {};
}

export default {
  name: 'transition',
  props: transitionProps,
  abstract: true,
  render (h: Function) {
  }
}