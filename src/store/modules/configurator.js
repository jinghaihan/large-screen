import Vue from 'vue'

const configurator = {
  namespaced: true,
  state: {
    config: {},
    scale: 1,
    grid: false,
    maxLayer: 5,
    colNum: 100,
    paper: null
  },
  getters: {
    config: (state) => {
      return state.config
    },
    currConfig: (state) => {
      return state.config[state.paper]
    },
    scale: (state) => {
      return state.scale
    },
    grid: (state) => {
      return state.grid
    },
    maxLayer: (state) => {
      return state.maxLayer
    },
    colNum: (state) => {
      return state.colNum
    },
    paper: (state) => {
      return state.paper
    }
  },
  mutations: {
    SET_CONFIG: (state, config) => {
      state.config = config
    },
    SET_CURRCONFIG: (state, config) => {
      Vue.set(state.config, state.paper, config)
    },
    SET_SCALE: (state, scale) => {
      state.scale = scale
    },
    SET_GRID: (state, grid) => {
      state.grid = grid
    },
    SET_PAPER: (state, paper) => {
      state.paper = paper
    }
  },
  actions: {
    
  }
}

export default configurator
