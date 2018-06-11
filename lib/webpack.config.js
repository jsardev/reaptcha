const path = require('path');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');

module.exports = {
  mode: 'production',
  entry: {
    index: './index.js',
    'index.min': './index.js'
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name].js',
    library: 'Reaptcha',
    libraryTarget: 'umd'
  },
  externals: {
    react: 'React',
    'react-dom': 'ReactDOM'
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: 'babel-loader'
      }
    ]
  },
  optimization: {
    minimizer: [
      new UglifyJsPlugin({
        test: /\*\.min\.js$/
      })
    ]
  }
};
