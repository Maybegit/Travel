const autoprefixer = require('autoprefixer');
const pxtorem = require('postcss-pxtorem');
const path = require('path')
const name = 'Travel'
function resolve (dir) {
  return path.join(__dirname, dir)
}
module.exports = {
  chainWebpack:config=>{
    config.plugins.delete('prefetch')
  },
  css: {
    loaderOptions: {
      postcss: {
        plugins: [
          autoprefixer({
            browsers: ['Android >= 4.0', 'iOS >= 7']
          }),
          pxtorem({
            rootValue: 37.5,
            propList: ['*'],
          })
        ]
      }
    }
  },
  configureWebpack: {
    // provide the app's title in webpack's name field, so that
    // it can be accessed in index.html to inject the correct title.
    name: name,
    resolve: {
      alias: {
        '@': resolve('src'), // 主目录
        'views': resolve('src/views'), // 页面
        'components': resolve('src/components'), // 组件
        'api': resolve('src/assets/api'), // 接口
        'utils': resolve('src/assets/utils'), // 通用功能
        'assets': resolve('src/assets'), // 静态资源
        'style': resolve('src/style') // 通用样式
      }
    }
  }
};