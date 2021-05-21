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
        '@u': resolve('src/utils'),
        '@styles': resolve('src/styles'),
        '@config': resolve('src/config'),
        '@themes': resolve('src/themes')
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
  },

  /**
   * css相关配置
   */
  css: {
    extract: true, // 是否使用css分离插件 ExtractTextPlugin
    sourceMap: false, // 开启 CSS source maps?
    requireModuleExtension: true, // 是否仅对文件名包含module的css相关文件使用 CSS Modules
    loaderOptions: {
      // 使用scss-loader，设置全局scss变量
      scss: {
        prependData: '@import "@/styles/index.scss";'
      }

      // css: {
      //   modules: {
      //     localIdentName: '[local]_[hash:base64:8]' // 设定 CSS Modules 命名规则
      //   }
      // }
    } // css预设器配置项 详见https://cli.vuejs.org/zh/config/#css-loaderoptions
  },
  parallel: require('os').cpus().length > 1 // 是否为 Babel 或 TypeScript 使用 thread-loader。该选项在系统的 CPU 有多于一个内核时自动启用，仅作用于生产构建。
}
