<template>
  <div class="m-survey_change_tag" :class="changeType">
    <slot></slot>
    <p class="m-survey_change_result">
      <template v-if="changeType === 'is-down'">
        <icon-triangle-down></icon-triangle-down>
      </template>
      <template v-else-if="changeType === 'is-up'">
        <icon-triangle-up></icon-triangle-up>
      </template>
      <template v-else>
        <span>-</span>
      </template>
      <span class="m-survey_change_value">{{ change | removeMinus }}</span>
    </p>
  </div>
</template>

<script>
import IconTriangleDown from "@/IconTriangleDown";
import IconTriangleUp from "@/IconTriangleUp";

export default {
  filters: {
    removeMinus: (num) => {
      if (String(num).includes('-')) {
        return Number(String(num).replace('-', ''))
      } else {
        return num
      }
    }
  },
  props: {
    change: { type: Number, required: true, default: 0 }
  },
  computed: {
    changeType() {
      if (this.change === 0 || this.change === 0.0) {
        return 'is-normal'
      } else if (String(this.change).includes('-')) {
        return 'is-down'
      } else {
        return 'is-up'
      }
    }
  }
}
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

  svg,
  span {
    display: inline-block;
    vertical-align: middle;
  }
  svg {
    width: 3rem;
  }
  span {
    padding-left: 0.28rem;
    font-size: 1.4rem;
    font-weight: bold;
    line-height: 1;
  }
}
</style>
