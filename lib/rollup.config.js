import babel from 'rollup-plugin-babel';
import flow from 'rollup-plugin-flow';
import { uglify } from 'rollup-plugin-uglify';

export default {
  input: 'index.js',
  output: [
    {
      file: 'dist/index.js',
      format: 'umd',
      name: 'Reaptcha',
      globals: {
        react: 'React'
      }
    }
  ],
  plugins: [
    flow(),
    babel({
      exclude: 'node_modules/**'
    }),
    uglify()
  ],
  external: ['react']
};
