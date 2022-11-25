<template>
  <div class="clock-container">
    <a-card v-for="key in Object.keys(time)"
            :key="key"
            :bodyStyle="cardStyle"
            size="small"
            hoverable>
      {{time[key]}}
    </a-card>
  </div>
</template>

<script>
import moment from 'moment'

export default {
  data () {
    return {
      time: {
        // year: '',
        // month: '',
        // date: '',
        hours: '',
        minutes: '',
        seconds: ''
      },
      cardStyle: {
        height: '',
        width: '',
        color: '',
        fontSize: '',
        fontWeight: '',
        background: '',
        borderWidth: '',
        borderStyle: '',
        borderColor: '',
        padding: '0',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
      },
      interval: null
    }
  },
  created () {
    this.getTime()
    this.interval = setInterval(() => {
      this.getTime()
    }, 1000)
  },
  beforeDestroy () {
    clearInterval(this.interval)
    this.interval = null
  },
  methods: {
    getTime () {
      let date = moment(new Date())
      // this.time.year = date.year()
      // this.time.month = date.month() + 1
      // this.time.date = date.date()
      this.time.hours = date.hours() < 10 ? '0' + date.hours() : date.hours()
      this.time.minutes = date.minutes() < 10 ? '0' + date.minutes() : date.minutes()
      this.time.seconds = date.seconds() < 10 ? '0' + date.seconds() : date.seconds()
    }
  }
}
</script>

<style lang="less" scoped>
  .clock-container{
    height: 100%;
    width: 100%;
    overflow: hidden;
    display: flex;
    align-items: center;
    justify-content: space-around;
    /deep/.ant-card-boredered{
      border: none;
    }
  }
</style>
