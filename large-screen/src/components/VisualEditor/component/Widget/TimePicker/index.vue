<template>
  <component  v-if="!isRange"
              :is="getComponent()"
              :showTime="false"
              :showToday="false"
              v-model="value"
              @change="onChange"
              v-bind="propsData" >
    <template slot="renderExtraFooter">
      <span v-for="(key, index) in Object.keys(ranges)"
            :key="index"
            @click="onClick(ranges[key])"
            class='ant-tag ant-tag-blue'>{{key}}</span>
    </template>
  </component>
  <div class="range-time-picker" v-else>
    <component  :is="getComponent()"
                :showTime="false"
                :showToday="false"
                :disabled-date="disabledStartDate"
                v-model="startValue"
                v-bind="propsData"
                @change="onRangeChange" >
      <template slot="renderExtraFooter">
        <span v-for="(key, index) in Object.keys(ranges)"
              :key="index"
              @click="onClick(ranges[key], 'start')"
              class='ant-tag ant-tag-blue'>{{key}}</span>
      </template>
    </component>
    <div> ～ </div>
    <component  :is="getComponent()"
                :showTime="false"
                :showToday="false"
                :disabled-date="disabledEndDate"
                v-model="endValue"
                v-bind="propsData"
                @change="onRangeChange" >
      <template slot="renderExtraFooter">
        <span v-for="(key, index) in Object.keys(ranges)"
              :key="index"
              @click="onClick(ranges[key], 'end')"
              class='ant-tag ant-tag-blue'>{{key}}</span>
      </template>
    </component>
  </div>
</template>

<script>
import moment from 'moment'

export default {
  props: {
    data: null,
    isRange: {
      type: Boolean,
      default: false
    },
    dateOption: {
      type: Object
    },
    props: {
      type: Object,
      required: false
    }
  },
  data () {
    return {
      ranges: {},
      propsData: {},
      timeSize: null,
      dayOfWeek: null,
      timeFormat: null,
      value: undefined,
      startValue: undefined,
      endValue: undefined
    }
  },
  created () {
    this.init()
  },
  watch: {
    isRange: {
      handler: function (value) {
        this.initValue()
        this.init()
        this.onChange()
      }
    },
    props: {
      deep: true,
      handler: function (value) {
        this.propsData = { ...this.propsData, ...this.props }
      }
    }
  },
  methods: {
    init () {
      // 回显
      if (this.data) {
        if (this.data instanceof Array) {
          this.startValue = this.data[0]
          this.endValue = this.data[1]
        }
        this.value = this.data
      }
      if (this.props) {
        this.propsData = { ...this.props }
      }
      let { timeSize, format } = this.dateOption || {}
      this.propsData.format = format
      // 快捷选择
      switch (timeSize) {
        case 'Y':
          if (this.isRange) {
            this.ranges = {
              '今年': [moment().startOf('year'), moment().endOf('year')],
              '最近三年': [moment().year(moment().year() - 2).startOf('year'), moment().endOf('year')],
              '最近五年': [moment().year(moment().year() - 4).startOf('year'), moment().endOf('year')]
            }
          } else {
            this.ranges = {
              '去年': moment().year(moment().year() - 1).startOf('year'),
              '三年前': moment().year(moment().year() - 3).startOf('year'),
              '五年前': moment().year(moment().year() - 5).startOf('year')
            }
          }
          break
        case 'M':
          if (this.isRange) {
            this.ranges = {
              '本月': [moment().startOf('month'), moment().endOf('month')],
              '最近三个月': [moment().month(moment().month() - 2).startOf('month'), moment().endOf('month')],
              '最近六个月': [moment().month(moment().month() - 5).startOf('month'), moment().endOf('month')]
            }
          } else {
            this.ranges = {
              '上个月': moment().month(moment().month() - 1).startOf('month'),
              '三个月前': moment().month(moment().month() - 3).startOf('month'),
              '六个月前': moment().month(moment().month() - 6).startOf('month')
            }
          }
          break
        default:
          if (this.isRange) {
            this.ranges = {
              '今天': [moment(), moment()],
              '最近三天': [moment().subtract(2, 'days'), moment()],
              '最近一周': [moment().subtract(6, 'days'), moment()]
            }
          } else {
            this.ranges = {
              '今天': moment(),
              '昨天': moment().subtract(1, 'days'),
              '一周前': moment().subtract(6, 'days')
            }
          }
          break
      }
    },
    initValue () {
      this.value = undefined
      this.startValue = undefined
      this.endValue = undefined
    },
    onChange (value, type) {
      this.value = value
      this.$emit('change', value)
    },
    onClick (date, type) {
      if (type === 'start') {
        this.startValue = date
      }
      if (type === 'end') {
        this.endValue = date
      }
      this.onChange(date, type)
    },
    onRangeChange () {
      this.onChange([this.startValue, this.endValue])
    },
    getComponent () {
      let component
      let { timeSize } = this.dateOption || {}
      switch (timeSize) {
        case 'Y':
          component = 'a-date-picker'
          this.propsData.mode = 'year'
          break
        case 'M':
          component = 'a-month-picker'
          break
        case 'w':
          component = 'a-week-picker'
          break
        default:
          component = 'a-date-picker'
          break
      }
      return component
    },
    disabledStartDate (startValue) {
      let endValue = this.endValue
      if (!startValue || !endValue) {
        return false
      }
      let type
      let { timeSize } = this.dateOption || {}
      switch (timeSize) {
        case 'Y':
          type = 'year'
          break
        case 'M':
          type = 'month'
          break
        default:
          type = 'day'
          break
      }
      return startValue.startOf(type).valueOf() > endValue.valueOf()
    },
    disabledEndDate (endValue) {
      let startValue = this.startValue
      if (!endValue || !startValue) {
        return false
      }
      return startValue.valueOf() > endValue.valueOf()
    }
  }
}
</script>

<style lang="less" scoped>
  .range-time-picker{
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  .ant-tag{
    cursor: pointer;
  }
</style>
