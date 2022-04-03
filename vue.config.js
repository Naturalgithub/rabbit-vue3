const path = require('path')
module.exports = {
  pluginOptions: {
    'style-resources-loader': {
      preProcessor: 'less',
      patterns: [
        path.join(__dirname, './src/assets/styles/variables.less'),
        path.join(__dirname, './src/assets/styles/mixins.less')
      ]
    }
  },
  devServer: {
    // 页面不会显示报错提示，看控制台就行了
    overlay: {
      errors: false,
      warnings: false
    }
  },
  // 这个是给webpack-dev-server开启可IP和域名访问权限。
  chainWebpack: (config) => {
    config.devServer.disableHostCheck(true)
  },
  configureWebpack: {
    devtool: 'source-map',
    externals: {
      qc: 'QC'
    }
  }
}
