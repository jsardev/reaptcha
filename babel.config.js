module.exports = {
  presets: ['@babel/preset-env', '@babel/preset-react'],
  env: {
    development: {
      plugins: ['react-hot-loader/babel']
    }
  }
};
