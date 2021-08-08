code with(this) {
  return _c('div', {
    attrs: {
      "id": "app"
    }
  }, [_m(0), _v(" "), _m(1), _v(" "), _c("comp", {
    tag: "div",
    staticClass: "xx",
    class: dnyCls,
    staticStyle: {
      "background-color": "red"
    },
    attrs: {
      "num": num
    },
    scopedSlots: _u([{
      key: "default",
      fn: function (xx) {
        return _c('div', {}, [_c('h1', [_v(_s(xx.x))])])
      }
    }])
  }, [_c('div', [_v("slot")]), _v(" "), _c('div', {
    attrs: {
      "slot": "comp_slot"
    },
    slot: "comp_slot"
  })]), _v(" "), _c('div', [_v("\n      " + _s(title) + "\n    ")]), _v(" "), _c('div', [_v(_s($slot.default))]), _v(" "), (ifexp == 10) ? _c('div') : (ifexp == 11) ? _c('div') : (ifexp == 12) ? _c('div') : (ifexp == 13) ? _c('div') : _c('div'), _v(" "), _c('select', {
    attrs: {
      "name": "sel",
      "id": "sel"
    }
  }, _l((list), function (item, i) {
    return _c('option', {
      domProps: {
        "value": item
      }
    }, [_v(_s("label" + i))])
  }), 0), _v(" "), _t("test_slot"), _v(" "), _t("test_slot")], 2)
}

code with(this) {
  return _c('div', {
    attrs: {
      "id": "static"
    }
  }, [_c('div'), _v(" "), _c('div')])
}
with(this) {
  return _c('div', {
    attrs: {
      "id": "static2"
    }
  }, [_c('div'), _v(" "), _c('div')])
}