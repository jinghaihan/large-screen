<template>
  <div class="container">
    <a-spin :spinning="loading">
      <a-row :gutter=[24,24]>
        <a-col v-for="(item, index) in data"
              :key="item.id + '-' + index"
              :xl="6"
              :md="8"
              :sm="2">
          <a-card hoverable>
            <!-- 数据 -->
            <template v-if="item.type !== 'create'">
              <template slot="actions">
                <tooltip-icon icon="eye" title="查看" />
                <tooltip-icon icon="edit" title="修改" />
                <tooltip-icon icon="copy" title="复制" />
                <tooltip-icon icon="delete" title="删除" />
              </template>
              <!-- 缩略图 -->
              <img
                class="image"
                slot="cover"
                alt="example"
                src="https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png"
              />
              <a-card-meta :description="item.name"></a-card-meta>
            </template>
            <!-- 新增 -->
            <template v-else>
              <div class="create" @click="onCreate">
                <a-icon class="icon" type="plus"></a-icon>
                <div class="text">新增大屏</div>
              </div>
            </template>
          </a-card>
        </a-col>
      </a-row>
    </a-spin>

    <Modal v-if="configVisible" :modalData="modalData">
      <VisualEditor @close="onModalClose"></VisualEditor>
    </Modal>
  </div>
</template>

<script>
import Modal from './modal.vue'
import VisualEditor from '@/components/VisualEditor'

export default {
  name: 'largeScreen',
  components: { Modal, VisualEditor },
  data () {
    return {
      loading: false,
      data: [],
      // 弹窗
      modalData: {},
      configVisible: false
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
          id: Math.random().toString()
        }
      ]
      this.data = [{
        type: 'create',
        id: Math.random().toString()
      }].concat(data)
      this.loading = false
    },
    onCreate () {
      this.modalData.modalType = 'create'
      this.configVisible = true
    },
    onModalClose (refresh) {
      if (refresh) {
        this.handleSearch()
      }
      this.modalData = {}
      this.configVisible = false
    }
  }
}
</script>

<style lang="less" scoped>
  .container{
    overflow-x: hidden;
    overflow-y: auto;
    .image{
      height: 200px;
    }
    .create{
      height: 262px;
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
