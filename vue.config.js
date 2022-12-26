module.exports = {
  lintOnSave: false,
  //api接口跨域代理
  devServer: {
    proxy: {
      '/api': {
        target: 'http://gmall-h5-api.atguigu.cn',
        pathRewrite: {
          //'^/api': '',
        },
      },
    },
  },
}
