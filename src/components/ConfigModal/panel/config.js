
class Config {
  constructor (type) {
    this.type = type
  }
  getConfig () {
    let config
    switch (this.type) {
      case 'chart':
        config = component[this.type]
        break
      case 'basic':
        config = configure[this.type]
        break
      default:
        break
    }
    return config
  }
}

const component = {
  chart: [
    {
      name: '基础柱形图',
      col: 24,
      image: 'https://echarts.apache.org/examples/data/thumb/bar-background.webp?_v_=1667723755920',
      w: 20,
      h: 10,
      type: 'bar'
    },
    {
      name: '基础折线图',
      col: 24,
      image: 'https://echarts.apache.org/examples/data/thumb/line-simple.webp?_v_=1667723755920',
      w: 20,
      h: 10,
      type: 'line'
    }
  ]
}

const configure = {
  basic: [
    {
      type: 'input',
      label: '名称',
      key: 'name',
      col: 24,
      placeholder: '请输入名称',
      disabled: false,
      defaultValue: null,
      allowClear: true,
      rules: [
        { required: true, message: '请输入名称', whitespace: true }
      ]
    },
    {
      type: 'input-number',
      label: '长比例',
      key: 'ratio-width',
      col: 24,
      placeholder: '长比例',
      disabled: false,
      defaultValue: null,
      allowClear: true,
      rules: [
        { required: true, message: '请输入长比例', whitespace: true }
      ]
    },
    {
      type: 'input-number',
      label: '宽比例',
      key: 'ratio-width',
      col: 24,
      placeholder: '宽比例',
      disabled: false,
      defaultValue: null,
      allowClear: true,
      rules: [
        { required: true, message: '请输入宽比例', whitespace: true }
      ]
    },
    {
      type: 'textarea',
      label: '描述',
      key: 'description',
      col: 24,
      maxLength: 300,
      placeholder: '请输入描述',
      disabled: false,
      defaultValue: null,
      allowClear: true,
      rules: [
        { required: true, message: '请输入描述', whitespace: true }
      ]
    },
    {
      type: 'material-library',
      label: '背景',
      key: 'background',
      col: 24,
      disabled: false,
      defaultValue: null,
      rules: [
        { required: true, message: '请选择背景' }
      ]
    }
  ]
}

export default Config
