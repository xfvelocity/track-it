module.exports = {
  root: true,
  env: {
    browser: true,
    es2021: true,
    node: true,
  },
  extends: [
    'plugin:vue/vue3-recommended',
    'eslint:recommended',
    '@vue/typescript/recommended',
    // Add under other rules
    '@vue/prettier',

    '@vue/prettier/@typescript-eslint',
  ],
  parserOptions: {
    ecmaVersion: 2021,
  },
  plugins: [],
  rules: {
    'vue/no-deprecated-slot-attribute': 'off',
    'vue/html-self-closing': [
      'error',
      {
        html: { normal: 'always', void: 'always' },
      },
    ],
    'vue/attribute-hyphenation': ['error', 'always'],
    'vue/component-name-in-template-casing': ['error', 'kebab-case'],
    'vue/require-explicit-emits': ['error'],
    '@typescript-eslint/no-explicit-any': 'off',
    camelcase: 'off',
    '@typescript-eslint/camelcase': 'off',
    '@typescript-eslint/no-var-requires': 'off',
    '@typescript-eslint/explicit-function-return-type': ['off'],
  },
}
