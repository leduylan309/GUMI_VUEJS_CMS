module.exports = {
  devServer: {
    proxy: 'http://127.0.0.1:8000'
  },
  assetsDir: 'assets/',
  chainWebpack: config => {
    config.module.rule('fonts').test(/\.(ttf|otf|eot|woff|woff2)$/).use('file-loader').loader('file-loader').tap(
      options => {
        options = {
          // limit: 10000,
          name: '/assets/fonts/[name].[ext]'
        }
        return options
      }).end()

    config.module.rule('images').use('url-loader').tap(
      options => Object.assign(options, {
        limit: 10240,
        name: '/assets/images'
      })).end()
  }
}
