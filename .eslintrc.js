module.exports = {
  'env': {
    'node': true,
    'commonjs': true,
    'es6': true,
    'jasmine': true,
    'jest': true,
  },
  'extends': 'google',
  'rules': {
    'indent': [
      'error',
      2,
      {
        'SwitchCase': 1,
      },
    ],
  },
};
