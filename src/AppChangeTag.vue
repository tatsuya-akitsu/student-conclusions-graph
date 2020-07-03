<template>
  <div class="m-survey_change_tag" :class="changeType">
    <slot></slot>
    <p class="m-survey_change_result">
      <template v-if="changeType === 'is-down'">
        <img src="./assets/img/icons/icon_triangle_down.svg" alt="" />
      </template>
      <template v-else-if="changeType === 'is-up'">
        <img src="./assets/img/icons/icon_triangle_up.svg" alt="" />
      </template>
      <template v-else>
        <span>-</span>
      </template>
      <span class="m-survey_change_value">{{ change }}</span>
    </p>
  </div>
</template>

<script>
import { defineComponent, reactive, computed } from '@vue/composition-api'

export default defineComponent({
  props: {
    change: { type: Number, required: true, default: 0 }
  },

  setup (props) {
    const state = reactive({
      value: String(props.change).includes('-') ? Number(String(props.change).replace('-', '')) : props.change,
      changeType: computed(() => {
        if (props.change === 0 || props.change === 0.0) {
          return 'is-normal'
        } else if (String(props.change).includes('-')) {
          return 'is-down'
        } else {
          return 'is-up'
        }
      })
    })

    return {
      value: state.value,
      changeType: state.changeType
    }
  }
});
</script>

<style lang="scss" scoped>
.m-survey_change_tag {
  display: inline-block;
  padding: 0.5rem 1rem;
  font-size: 0;
  text-align: center;
  border-radius: 5px;

  &.is-down {
    background: #ffebf2;

    .m-survey_change_result > span {
      color: #ff0055;
    }
  }
  &.is-up {
    background: #ebfff8;

    .m-survey_change_result > span {
      color: #00eb9d;
    }
  }
  &.is-normal {
    background: #f9fbfb;

    .m-survey_change_result > span {
      color: #7ba0a6;
    }
    .m-survey_change_result > span:nth-child(1) {
      padding-left: 0;
      padding-right: 1rem;
    }
    .m-survey_change_result > span:nth-child(2) {
      padding: 0;
    }
  }
}

.m-survey_change_result {
  display: inline-block;
  vertical-align: middle;
  font-size: 0;

  img,
  span {
    display: inline-block;
    vertical-align: middle;
  }
  span {
    padding-left: 0.28rem;
    font-size: 1.4rem;
    font-weight: bold;
    line-height: 1;
  }
}
</style>
