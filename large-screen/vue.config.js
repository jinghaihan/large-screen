const { name } = require('./package')
const path = require('path')
var webpack = require('webpack')

function resolve (dir) {
  return path.join(__dirname, dir)
}

// vue.config.js
module.exports = {
  publicPath: '',

  transpileDependencies: ['resize-detector', 'ant-design-vue'],

  configureWebpack: {
    output: {
      library: name,
      libraryTarget: 'umd',
      jsonpFunction: `webpackJsonp_${name}`
    }
  },

  chainWebpack: config => {
    config.resolve.alias
      .set('public', resolve('public'))
      .set('@', resolve('src'))
      .set('@api', resolve('src/api'))
      .set('@assets', resolve('src/assets'))
      .set('@comp', resolve('src/components'))
      .set('@utils', resolve('src/utils'))
      .set('@views', resolve('src/views'))
  },

  devServer: {
    port: 10000,
    open: true,
    inline: true,
    disableHostCheck: true,
    headers: {
      'Access-Control-Allow-Origin': '*'
    },
    proxy: {
      '/mock': {
        target: 'http://127.0.0.1:3000',
        ws: false,
        changeOrigin: true
      },
    }
  }
}
