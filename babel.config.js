module.exports = {
  presets: ['@babel/preset-env', '@babel/preset-react', '@babel/preset-flow'],
  env: {
    development: {
      plugins: ['react-hot-loader/babel']
    }
  }
};
