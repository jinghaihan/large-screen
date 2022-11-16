const basic = [
  {
    type: 'input',
    label: '名称',
    key: 'name',
    defaultValue: null,
    rules: [
      { required: true, message: '请输入名称', whitespace: true }
    ],
    props: {
      placeholder: '请输入名称',
      disabled: false,
      allowClear: true
    }
  },
  {
    type: 'textarea',
    label: '描述',
    key: 'description',
    defaultValue: null,
    rules: [
      { required: false, message: '请输入描述', whitespace: true }
    ],
    props: {
      maxLength: 300,
      placeholder: '请输入描述',
      disabled: false,
      allowClear: true
    }
  },
  {
    type: 'input-number',
    label: '长比例',
    key: 'ratioWidth',
    defaultValue: null,
    rules: [
      { required: true, message: '请输入长比例' }
    ],
    props: {
      placeholder: '长比例',
      disabled: false
    }
  },
  {
    type: 'input-number',
    label: '宽比例',
    key: 'ratioHeight',
    defaultValue: null,
    rules: [
      { required: true, message: '请输入宽比例' }
    ],
    props: {
      placeholder: '宽比例',
      disabled: false
    }
  },
  {
    type: 'color-picker',
    label: '网格线颜色',
    key: 'gridColor',
    defaultValue: null,
    rules: [
      { required: false, message: '请选择网格线颜色' }
    ],
    props: {
      disabled: false
    }
  },
  {
    type: 'material-library',
    libraryType: 'picture',
    label: '背景',
    key: 'background',
    defaultValue: null,
    rules: [
      { required: false, message: '请选择背景' }
    ],
    props: {
      disabled: false
    }
  }
]

export default basic
