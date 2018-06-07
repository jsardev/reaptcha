const webpack = require('webpack');
const merge = require('webpack-merge');

const common = require('./webpack.common');

module.exports = merge(common, {
  mode: 'development',
  devServer: {
    hot: true,
    contentBase: __dirname,
    publicPath: '/reaptcha/',
    historyApiFallback: {
      index: '/reaptcha/'
    }
  },
  plugins: [
    new webpack.NamedModulesPlugin(),
    new webpack.HotModuleReplacementPlugin()
  ]
});
