const decoration = {
  'dv-decoration-1': {
    'name': '装饰1',
    'type': 'dv-decoration-1',
    'col': 12,
    'w': 10,
    'h': 5,
    'props': {
      'component': 'dv-decoration-1'
    }
  },
  'dv-decoration-10': {
    'name': '装饰2',
    'type': 'dv-decoration-10',
    'col': 12,
    'w': 10,
    'h': 5,
    'props': {
      'component': 'dv-decoration-10'
    }
  },
  'dv-decoration-3': {
    'name': '装饰3',
    'type': 'dv-decoration-3',
    'col': 12,
    'w': 10,
    'h': 5,
    'props': {
      'component': 'dv-decoration-3'
    }
  },
  'dv-decoration-6': {
    'name': '装饰4',
    'type': 'dv-decoration-6',
    'col': 12,
    'w': 10,
    'h': 5,
    'props': {
      'component': 'dv-decoration-6'
    }
  },
  'dv-decoration-2': {
    'name': '装饰5',
    'type': 'dv-decoration-2',
    'col': 12,
    'w': 10,
    'h': 5,
    'props': {
      'component': 'dv-decoration-2'
    }
  },
  
  'dv-decoration-4': {
    'name': '装饰6',
    'type': 'dv-decoration-4',
    'col': 12,
    'w': 10,
    'h': 5,
    'props': {
      'component': 'dv-decoration-4'
    }
  },
  'dv-decoration-5': {
    'name': '装饰7',
    'type': 'dv-decoration-5',
    'col': 12,
    'w': 10,
    'h': 5,
    'props': {
      'component': 'dv-decoration-5'
    }
  },
  'dv-decoration-8': {
    'name': '装饰8',
    'type': 'dv-decoration-8',
    'col': 12,
    'w': 10,
    'h': 5,
    'props': {
      'component': 'dv-decoration-8'
    }
  }
  
}

Object.keys(decoration).forEach(key => {
  decoration[key].props = {
    ...decoration[key].props,
    'primaryColor': '#4fd2dd',
    'deputyColor': '#235fa7'
  }
})

export default decoration
