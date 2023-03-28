module.exports = {
  productionSourceMap: false,
  lintOnSave: false,
  //api接口跨域代理
  devServer: {
    proxy: {
      '/api': {
        target: 'http://gmall-h5-api.atguigu.cn',
      },
    },
  },
}
