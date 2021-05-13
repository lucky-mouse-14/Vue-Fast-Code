'use strict'
const path = require('path')

const CompressionWebpackPlugin = require('compression-webpack-plugin')

function resolve (dir) {
  return path.join(__dirname, dir)
}

module.exports = {
  publicPath: process.env.NODE_ENV === 'production' ? './' : '/',
  outputDir: 'dist/',
  filenameHashing: true, // 构建后的文件是否启用哈希命名
  assetsDir: 'assets',
  lintOnSave: process.env.NODE_ENV === 'development',
  productionSourceMap: false,
  devServer: {
    // host: '192.168.16.114',
    port: '1357',
    open: true,
    overlay: {
      warings: false,
      erros: true
    }
  },

  configureWebpack: {
    resolve: {
      alias: {
        '@': resolve('src'),
        '@v': resolve('src/views'),
        '@c': resolve('src/components'),
        '@a': resolve('src/assets'),
        '@u': resolve('src/utils')
      }
    },
    plugins: [
      new CompressionWebpackPlugin({
        algorithm: 'gzip',
        test: /\.(js|css)$/, // 匹配文件名
        threshold: 10240, // 对超过10k的数据压缩
        deleteOriginalAssets: false, // 不删除源文件
        minRatio: 0.8 // 压缩比
      })
    ]
  },

  chainWebpack (config) {
    // set svg-sprite-loader
    config.module
      .rule('svg')
      .exclude.add(resolve('src/icons'))
      .end()
    config.module
      .rule('icons')
      .test(/\.svg$/)
      .include.add(resolve('src/icons'))
      .end()
      .use('svg-sprite-loader')
      .loader('svg-sprite-loader')
      .options({
        symbolId: 'icon-[name]'
      })
      .end()
  }
}
