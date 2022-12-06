const search = {
  'searchPanel': {
    name: '查询面板',
    type: 'searchPanel',
    col: 12,
    w: 100,
    h: 10,
    restriction: {
      instance: 'searchPanel',
      instanceName: '查询面板',
      unique: true
    },
    props: {
      component: 'Search',
      type: 'searchPanel',
      enable: false
    }
  },
  'input': {
    name: '输入框',
    type: 'input',
    col: 12,
    w: 10,
    h: 5,
    restriction: {
      dependentInstance: 'searchPanel',
      dependentInstanceName: '查询面板'
    },
    props: {
      component: 'Search',
      type: 'Input',
      enable: false
    }
  },
  'input-multiple': {
    name: '多值输入框',
    type: 'input-multiple',
    col: 12,
    w: 10,
    h: 5,
    restriction: {
      dependentInstance: 'searchPanel',
      dependentInstanceName: '查询面板'
    },
    props: {
      component: 'Search',
      type: 'InputMultiple',
      enable: false
    }
  },
  'select': {
    name: '下拉框',
    type: 'select',
    col: 12,
    w: 10,
    h: 5,
    restriction: {
      dependentInstance: 'searchPanel',
      dependentInstanceName: '查询面板'
    },
    props: {
      component: 'Search',
      type: 'Select',
      enable: false
    }
  },
  'select-multiple': {
    name: '多值下拉框',
    type: 'select-multiple',
    col: 12,
    w: 10,
    h: 5,
    restriction: {
      dependentInstance: 'searchPanel',
      dependentInstanceName: '查询面板'
    },
    props: {
      component: 'Search',
      type: 'SelectMultiple',
      enable: false
    }
  },
  'radio': {
    name: '单选框',
    type: 'radio',
    col: 12,
    w: 10,
    h: 5,
    restriction: {
      dependentInstance: 'searchPanel',
      dependentInstanceName: '查询面板'
    },
    props: {
      component: 'Search',
      type: 'Radio',
      enable: false
    }
  },
  'checkbox': {
    name: '多选框',
    type: 'checkbox',
    col: 12,
    w: 10,
    h: 5,
    restriction: {
      dependentInstance: 'searchPanel',
      dependentInstanceName: '查询面板'
    },
    props: {
      component: 'Search',
      type: 'Checkbox',
      enable: false
    }
  },
  'date-picker': {
    name: '日期选择框',
    type: 'date-picker',
    col: 12,
    w: 10,
    h: 5,
    restriction: {
      dependentInstance: 'searchPanel',
      dependentInstanceName: '查询面板'
    },
    props: {
      component: 'Search',
      type: 'DatePicker',
      enable: false
    }
  },
  'range-picker': {
    name: '时间范围选择框',
    type: 'range-picker',
    col: 12,
    w: 10,
    h: 5,
    restriction: {
      dependentInstance: 'searchPanel',
      dependentInstanceName: '查询面板'
    },
    props: {
      component: 'Search',
      type: 'RangePicker',
      enable: false
    }
  }
}

export default search