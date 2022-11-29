const decoration = {}

for (let i = 1; i < 13; i++) {
  decoration['dv-decoration-' + i] = {
    name: '装饰' + i,
    type: 'dv-decoration-' + i,
    col: 12,
    w: 25,
    h: 10,
    props: {
      component: 'dv-decoration-' + i,
      primaryColor: '#4fd2dd',
      deputyColor: '#235fa7'
    }
  }
}

export default decoration
