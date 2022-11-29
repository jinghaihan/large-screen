const decoration = {}

for (let i = 1; i < 13; i++) {
  decoration['dv-decoration-' + i] = {
    name: '装饰' + i,
    type: 'dv-decoration-' + i,
    col: 12,
    w: 10,
    h: 5,
    props: {
      component: 'dv-decoration-' + i,
      primaryColor: '#235fa7',
      deputyColor: '#4fd2dd'
    }
  }
}

export default decoration
