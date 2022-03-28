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
  configureWebpack: {
    devtool: 'source-map'
  }
}
