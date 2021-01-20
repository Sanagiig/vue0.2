const patternTypes: Array<Function> = [String, RegExp, Array];

export default {
  name: 'keep-alive',
  abstract: true,

  props: {
    include: patternTypes,
    exclude: patternTypes,
    max: [String, Number]
  },
  created () {

  },
  destroyed () {

  },
}