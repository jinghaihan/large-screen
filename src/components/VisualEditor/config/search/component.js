const search = {
  'panel': {
    name: '查询面板',
    type: 'panel',
    col: 12,
    w: 100,
    h: 10,
    props: {
      component: 'Search',
      type: 'Panel',
      enable: false
    }
  },
  'input': {
    name: '输入框',
    type: 'input',
    col: 12,
    w: 10,
    h: 5,
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
    props: {
      component: 'Search',
      type: 'SelectMultiple',
      enable: false
    }
  }
  // 'radio': {

  // },
  // 'checkbox': {

  // },
  // 'date-picker': {

  // },
  // 'range-picker': {

  // }
}

export default search
