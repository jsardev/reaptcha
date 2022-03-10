const webpack = require('webpack');
const { merge } = require('webpack-merge');

const common = require('./webpack.common');

module.exports = merge(common, {
  mode: 'development',
  devServer: {
    hot: true,
    static: {
      directory: __dirname,
      publicPath: common.output.publicPath
    },
    historyApiFallback: {
      index: common.output.publicPath
    }
  },
  optimization: {
    moduleIds: 'named'
  },
  plugins: [new webpack.HotModuleReplacementPlugin()]
});
