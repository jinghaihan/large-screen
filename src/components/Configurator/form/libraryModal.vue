<template>
  <a-modal
    :visible="true"
    @ok="onSubmit"
    @cancel="closeModal()"
    :maskClosable="false"
    :keyboard="false"
    :width="900"
    :footer="null"
    title="素材库"
  >
    <div class="container">
    <a-spin :spinning="loading">
      <a-row :gutter=[24,24]>
        <a-col v-for="(item, index) in data"
              :key="item.id + '-' + index"
              :xl="6"
              :md="8"
              :sm="2">
          <a-card hoverable @click="onClick(item)">
            <!-- 数据 -->
            <template v-if="item.type !== 'create'">
              <!-- 缩略图 -->
              <img
                class="image"
                slot="cover"
                alt="example"
                :src="item.image"
              />
            </template>
            <!-- 新增 -->
            <template v-else>
              <div class="create" @click="onUpload">
                <a-icon class="icon" type="plus"></a-icon>
                <div class="text">上传</div>
              </div>
            </template>
          </a-card>
        </a-col>
      </a-row>
    </a-spin>
  </div>
  </a-modal>
</template>

<script>
export default {
  props: {
    type: {
      type: String,
      required: true
    }
  },
  data () {
    return {
      data: [],
      loading: false
    }
  },
  created () {
    this.handleSearch()
  },
  methods: {
    handleSearch () {
      this.loading = true
      let data = [
        {
          name: '数据可视化大屏',
          id: Math.random().toString(),
          image: 'http://v6.dooring.cn/beta/static/bg5.a9600bec.jpg'
        }
      ]
      this.data = [{
        type: 'create',
        id: Math.random().toString()
      }].concat(data)
      this.loading = false
    },
    onClick (data) {
      if (!data.image) return
      this.$emit('submit', data.image)
      this.$emit('close')
    },
    closeModal (data) {
      this.$emit('close', data)
    }
  }
}
</script>

<style lang="less" scoped>
  .container{
    overflow-x: hidden;
    overflow-y: auto;
    /deep/.ant-card-body{
      padding: 0;
    }
    .image{
      height: 120px;
    }
    .create{
      height: 120px;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      .icon{
        font-size: 24px;
      }
      .text{
        font-weight: bold;
        font-size: 18px;
      }
    }
  }
</style>
