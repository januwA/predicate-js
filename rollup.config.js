import babel from 'rollup-plugin-babel';

export default {
  input: 'src/main.js',
  output: {
    file: 'dist/predicate.js',
    format: 'umd',
    name: 'Predicate'
  },
  pligibs: [
    babel({
      exclude: 'node_modules/**' // 只编译我们的源代码
    })
  ]
};