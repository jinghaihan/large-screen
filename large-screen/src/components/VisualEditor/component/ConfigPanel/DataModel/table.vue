<template>
  <div class="table-data-model-container">
    <a-form-model
      ref="form"
      :model="form"
      :rules="rules"
      v-bind="layout"
    >
      <!-- 聚合控制 -->
      <a-col :span="24">
        <a-form-model-item ref="isGroupBy"
                            prop="isGroupBy"
                            label="聚合控制">
          <a-radio-group v-model="form.isGroupBy"
                        :options="[
                          { label: '允许聚合', value: '1' },
                          { label: '不再聚合', value: '0' }
                        ]"
                        @change="onGroupByChange">
          </a-radio-group>
        </a-form-model-item>
      </a-col>
      <!-- 默认排序 -->
      <a-col :span="24">
        <a-form-model-item ref="orderFieldId"
                            prop="orderFieldId"
                            label="默认排序">
          <a-select v-model="form.orderFieldId"
                    placeholder="请选择默认排序"
                    :show-search="true"
                    :filter-option="filterOptions"
                    allowClear
                    :options="fieldOptions"
                    @change="onFieldChange" >
          </a-select>
        </a-form-model-item>
        <!-- 默认排序 -->
        <a-form-model-item v-if="form.orderFieldId"
                            ref="orderType"
                            prop="orderType">
          <a-radio-group v-model="form.orderType"
                          :options="[
                          { label: '升序', value: 'ASC' },
                          { label: '降序', value: 'DESC' }
                          ]"
                          @change="onChange">
          </a-radio-group>
        </a-form-model-item>
      </a-col>
      <!-- 数据类型 -->
      <a-col :span="24">
        <a-form-model-item ref="type"
                            prop="type"
                            label="数据类型">
          <a-select v-model="form.type"
                    placeholder="请选择数据类型"
                    :show-search="true"
                    :filter-option="filterOptions"
                    :options="typeOptions"
                    @change="onTypeChange" >
          </a-select>
        </a-form-model-item>
      </a-col>
      <!-- 文字内容 -->
      <a-col :span="24" v-if="form.type === 'text'">
        <a-form-model-item ref="textData"
                            prop="textData"
                            label="文字内容">
          <a-input  v-model="form.textData"
                    placeholder="请选择文字内容"
                    @change="onChange" >
          </a-input>
        </a-form-model-item>
      </a-col>
      <!-- 数据字段 -->
      <a-col :span="24" v-if="form.type === 'field'">
        <a-form-model-item ref="fieldData"
                           prop="fieldData"
                           label="数据字段">
          <a-tree-select
            v-model="form.fieldData"
            placeholder="请选择数据字段"
            :tree-data="[]"
            :dropdown-style="{ maxHeight: '400px', overflow: 'auto' }"
            tree-default-expand-all
            show-search
            :filterTreeNode='filterTreeOptions'
            @select="onChange"
          >
          </a-tree-select>
        </a-form-model-item>
      </a-col>
    </a-form-model>
  </div>
</template>

<script>

const typeOptions = [
  { label: '文字', value: 'text' },
  { label: '字段', value: 'field' }
]

export default {
  props: {
    editor: null,
    component: {
      type: Object,
      required: true
    }
  },
  data () {
    return {
      cell: {},
      modelData: {},
      dimensionMap: {},
      measureMap: {},
      form: {},
      rules: {},
      layout: {
        labelCol: { span: 24 },
        wrapperCol: { span: 24 }
      },
      fieldOptions: [],
      typeOptions
    }
  },
  watch: {
    component: {
      deep: true,
      handler: function (curr, prev) {
        if (curr.key) {
          prev = prev || {}
          if (curr.key !== prev.key) {
            this.init()
          }
        } else {
          this.cell = {}
          this.form = {}
          this.rules = {}
        }
      }
    }
  },
  created () {
    this.init()
  },
  methods: {
    async init () {
      this.cell = this.editor.cell[this.component.key]
      this.handleForm()

      // 存在全局模型配置
      if (this.editor.instance['modelPanel']) {
        this.getModelData()
      }
      this.$forceUpdate()
    },
    handleForm () {
      // 配置回显
      let data = this.cell.configData.dataModelData
      if (data) {
        this.form = { ...data }
      } else {
        this.form = {
          isGroupBy: '1'
        }
      }
    },
    getModelData () {
      this.modelData = this.editor.instance['modelPanel'].modelData
      if (this.modelData.dimensions && this.modelData.measures) {
        this.fieldOptions = []
        this.dimensionMap = {}
        this.measureMap = {}
        
        this.modelData['dimensions'].forEach(item => {
          this.fieldOptions.push({
            label: item.name,
            value: item.id
          })
          this.dimensionMap[item.id] = item
        })
        this.modelData['measures'].forEach(item => {
          this.fieldOptions.push({
            label: item.name,
            value: item.id
          })
          this.measureMap[item.id] = item
        })
      }
    },
    onGroupByChange () {
      this.onChange()
    },
    onFieldChange () {
      if (!this.form.orderType && typeof this.form.orderType !== 'boolean') {
        this.form.orderType = 'ASC'
      }
      this.onChange()
    },
    onTypeChange () {
      this.onChange()
    },
    onChange () {
      this.$emit('change', this.form)
    },
    filterOptions (input, option) {
      return (
        option.componentOptions.children[0].text.includes(input)
      )
    },
    filterTreeOptions (input, option) {
      let flag = false
      if (!option.data.props.isLeaf) {
        option.componentOptions.children.forEach(item => {
          if (item.data.props.title.toLowerCase().indexOf(input.toLowerCase()) >= 0) {
            flag = true
          }
        })
      } else {
        flag = option.componentOptions.propsData.title.toLowerCase().indexOf(input.toLowerCase()) >= 0
      }
      return flag
    }
  }
}
</script>

<style lang="less" scoped>
  .table-data-model-container{
    padding: 0 24px;
  }
</style>
