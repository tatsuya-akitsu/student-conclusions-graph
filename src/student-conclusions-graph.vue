<template>
  <div class="m-student_survey_graph" :class="`is-${myData.label}`">
    <span class="p-student_survey_solid"></span>
    <header>
      <h3>{{ myData.category }}の調査結果</h3>
    </header>
    <div class="p-student_survey_body">
      <div class="p-student_survey_summary">
        <div class="p-student_survey_result_box">
          <div class="p-student_survey_result">
            <app-compilation-icon
              :label="myData.label"
              :width="`5rem`"
              :height="`5rem`"
              :img-width="`auto`"
            ></app-compilation-icon>
            <p class="p-student_survey_score">{{ myData.summary.value }}</p>
            <app-change-tag :change="myData.summary.change"></app-change-tag>
          </div>
          <div class="p-student_survey_content">
            <ul>
              <li>感情・情動能力</li>
              <li>短い説明</li>
              <li>みじかい説明</li>
            </ul>
          </div>
        </div>
        <div class="p-student_survey_result_graph">
          <line-chart
            :chart-data="summaryChartData"
            :options="options"
            :height="124"
          ></line-chart>
        </div>
      </div>
      <div class="p-student_survey_detail">
        <ul class="p-student_detail_list">
          <li
            v-for="(text, index) in details.data"
            :key="`detail-${index}`"
            :ref="`selectDetail-${index}`"
            :class="{ 'is-select': selectDetail === index }"
            @click="selectDetailData(text.label, index)"
          >
            <p class="p-student_detail_result">
              {{ myData[text.label].summary.value }}
            </p>
            <app-change-tag
              :change="myData[text.label].summary.change"
            ></app-change-tag>
            <p class="p-student_detail_label">{{ text.value }}</p>
          </li>
        </ul>
        <div class="p-student_detail_graph">
          <h4>
            {{ details.intro.title }}
          </h4>
          <p>
            {{ details.intro.text }}
          </p>
          <line-chart
            :chart-data="detailChartData"
            :options="options"
            :height="124"
          ></line-chart>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { defineComponent, reactive, computed } from '@vue/composition-api'
import AppChangeTag from '@/AppChangeTag'
import AppCompilationIcon from '@/AppCompilationIcon'
import LineChart from '@/LineChart'

export default defineComponent({
  components: {
    AppChangeTag,
    AppCompilationIcon,
    LineChart
  },

  props: {
    myData: { type: Object, required: true, default: () => {} },
    myLabels: { type: Object, required: true, default: () => {} },
    summaryChartData: { type: Object, required: true, default: () => {} },
    detailChartData: { type: Object, required: true, default: () => {} },
    details: { type: Object, required: true, default: () => {} },
    selectDetail: { type: Number, required: true, default: 0 },
    contentKey: { type: Number, required: false, default: 0 }
  },

  setup (props, { emit }) {
    const state = reactive({
      options: {
        legend: {
          labels: {
            filter: (items) => {
              return (items.text = '')
            }
          }
        },
        tooltips: {
          mode: 'index',
          intersect: true
        },
        scales: {
          xAxes: [
            {
              display: true, // Y軸の表示
              ticks: {
                min: 0, // Y軸の最小値
                max: 5, // Y軸の最大値
                fontSize: 12, // Y軸のフォントサイズ
                fontColor: '#7BA0A6',
                stepSize: 1 // Y軸の間隔
              },
              gridLines: {
                color: '#E1EBEB'
              }
            }
          ],
          yAxes: [
            {
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
            }
          ]
        }
      }
    })

    function selectDetailData (label, index) {
      emit('handleDetailData', {
        label,
        index,
        key: props.contentKey,
        category: props.myData.label
      })
    }

    return {
      myData: props.myData,
      myLabels: props.myLabels,
      summaryChartData: props.summaryChartData,
      detailChartData: props.detailChartData,
      details: props.details,
      selectDetail: props.selectDetail,
      contentKey: props.contentKey,
      options: state.options,
      selectDetailData
    }
  }
});
</script>

<style lang="scss" scoped>
$base-white-color: #ffffff;
$base-primary-color: #00ABFF;
$base-border-color: #E1EBEB;

$base-sel-color: #00ABFF;
$base-motivation-color: #00C09E;
$base-grit-color: #BF6BE6;
$base-deviation-color: #015593;

$easeInOutQuart: all 600ms cubic-bezier(0.77, 0, 0.175, 1);


.m-student_survey_graph {
  margin-top: 2rem;
  background: $base-white-color;
  border-radius: 5px;
  border: 1px solid $base-border-color;

  &.is-selEq {
    .p-student_survey_solid {
      background: $base-sel-color;
    }
  }

  &.is-grit {
    .p-student_survey_solid {
      background: $base-grit-color;
    }
  }

  &.is-motivation {
    .p-student_survey_solid {
      background: $base-motivation-color;
    }
  }

  &.is-deviation {
    .p-student_survey_solid {
      background: $base-deviation-color;
    }
  }
}

.p-student_survey_solid {
  display: block;
  height: 0.5rem;
  border-radius: 5px 5px 0 0;
}
header {
  padding: 1.55rem 2rem;
  font-size: 1.6rem;
  font-weight: bold;
  border-bottom: 1px solid $base-border-color;
}

.p-student_survey_summary {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  padding: 2rem 3rem;
  border-bottom: 1px solid $base-border-color;
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

.p-student_survey_content {
  padding-top: 1.6rem;

  li {
    position: relative;
    padding: 0.6rem 0 0.6rem 2.8rem;
    font-size: 1.4rem;
    line-height: 1.2;
  }
  li::before {
    content: '';
    display: block;
    position: absolute;
    top: 50%;
    left: 1rem;
    transform: translate(0, -50%);
    width: 0.6rem;
    height: 0.6rem;
    border-radius: 50%;
    background: $base-primary-color;
  }
}

.p-student_survey_result_graph {
  width: 43.2rem;
}

.p-student_survey_detail {
  display: flex;
  justify-content: space-between;
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

.p-student_detail_result {
  padding-right: 0.6rem;
  font-size: 2.4rem;
  font-weight: bold;
}
.p-student_detail_label {
  padding-left: 1.2rem;
  font-size: 1.4rem;
  font-weight: bold;
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
</style>
