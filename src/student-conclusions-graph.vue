<template>
  <div class="m-student_survey_graph" :class="`is-${state.myData.label}`">
    <span class="p-student_survey_solid"></span>
    <header>
      <h3>{{ state.myData.category }}の調査結果</h3>
    </header>
    <div class="p-student_survey_body">
      <div class="p-student_survey_summary">
        <div class="p-student_survey_result_box">
          <div class="p-student_survey_result">
            <app-compilation-icon
              :label="state.myData.label"
              :width="`5rem`"
              :height="`5rem`"
              :img-width="`auto`"
            ></app-compilation-icon>
            <p class="p-student_survey_score">
              {{ state.myData.summary.value }}
            </p>
            <app-change-tag
              :change="state.myData.summary.change"
            ></app-change-tag>
          </div>
          <div class="p-student_survey_content">
            <p>{{ state.myData.outline }}</p>
          </div>
        </div>
        <div class="p-student_survey_result_graph">
          <line-chart
            :chart-data="state.myData.summaryData"
            :options="state.options"
            :height="state.height"
          ></line-chart>
        </div>
      </div>
      <div class="p-student_survey_detail">
        <template v-if="!state.isMobile">
          <ul class="p-student_detail_list">
            <li
              v-for="(text, index) in state.myData.details.data"
              :key="`detail-${index}`"
              :ref="`selectDetail-${index}`"
              :class="{ 'is-select': state.myData.selectDetailIndex === index }"
              @click="selectDetailData(text.label, index)"
            >
              <p class="p-student_detail_result">
                {{ state.myData.feature[text.label].summary.value }}
              </p>
              <app-change-tag
                :change="state.myData.feature[text.label].summary.change"
              ></app-change-tag>
              <p class="p-student_detail_label">{{ text.value }}</p>
            </li>
          </ul>
          <div class="p-student_detail_graph">
            <h4>{{ state.myData.details.intro.title }}</h4>
            <p>{{ state.myData.details.intro.text }}</p>
            <line-chart
              :chart-data="state.myData.detailData"
              :options="state.options"
              :height="state.height"
            ></line-chart>
          </div>
        </template>
        <template v-else>
          <ul class="p-student_detail_accordion_list">
            <li v-for="(text, index) in state.myData.details.data" :key="index">
              <button
                type="button"
                :class="{
                  'is-active': state.myData.selectDetailIndex === index
                }"
                @click="selectDetailData(text.label, index)"
              >
                <div class="p-student_detail_info">
                  <p class="p-student_detail_result">
                    {{ state.myData.feature[text.label].summary.value }}
                  </p>
                  <app-change-tag
                    :change="state.myData.feature[text.label].summary.change"
                  ></app-change-tag>
                  <p class="p-student_detail_label">{{ text.value }}</p>
                </div>
                <icon-cheveron></icon-cheveron>
              </button>
              <transition
                name="detail"
                @enter="enter"
                @after-enter="afterEnter"
                @leave="leave"
                @after-leave="afterLeave"
              >
                <div
                  v-show="state.myData.selectDetailIndex === index"
                  class="p-student_detail_area"
                >
                  <p>{{ state.myData.details.intro.text }}</p>
                  <div class="p-student_detail_graph_area">
                    <line-chart
                      :chart-data="state.myData.detailData"
                      :options="state.options"
                      :height="state.height"
                    ></line-chart>
                  </div>
                </div>
              </transition>
            </li>
          </ul>
        </template>
      </div>
    </div>
  </div>
</template>

<script>
import { defineComponent, reactive, computed, onMounted, onBeforeUnmount, onUpdated } from '@vue/composition-api'
import AppChangeTag from '@/AppChangeTag'
import AppCompilationIcon from '@/AppCompilationIcon'
import LineChart from '@/LineChart'
import IconCheveron from '@/IconCheveron'
import { variables } from '@/config/variables.js'
import { createGraphData } from '@/config/inject.js'
import { commonUtil as _c } from '@/config/commonUtil.js'

const nextFrame = (fn) => {
  window.requestAnimationFrame(() => window.requestAnimationFrame(fn))
}
export default defineComponent({
  components: {
    AppChangeTag,
    AppCompilationIcon,
    IconCheveron,
    LineChart
  },

  props: {
    summaryData: { type: Object, required: true, default: () => {} },
    monthlyData: { type: Object, required: true, default: () => {} },
    contentKey: { type: Number, required: true, default: 0 },
    contentLabel: { type: String, required: false, default: '' },
    keyLabel: { type: String, required: true, default: '' }
  },

  setup(props, context) {
    const state = reactive({
      options: {},
      myData: {},
      mql: window.matchMedia('(max-width: 768px)'),
      height: 0,
      isMobile: false
    })

    const contLabel = computed(() => props.contentLabel)
    const contKey = computed(() => props.keyLabel)

    const setStateGraphData = () => {
      state.myData = createGraphData(
        props.summaryData,
        props.monthlyData,
        contLabel.value,
        contKey.value
      )
    }

    const handleMediaQuery = () => {
      if (state.mql.matches) {
        state.options = variables.OPTIONS.sp
        state.height = 126
        state.isMobile = true
      } else {
        state.options = variables.OPTIONS.pc
        state.height = 124
        state.isMobile = false
      }
    }

    const objEmpty = (obj) => {
      return !Object.keys(obj).length
    }

    setStateGraphData()

    onMounted(() => {
      setStateGraphData()
      window.addEventListener('load', handleMediaQuery())
      window.addEventListener('resize', handleMediaQuery())
    })

    onBeforeUnmount(() => {
      window.removeEventListener('load', handleMediaQuery())
      window.removeEventListener('resize', handleMediaQuery())
    })

    const selectDetailData = (label, index) => {
      state.myData.detailData = _c.setDetailChartData(
        state.myData.feature[label].data,
        {
          background: state.myData.background,
          color: state.myData.color
        }
      )
      state.myData.selectDetailIndex = index
      state.myData.details = {
        intro: {
          title: variables.MY_LABELS[state.myData.label][index].value,
          text: variables.MY_LABELS[state.myData.label][index].text
        },
        data: variables.MY_LABELS[state.myData.label]
      }
    }

    const nextFrame = (fn) => {
      window.requestAnimationFrame(() => window.requestAnimationFrame(fn))
    }

    const enter = (el) => {
      el.style.overflow = 'hidden'
      el.style.height = '0'

      nextFrame(() => {
        el.style.height = `${el.scrollHeight}px`
      })
    }

    const leave = (el) => {
      el.style.overflow = 'hidden'
      el.style.height = `${el.scrollHeight}px`

      nextFrame(() => {
        el.style.height = '0'
      })
    }

    const afterEnter = (el) => {
      el.style.height = ''
      el.style.overflow = ''
    }

    const afterLeave = (el) => {
      el.style.height = ''
      el.style.overflow = ''
    }

    return {
      state,
      selectDetailData,
      enter,
      leave,
      afterEnter,
      afterLeave
    }
  }
})
</script>

<style lang="scss" scoped>
$base-white-color: #ffffff;
$base-primary-color: #00abff;
$base-border-color: #e1ebeb;

$base-sel-color: #00abff;
$base-motivation-color: #00c09e;
$base-grit-color: #bf6be6;
$base-deviation-color: #015593;

@mixin mobile-window {
  @media screen and(max-width: 768px) {
    @content;
  }
}

$easeInOutQuart: all 600ms cubic-bezier(0.77, 0, 0.175, 1);

.m-student_survey_graph {
  margin-top: 2rem;
  background: $base-white-color;
  border-radius: 5px;
  border: 1px solid $base-border-color;

  @include mobile-window() {
    margin: 2rem 0 0;
  }

  &.is-selEq {
    .p-student_survey_solid {
      background: $base-sel-color;
    }

    @include mobile-window() {
      header {
        background: $base-sel-color;
      }
    }
  }

  &.is-grit {
    .p-student_survey_solid {
      background: $base-grit-color;
    }

    @include mobile-window() {
      header {
        background: $base-grit-color;
      }
    }
  }

  &.is-motivation {
    .p-student_survey_solid {
      background: $base-motivation-color;
    }

    @include mobile-window() {
      header {
        background: $base-motivation-color;
      }
    }
  }

  &.is-deviation {
    .p-student_survey_solid {
      background: $base-deviation-color;
    }

    @include mobile-window() {
      header {
        background: $base-deviation-color;
      }
    }
  }
}

.p-student_survey_solid {
  display: block;
  height: 0.5rem;
  border-radius: 5px 5px 0 0;

  @include mobile-window() {
    display: none;
  }
}
header {
  padding: 1.55rem 2rem;
  font-size: 1.6rem;
  font-weight: bold;
  border-bottom: 1px solid $base-border-color;

  @include mobile-window() {
    padding: 1.2rem 2rem;
    color: $base-white-color;
    border-radius: 5px 5px 0 0;
    border-bottom: none;
  }
}

.p-student_survey_summary {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  padding: 2rem 3rem;
  border-bottom: 1px solid $base-border-color;

  @include mobile-window() {
    display: block;
    padding: 2rem;
  }
}

.p-student_survey_result {
  font-size: 0;

  > div,
  > p {
    display: inline-block;
    vertical-align: middle;
  }
}

.p-student_survey_score {
  padding-left: 2rem;
  font-size: 3.2rem;
  font-weight: bold;
}

.m-survey_change_tag {
  @include mobile-window() {
    margin-left: 1rem;
  }
}

.p-student_survey_content {
  padding-top: 1.6rem;

  p {
    font-size: 1.2rem;
    line-height: 1.8;
  }
}

.p-student_survey_result_graph {
  width: 43.2rem;

  @include mobile-window() {
    width: 100%;
  }
}

.p-student_survey_detail {
  display: flex;
  justify-content: space-between;

  @include mobile-window() {
    display: block;
  }
}

.p-student_detail_list {
  position: relative;
  width: calc(100% - 47rem);
  border-right: 1px solid $base-border-color;

  li {
    cursor: pointer;
    position: relative;
    padding: 1rem 3rem;
    font-size: 0;
    transition: $easeInOutQuart;

    p {
      display: inline-block;
      vertical-align: middle;
      transition: $easeInOutQuart;
    }
  }
  li:hover {
    background: #f9fbfb;

    .p-student_detail_result {
      color: $base-primary-color;
    }
    .p-student_detail_label {
      color: $base-primary-color;
    }
  }

  li.is-select::before {
    content: '';
    display: block;
    position: absolute;
    top: 0;
    right: 0;
    width: 0.5rem;
    height: 100%;
    background: $base-primary-color;
  }
  li.is-select::after {
    content: '';
    display: block;
    position: absolute;
    top: 50%;
    right: -1.2rem;
    transform: translate(0, -50%);
    width: 0;
    height: 0;
    border-top: solid 0.6rem transparent;
    border-right: solid 0.6rem transparent;
    border-bottom: solid 0.6rem transparent;
    border-left: solid 0.6rem $base-primary-color;
  }
}

.p-student_detail_accordion_list {
  li {
    border-bottom: 1px solid $base-border-color;
  }

  button {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 2.2rem 2rem;
    width: 100%;

    svg {
      transition: $easeInOutQuart;
    }

    &.is-active {
      svg {
        transform: rotate(-90deg);
      }
    }
  }
}
.p-student_detail_info {
  display: flex;
  justify-content: flex-start;
  align-items: center;
  width: calc(100% - 2.4rem);

  .m-survey_change_tag {
    margin-left: 1.6rem;
  }
}
.p-student_detail_area {
  padding: 0 2rem 2rem;

  p {
    padding-bottom: 1.5rem;
    font-size: 1.2rem;
    line-height: 1.5;
  }

  .p-student_detail_graph_area {
    width: 100%;
  }
}

.p-student_detail_result {
  padding-right: 0.6rem;
  font-size: 2.4rem;
  font-weight: bold;
}
.p-student_detail_label {
  padding-left: 1.2rem;
  font-size: 1.4rem;
  font-weight: bold;

  @include mobile-window() {
    font-size: 1.6rem;
  }
}

.p-student_detail_graph {
  padding: 2.4rem 2rem;
  width: 47rem;

  h4 {
    padding-bottom: 1.4rem;
    font-size: 1.6rem;
    font-weight: bold;
  }

  p {
    padding-bottom: 2rem;
    font-size: 1.2rem;
    line-height: 1.5;
  }
}

.detail-enter-active,
.detail-leave-active {
  transition: height 400ms ease;
}
</style>
