<template>
  <a-popover :title="config.label"
             :overlayStyle="overlayStyle"
             :getPopupContainer="triggerNode => {
                return triggerNode.parentNode || document.body;
              }">
    <div slot="content" class="render-content">
      <a-row :gutter="[8, 8]">
        <a-col :span="12"
                v-for="option in config.props.options"
                :key="option.value"
                :value="option.value"
                :label="option.label"
                @click="onClick(option)">
          <a-card :title="option.label"
                  size="small"
                  hoverable
                  :class="option.value === form[config.key] ? 'selected-card' : 'card'">
            <div class="component">
              <component v-if="option.component"
                        :is="option.component"
                        v-bind="{ ...getProps(option) }">
              </component>
              <div v-else class="component">{{option.label}}</div>
            </div>
          </a-card>
        </a-col>
      </a-row>
    </div>
    <span class="trigger">{{getValue()}}</span>
  </a-popover>
</template>

<script>
import Border from '../../../Border'
import color from '../../../../config/color'

export default {
  props: {
    config: {
      type: Object,
      required: true
    },
    form: {
      type: Object,
      required: true
    }
  },
  components: { Border },
  data () {
    return {
      overlayStyle: {
        padding: 0,
        maxHeight: '300px',
        width: '400px',
        overflow: 'hidden',
        'overflow-y': 'auto'
      }
    }
  },
  methods: {
    onClick (option) {
      this.form[this.config.key] = option.value
      this.onChange()
    },
    onChange () {
      this.$emit('change')
    },
    getProps (option) {
      return {
        data: {
          component: option.value,
          primaryColor: color['dataV-primary-color'],
          deputyColor: color['dataV-deputy-color'],
          backgroundColor: color['dataV-background-color'],
          padding: 0
        }
      }
    },
    getValue () {
      return this.config.props.options.find(item => item.value === this.form[this.config.key]).label
    }
  }
}
</script>

<style lang="less" scoped>
  .trigger{
    cursor: pointer;
  }
  .render-content{
    .component{
      height: 80px;
      width: 100%;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 20px;
      font-weight: bold;
    }
    .selected-card{
      border: 1px solid var(--highlight-color);
      box-shadow: 0 0 6px var(--highlight-color);
      border-radius: 4px;
    }
  }
  /deep/.ant-card{
    background: var(--primary-color);
  }
  /deep/.ant-card-head{
    background: var(--normal-color);
    color: var(--font-color);
    padding: 0;
    min-height: 28px;
    display: flex;
    align-items: center;
  }
  /deep/.ant-card-head-wrapper{
    width: 100%;
  }
  /deep/.ant-card-head-title{
    padding: 0 !important;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  /deep/.ant-card-bordered{
    border-color: var(--highlight-color);
  }
</style>
