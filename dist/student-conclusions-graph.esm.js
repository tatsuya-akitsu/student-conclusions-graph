import { Line, mixins } from 'vue-chartjs';

var vueChartOptions = {
  methods: {
    setOptions() {
      this.options = {
        legend: {
          labels: {
            filter: items => {
              return items.text = '';
            }
          }
        },
        tooltips: {
          mode: 'index',
          intersect: true
        },
        scales: {
          xAxes: [{
            display: true,
            // Y軸の表示
            ticks: {
              min: 0,
              // Y軸の最小値
              max: 5,
              // Y軸の最大値
              fontSize: 12,
              // Y軸のフォントサイズ
              fontColor: '#7BA0A6',
              stepSize: 1 // Y軸の間隔

            },
            gridLines: {
              color: '#E1EBEB'
            }
          }],
          yAxes: [{
            position: 'right',
            ticks: {
              min: 0,
              max: 5,
              fontSize: 12,
              fontColor: '#7BA0A6',
              stepSize: 1
            },
            gridLines: {
              color: '#E1EBEB'
            }
          }]
        }
      };
    }

  }
};

//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
var script = {
  filters: {
    removeMinus: num => {
      if (String(num).includes('-')) {
        return Number(String(num).replace('-', ''));
      } else {
        return num;
      }
    }
  },
  props: {
    change: {
      type: Number,
      required: true,
      default: 0
    }
  },
  computed: {
    changeType() {
      if (this.change === 0 || this.change === 0.0) {
        return 'is-normal';
      } else if (String(this.change).includes('-')) {
        return 'is-down';
      } else {
        return 'is-up';
      }
    }

  }
};

var __$_require_assets_img_icons_icon_triangle_down_svg__ = "<svg width=\"8\" height=\"7\" viewBox=\"0 0 8 7\" fill=\"none\" xmlns=\"http://www.w3.org/2000/svg\">\n<path d=\"M5.27483 5.92196C4.89408 6.60893 3.90631 6.60893 3.52556 5.92196L1.06622 1.48477C0.696799 0.818259 1.17881 -7.01252e-07 1.94086 -6.34631e-07L6.85953 -2.04627e-07C7.62158 -1.38007e-07 8.10359 0.81826 7.73417 1.48477L5.27483 5.92196Z\" fill=\"#FF0055\"/>\n</svg>";

var __$_require_assets_img_icons_icon_triangle_up_svg__ = "<svg width=\"8\" height=\"7\" viewBox=\"0 0 8 7\" fill=\"none\" xmlns=\"http://www.w3.org/2000/svg\">\n<path d=\"M3.52546 1.07804C3.90621 0.391074 4.89398 0.391074 5.27474 1.07804L7.73407 5.51523C8.10349 6.18174 7.62148 7 6.85944 7H1.94076C1.17872 7 0.696701 6.18174 1.06612 5.51523L3.52546 1.07804Z\" fill=\"#00EB9D\"/>\n</svg>";

function normalizeComponent(template, style, script, scopeId, isFunctionalTemplate, moduleIdentifier /* server only */, shadowMode, createInjector, createInjectorSSR, createInjectorShadow) {
    if (typeof shadowMode !== 'boolean') {
        createInjectorSSR = createInjector;
        createInjector = shadowMode;
        shadowMode = false;
    }
    // Vue.extend constructor export interop.
    const options = typeof script === 'function' ? script.options : script;
    // render functions
    if (template && template.render) {
        options.render = template.render;
        options.staticRenderFns = template.staticRenderFns;
        options._compiled = true;
        // functional template
        if (isFunctionalTemplate) {
            options.functional = true;
        }
    }
    // scopedId
    if (scopeId) {
        options._scopeId = scopeId;
    }
    let hook;
    if (moduleIdentifier) {
        // server build
        hook = function (context) {
            // 2.3 injection
            context =
                context || // cached call
                    (this.$vnode && this.$vnode.ssrContext) || // stateful
                    (this.parent && this.parent.$vnode && this.parent.$vnode.ssrContext); // functional
            // 2.2 with runInNewContext: true
            if (!context && typeof __VUE_SSR_CONTEXT__ !== 'undefined') {
                context = __VUE_SSR_CONTEXT__;
            }
            // inject component styles
            if (style) {
                style.call(this, createInjectorSSR(context));
            }
            // register component module identifier for async chunk inference
            if (context && context._registeredComponents) {
                context._registeredComponents.add(moduleIdentifier);
            }
        };
        // used by ssr in case component is cached and beforeCreate
        // never gets called
        options._ssrRegister = hook;
    }
    else if (style) {
        hook = shadowMode
            ? function (context) {
                style.call(this, createInjectorShadow(context, this.$root.$options.shadowRoot));
            }
            : function (context) {
                style.call(this, createInjector(context));
            };
    }
    if (hook) {
        if (options.functional) {
            // register for functional component in vue file
            const originalRender = options.render;
            options.render = function renderWithStyleInjection(h, context) {
                hook.call(context);
                return originalRender(h, context);
            };
        }
        else {
            // inject component registration as beforeCreate hook
            const existing = options.beforeCreate;
            options.beforeCreate = existing ? [].concat(existing, hook) : [hook];
        }
    }
    return script;
}

const isOldIE = typeof navigator !== 'undefined' &&
    /msie [6-9]\\b/.test(navigator.userAgent.toLowerCase());
function createInjector(context) {
    return (id, style) => addStyle(id, style);
}
let HEAD;
const styles = {};
function addStyle(id, css) {
    const group = isOldIE ? css.media || 'default' : id;
    const style = styles[group] || (styles[group] = { ids: new Set(), styles: [] });
    if (!style.ids.has(id)) {
        style.ids.add(id);
        let code = css.source;
        if (css.map) {
            // https://developer.chrome.com/devtools/docs/javascript-debugging
            // this makes source maps inside style tags work properly in Chrome
            code += '\n/*# sourceURL=' + css.map.sources[0] + ' */';
            // http://stackoverflow.com/a/26603875
            code +=
                '\n/*# sourceMappingURL=data:application/json;base64,' +
                    btoa(unescape(encodeURIComponent(JSON.stringify(css.map)))) +
                    ' */';
        }
        if (!style.element) {
            style.element = document.createElement('style');
            style.element.type = 'text/css';
            if (css.media)
                style.element.setAttribute('media', css.media);
            if (HEAD === undefined) {
                HEAD = document.head || document.getElementsByTagName('head')[0];
            }
            HEAD.appendChild(style.element);
        }
        if ('styleSheet' in style.element) {
            style.styles.push(code);
            style.element.styleSheet.cssText = style.styles
                .filter(Boolean)
                .join('\n');
        }
        else {
            const index = style.ids.size - 1;
            const textNode = document.createTextNode(code);
            const nodes = style.element.childNodes;
            if (nodes[index])
                style.element.removeChild(nodes[index]);
            if (nodes.length)
                style.element.insertBefore(textNode, nodes[index]);
            else
                style.element.appendChild(textNode);
        }
    }
}

/* script */
const __vue_script__ = script;

var __vue_render__ = function () {
  var _vm = this;

  var _h = _vm.$createElement;

  var _c = _vm._self._c || _h;

  return _c('div', {
    staticClass: "m-survey_change_tag",
    class: _vm.changeType
  }, [_vm._t("default"), _vm._v(" "), _c('p', {
    staticClass: "m-survey_change_result"
  }, [_vm.changeType === 'is-down' ? [_c('img', {
    attrs: {
      "src": __$_require_assets_img_icons_icon_triangle_down_svg__,
      "alt": ""
    }
  })] : _vm.changeType === 'is-up' ? [_c('img', {
    attrs: {
      "src": __$_require_assets_img_icons_icon_triangle_up_svg__,
      "alt": ""
    }
  })] : [_c('span', [_vm._v("-")])], _vm._v(" "), _c('span', {
    staticClass: "m-survey_change_value"
  }, [_vm._v(_vm._s(_vm._f("removeMinus")(_vm.change)))])], 2)], 2);
};

var __vue_staticRenderFns__ = [];
/* style */

const __vue_inject_styles__ = function (inject) {
  if (!inject) return;
  inject("data-v-0df564a2_0", {
    source: ".m-survey_change_tag[data-v-0df564a2]{display:inline-block;padding:.5rem 1rem;font-size:0;text-align:center;border-radius:5px}.m-survey_change_tag.is-down[data-v-0df564a2]{background:#ffebf2}.m-survey_change_tag.is-down .m-survey_change_result>span[data-v-0df564a2]{color:#f05}.m-survey_change_tag.is-up[data-v-0df564a2]{background:#ebfff8}.m-survey_change_tag.is-up .m-survey_change_result>span[data-v-0df564a2]{color:#00eb9d}.m-survey_change_tag.is-normal[data-v-0df564a2]{background:#f9fbfb}.m-survey_change_tag.is-normal .m-survey_change_result>span[data-v-0df564a2]{color:#7ba0a6}.m-survey_change_tag.is-normal .m-survey_change_result>span[data-v-0df564a2]:nth-child(1){padding-left:0;padding-right:1rem}.m-survey_change_tag.is-normal .m-survey_change_result>span[data-v-0df564a2]:nth-child(2){padding:0}.m-survey_change_result[data-v-0df564a2]{display:inline-block;vertical-align:middle;font-size:0}.m-survey_change_result img[data-v-0df564a2],.m-survey_change_result span[data-v-0df564a2]{display:inline-block;vertical-align:middle}.m-survey_change_result span[data-v-0df564a2]{padding-left:.28rem;font-size:1.4rem;font-weight:700;line-height:1}",
    map: undefined,
    media: undefined
  });
};
/* scoped */


const __vue_scope_id__ = "data-v-0df564a2";
/* module identifier */

const __vue_module_identifier__ = undefined;
/* functional template */

const __vue_is_functional_template__ = false;
/* style inject SSR */

/* style inject shadow dom */

const __vue_component__ = /*#__PURE__*/normalizeComponent({
  render: __vue_render__,
  staticRenderFns: __vue_staticRenderFns__
}, __vue_inject_styles__, __vue_script__, __vue_scope_id__, __vue_is_functional_template__, __vue_module_identifier__, false, createInjector, undefined, undefined);

//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
var script$1 = {
  props: {
    label: {
      type: String,
      required: true,
      default: ''
    },
    width: {
      type: String,
      required: true,
      default: '5rem'
    },
    height: {
      type: String,
      required: true,
      default: '5rem'
    },
    imgWidth: {
      type: String,
      require: true,
      default: 'auto'
    }
  }
};

/* script */
const __vue_script__$1 = script$1;
/* template */

var __vue_render__$1 = function () {
  var _vm = this;

  var _h = _vm.$createElement;

  var _c = _vm._self._c || _h;

  return _c('div', {
    staticClass: "m-compilation_icon",
    class: "is-" + _vm.label,
    attrs: {
      "width": _vm.width,
      "height": _vm.height
    }
  }, [_c('img', {
    attrs: {
      "src": require("./assets/img/icons/icon_" + _vm.label + ".svg"),
      "alt": "",
      "width": _vm.imgWidth
    }
  })]);
};

var __vue_staticRenderFns__$1 = [];
/* style */

const __vue_inject_styles__$1 = function (inject) {
  if (!inject) return;
  inject("data-v-243b5758_0", {
    source: ".m-compilation_icon[data-v-243b5758]{position:relative;width:5rem;height:5rem;border-radius:50%}.m-compilation_icon.is-selEq[data-v-243b5758]{background:#e5f7ff}.m-compilation_icon.is-grit[data-v-243b5758]{background:#f9f0fc}.m-compilation_icon.is-motivation[data-v-243b5758]{background:#e5f9f5}.m-compilation_icon.is-deviation[data-v-243b5758]{background:#e6eef4}img[data-v-243b5758]{display:block;position:absolute;top:50%;left:50%;transform:translate(-50%,-50%)}",
    map: undefined,
    media: undefined
  });
};
/* scoped */


const __vue_scope_id__$1 = "data-v-243b5758";
/* module identifier */

const __vue_module_identifier__$1 = undefined;
/* functional template */

const __vue_is_functional_template__$1 = false;
/* style inject SSR */

/* style inject shadow dom */

const __vue_component__$1 = /*#__PURE__*/normalizeComponent({
  render: __vue_render__$1,
  staticRenderFns: __vue_staticRenderFns__$1
}, __vue_inject_styles__$1, __vue_script__$1, __vue_scope_id__$1, __vue_is_functional_template__$1, __vue_module_identifier__$1, false, createInjector, undefined, undefined);

var script$2 = {
  mixins: [Line, mixins.reactiveProp],
  props: {
    chartData: {
      type: Object,
      required: true,
      default: () => {}
    },
    options: {
      type: Object,
      required: true,
      default: () => {}
    }
  },

  mounted() {
    this.$nextTick(() => {
      this.renderChart(this.chartData, this.options);
    });
  }

};

/* script */
const __vue_script__$2 = script$2;
/* template */

/* style */

const __vue_inject_styles__$2 = undefined;
/* scoped */

const __vue_scope_id__$2 = undefined;
/* module identifier */

const __vue_module_identifier__$2 = undefined;
/* functional template */

const __vue_is_functional_template__$2 = undefined;
/* style inject */

/* style inject SSR */

/* style inject shadow dom */

const __vue_component__$2 = /*#__PURE__*/normalizeComponent({}, __vue_inject_styles__$2, __vue_script__$2, __vue_scope_id__$2, __vue_is_functional_template__$2, __vue_module_identifier__$2, false, undefined, undefined, undefined);

//
var script$3 = {
  mixins: [vueChartOptions],
  components: {
    AppChangeTag: __vue_component__,
    AppCompilationIcon: __vue_component__$1,
    LineChart: __vue_component__$2
  },
  props: {
    myData: {
      type: Object,
      required: true,
      default: () => {}
    },
    myLabels: {
      type: Object,
      required: true,
      default: () => {}
    },
    summaryChartData: {
      type: Object,
      required: true,
      default: () => {}
    },
    detailChartData: {
      type: Object,
      required: true,
      default: () => {}
    },
    details: {
      type: Object,
      required: true,
      default: () => {}
    },
    selectDetail: {
      type: Number,
      required: true,
      default: 0
    },
    contentKey: {
      type: Number,
      required: false,
      default: 0
    }
  },
  data: () => ({
    options: {}
  }),

  mounted() {
    this.setOptions();
  },

  methods: {
    selectDetailData(label, index) {
      this.$emit('handleDetailData', {
        label,
        index,
        key: this.contentKey,
        category: this.myData.label
      });
    }

  }
};

/* script */
const __vue_script__$3 = script$3;
/* template */

var __vue_render__$2 = function () {
  var _vm = this;

  var _h = _vm.$createElement;

  var _c = _vm._self._c || _h;

  return _c('div', {
    staticClass: "m-student_survey_graph",
    class: "is-" + _vm.myData.label
  }, [_c('span', {
    staticClass: "p-student_survey_solid"
  }), _vm._v(" "), _c('header', [_c('h3', [_vm._v(_vm._s(_vm.myData.category) + "の調査結果")])]), _vm._v(" "), _c('div', {
    staticClass: "p-student_survey_body"
  }, [_c('div', {
    staticClass: "p-student_survey_summary"
  }, [_c('div', {
    staticClass: "p-student_survey_result_box"
  }, [_c('div', {
    staticClass: "p-student_survey_result"
  }, [_c('app-compilation-icon', {
    attrs: {
      "label": _vm.myData.label,
      "width": "5rem",
      "height": "5rem",
      "img-width": "auto"
    }
  }), _vm._v(" "), _c('p', {
    staticClass: "p-student_survey_score"
  }, [_vm._v(_vm._s(_vm.myData.summary.value))]), _vm._v(" "), _c('app-change-tag', {
    attrs: {
      "change": _vm.myData.summary.change
    }
  })], 1), _vm._v(" "), _vm._m(0)]), _vm._v(" "), _c('div', {
    staticClass: "p-student_survey_result_graph"
  }, [_c('line-chart', {
    attrs: {
      "chart-data": _vm.summaryChartData,
      "options": _vm.options,
      "height": 124
    }
  })], 1)]), _vm._v(" "), _c('div', {
    staticClass: "p-student_survey_detail"
  }, [_c('ul', {
    staticClass: "p-student_detail_list"
  }, _vm._l(_vm.details.data, function (text, index) {
    return _c('li', {
      key: "detail-" + index,
      ref: "selectDetail-" + index,
      refInFor: true,
      class: {
        'is-select': _vm.selectDetail === index
      },
      on: {
        "click": function ($event) {
          return _vm.selectDetailData(text.label, index);
        }
      }
    }, [_c('p', {
      staticClass: "p-student_detail_result"
    }, [_vm._v("\n            " + _vm._s(_vm.myData[text.label].summary.value) + "\n          ")]), _vm._v(" "), _c('app-change-tag', {
      attrs: {
        "change": _vm.myData[text.label].summary.change
      }
    }), _vm._v(" "), _c('p', {
      staticClass: "p-student_detail_label"
    }, [_vm._v(_vm._s(text.value))])], 1);
  }), 0), _vm._v(" "), _c('div', {
    staticClass: "p-student_detail_graph"
  }, [_c('h4', [_vm._v("\n          " + _vm._s(_vm.details.intro.title) + "\n        ")]), _vm._v(" "), _c('p', [_vm._v("\n          " + _vm._s(_vm.details.intro.text) + "\n        ")]), _vm._v(" "), _c('line-chart', {
    attrs: {
      "chart-data": _vm.detailChartData,
      "options": _vm.options,
      "height": 124
    }
  })], 1)])])]);
};

var __vue_staticRenderFns__$2 = [function () {
  var _vm = this;

  var _h = _vm.$createElement;

  var _c = _vm._self._c || _h;

  return _c('div', {
    staticClass: "p-student_survey_content"
  }, [_c('ul', [_c('li', [_vm._v("感情・情動能力")]), _vm._v(" "), _c('li', [_vm._v("短い説明")]), _vm._v(" "), _c('li', [_vm._v("みじかい説明")])])]);
}];
/* style */

const __vue_inject_styles__$3 = function (inject) {
  if (!inject) return;
  inject("data-v-1c550df2_0", {
    source: ".m-student_survey_graph[data-v-1c550df2]{margin-top:2rem;background:#fff;border-radius:5px;border:1px solid #e1ebeb}.m-student_survey_graph.is-selEq .p-student_survey_solid[data-v-1c550df2]{background:#00abff}.m-student_survey_graph.is-grit .p-student_survey_solid[data-v-1c550df2]{background:#bf6be6}.m-student_survey_graph.is-motivation .p-student_survey_solid[data-v-1c550df2]{background:#00c09e}.m-student_survey_graph.is-deviation .p-student_survey_solid[data-v-1c550df2]{background:#015593}.p-student_survey_solid[data-v-1c550df2]{display:block;height:.5rem;border-radius:5px 5px 0 0}header[data-v-1c550df2]{padding:1.55rem 2rem;font-size:1.6rem;font-weight:700;border-bottom:1px solid #e1ebeb}.p-student_survey_summary[data-v-1c550df2]{display:flex;justify-content:space-between;align-items:flex-start;padding:2rem 3rem;border-bottom:1px solid #e1ebeb}.p-student_survey_result[data-v-1c550df2]{font-size:0}.p-student_survey_result>div[data-v-1c550df2],.p-student_survey_result>p[data-v-1c550df2]{display:inline-block;vertical-align:middle}.p-student_survey_score[data-v-1c550df2]{padding-left:2rem;font-size:3.2rem;font-weight:700}.p-student_survey_content[data-v-1c550df2]{padding-top:1.6rem}.p-student_survey_content li[data-v-1c550df2]{position:relative;padding:.6rem 0 .6rem 2.8rem;font-size:1.4rem;line-height:1.2}.p-student_survey_content li[data-v-1c550df2]::before{content:\"\";display:block;position:absolute;top:50%;left:1rem;transform:translate(0,-50%);width:.6rem;height:.6rem;border-radius:50%;background:#00abff}.p-student_survey_result_graph[data-v-1c550df2]{width:43.2rem}.p-student_survey_detail[data-v-1c550df2]{display:flex;justify-content:space-between}.p-student_detail_list[data-v-1c550df2]{position:relative;width:calc(100% - 47rem);border-right:1px solid #e1ebeb}.p-student_detail_list li[data-v-1c550df2]{cursor:pointer;position:relative;padding:1rem 3rem;font-size:0;transition:all .6s cubic-bezier(.77,0,.175,1)}.p-student_detail_list li p[data-v-1c550df2]{display:inline-block;vertical-align:middle;transition:all .6s cubic-bezier(.77,0,.175,1)}.p-student_detail_list li[data-v-1c550df2]:hover{background:#f9fbfb}.p-student_detail_list li:hover .p-student_detail_result[data-v-1c550df2]{color:#00abff}.p-student_detail_list li:hover .p-student_detail_label[data-v-1c550df2]{color:#00abff}.p-student_detail_list li.is-select[data-v-1c550df2]::before{content:\"\";display:block;position:absolute;top:0;right:0;width:.5rem;height:100%;background:#00abff}.p-student_detail_list li.is-select[data-v-1c550df2]::after{content:\"\";display:block;position:absolute;top:50%;right:-1.2rem;transform:translate(0,-50%);width:0;height:0;border-top:solid .6rem transparent;border-right:solid .6rem transparent;border-bottom:solid .6rem transparent;border-left:solid .6rem #00abff}.p-student_detail_result[data-v-1c550df2]{padding-right:.6rem;font-size:2.4rem;font-weight:700}.p-student_detail_label[data-v-1c550df2]{padding-left:1.2rem;font-size:1.4rem;font-weight:700}.p-student_detail_graph[data-v-1c550df2]{padding:2.4rem 2rem;width:47rem}.p-student_detail_graph h4[data-v-1c550df2]{padding-bottom:1.4rem;font-size:1.6rem;font-weight:700}.p-student_detail_graph p[data-v-1c550df2]{padding-bottom:2rem;font-size:1.2rem;line-height:1.5}",
    map: undefined,
    media: undefined
  });
};
/* scoped */


const __vue_scope_id__$3 = "data-v-1c550df2";
/* module identifier */

const __vue_module_identifier__$3 = undefined;
/* functional template */

const __vue_is_functional_template__$3 = false;
/* style inject SSR */

/* style inject shadow dom */

const __vue_component__$3 = /*#__PURE__*/normalizeComponent({
  render: __vue_render__$2,
  staticRenderFns: __vue_staticRenderFns__$2
}, __vue_inject_styles__$3, __vue_script__$3, __vue_scope_id__$3, __vue_is_functional_template__$3, __vue_module_identifier__$3, false, createInjector, undefined, undefined);

// Import vue component

const install = function installStudentConclusionsGraph(Vue) {
  if (install.installed) return;
  install.installed = true;
  Vue.component('StudentConclusionsGraph', __vue_component__$3);
}; // Create module definition for Vue.use()
// to be registered via Vue.use() as well as Vue.component()


__vue_component__$3.install = install; // Export component by default
// also be used as directives, etc. - eg. import { RollupDemoDirective } from 'rollup-demo';
// export const RollupDemoDirective = component;

export default __vue_component__$3;
