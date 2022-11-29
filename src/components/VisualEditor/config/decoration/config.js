const config = {
  config: {
    color: {
      type: 'config',
      config: [
        {
          type: 'color-picker',
          label: '主颜色',
          key: 'primaryColor',
          defaultValue: { hex: '#235fa7' }
        },
        {
          type: 'color-picker',
          label: '副颜色',
          key: 'deputyColor',
          defaultValue: { hex: '#4fd2dd' }
        }
      ]
    }
  }
}

export default config
