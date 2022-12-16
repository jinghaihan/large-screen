<template>
  <component v-if="!isRange"
              :is="getComponent()"
              :showTime="false"
              v-model="value"
              @change="handleChange"
              v-bind="propsData" >
    <template slot="renderExtraFooter">
      <span v-for="(key, index) in Object.keys(ranges)"
            :key="index"
            @click="handleClick(ranges[key])"
            class='ant-tag ant-tag-blue'>{{key}}</span>
    </template>
  </component>
</template>

<script>
import moment from 'moment'

export default {
  props: {
    isRange: {
      type: Boolean,
      default: false
    },
    props: {
      type: Object,
      required: false
    },
    format: null
  },
  data () {
    return {
      ranges: {},
      propsData: {},
      timeSize: null,
      dayOfWeek: null,
      timeFormat: null,
      value: undefined
    }
  },
  created () {
    this.init()
  },
  methods: {
    init () {
      if (this.props) {
        this.propsData = { ...this.props }
      }
      if (this.format) {
        let format = this.format.replace(/y/g, 'Y').replace(/d/g, 'D')
        this.propsData.format = format
        this.timeSize = format.charAt(format.length - 1)
        this.dayOfWeek = this.timeSize === 'w' ? (this.dayOfWeek || 0) : undefined
        if (this.timeSize === 'H' || this.timeSize === 'm' || this.timeSize === 's') {
          this.timeFormat = format.substring(format.indexOf('H'), format.length)
        }
      }
      // 快捷选择
      switch (this.timeSize) {
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
    handleChange (value) {
      this.value = value
      this.$emit('change', value)
    },
    handleClick (date) {
      this.handleChange(date)
    },
    getComponent () {
      let component
      switch (this.timeSize) {
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
    }
  }
}
</script>

<style lang="less" scoped>
  .ant-tag{
    cursor: pointer;
  }
</style>
