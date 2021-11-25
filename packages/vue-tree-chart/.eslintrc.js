module.exports = {
  root: true,
  env: {
    'node': true
  },
  extends: [
    'plugin:vue/essential',
    '@vue/typescript',
    '@vue/prettier',
  ],
  parserOptions: {
    ecmaVersion: 2020,
  },
  rules: {
    'prettier/prettier': [
      'warn',
      {
        '#': 'prettier config in here :)',
        'singleQuote': true,
        'semi': false,
        'trailingComma': 'none',
        'space-before-function-paren': 'off'
      }
    ]
  }
}
