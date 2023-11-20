const path = require('path')
const resolve = dir => {
  return path.join(__dirname, dir)
}
module.exports = {
  lintOnSave: false,
  publicPath: './',
  chainWebpack: config => {
    config.resolve.alias
      .set('_c', resolve('src/components')) // key,value自行定义，比如.set('@@', resolve('src/components'))
  },
  devServer: {
    host: '0.0.0.0',
    port: 8088,
    proxy: {
      '/xxx': {
        target: 'http://192.168.1.1:8088/', // xxx环境
        changeOrigin: true,
        pathRewrite: {
          '^/xxx': '/xxx'
        }
      },
    }
  },
}
