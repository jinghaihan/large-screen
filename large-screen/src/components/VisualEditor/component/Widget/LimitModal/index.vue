<template>
  <a-modal
    :visible="true"
    @cancel="closeModal()"
    @ok="onSubmit"
    :maskClosable="false"
    :keyboard="false"
    :width="1000"
    title="默认数据限制器"
    :getContainer="getContainer()"
    wrapClassName="visual-editor-modal"
  >
    <a-button type="primary" size="small" icon="plus-circle" @click="onAdd()">添加</a-button>
    <div class="container">
      <VirtualForm ref="form"
                   v-if="visible"
                   :header="header"
                   :config="config">
      </VirtualForm> 
    </div>
  </a-modal>
</template>

<script>
import _ from 'lodash'
import VirtualForm from '../../Widget/VirtualForm'
import { header, config } from './config'

export default {
  props: {
    editor: null
  },
  components: { VirtualForm },
  data () {
    return {
      data: [],
      loading: false,
      header,
      config: [],
      visible: false
    }
  },
  created () {
    this.init()
  },
  methods: {
    async init () {
      let configData = _.cloneDeep(config)
      let options = []
      if (this.editor.instance.modelPanel) {
        let modelData = this.editor.instance.modelPanel.modelData
        let map = { 'dimension': '维度', 'measure': '指标' }
        Object.keys(map).forEach(key => {
          options.push({
            label: map[key],
            value: key,
            children: [],
            isLeaf: false,
            selectable: false
          })
          if (modelData[key + 's']) {
            options[options.length - 1].children = modelData[key + 's'].map(item => {
              return {
                label: item.name,
                value: item.id + '-' + key,
                isLeaf: true,
                format: item.format
              }
            })
          }
        })
      }
      
      configData[0].options = options
      // 选择字段联动修改字段格式
      configData[0].relations.assign['format'] = function (value, formData) {
        let option = options[0].children.find(item => item.value === formData.field) || options[1].children.find(item => item.value === formData.field)
        return option.format
      }
      this.config = configData
      this.visible = true

      await this.$nextTick()
      if (!this.editor.builtinConditions) {
        // 新增一行
        this.onAdd()
      } else {
        // 回显数据
        this.$refs.form.onUpdate(this.editor.builtinConditions)
      }
    },
    onAdd () {
      this.$refs.form.onAdd(1)
    },
    onSubmit () {
      this.$refs.form.validateFields().then(result => {
        if (result.error) return
        this.editor.builtinConditions = result.value
        this.closeModal()
      })
    },
    closeModal (data) {
      this.$emit('close', data)
    },
    getContainer () {
      return () => document.getElementById('visual-editor-container')
    }
  }
}
</script>

<style lang="less" scoped>
  .container{
    margin-top: 16px;
    height: 300px;
  }
</style>
