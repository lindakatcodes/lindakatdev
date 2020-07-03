module.exports = {
  root: true,
  env: {
    browser: true,
    node: true,
  },
  parserOptions: {
    parser: 'babel-eslint',
    ecmaVersion: 2020,
    ecmaFeatures: {
      impliedStrict: true,
      classes: true,
      sourceType: 'module',
    },
  },
  extends: ['@nuxtjs', 'airbnb-base', 'plugin:nuxt/recommended', 'plugin:vue/recommended', 'prettier', 'prettier/vue'],
  plugins: ['vue', 'prettier'],
  // add your custom rules here
  rules: {
    'no-debugger': 0,
    'no-alert': 0,
    'no-await-in-loop': 0,
    'prefer-destructuring': 0,
    'no-return-assign': ['error', 'except-parens'],
    'no-restricted-syntax': [2, 'ForInStatement', 'LabeledStatement', 'WithStatement'],
    'no-unused-vars': [
      1,
      {
        vars: 'local',
        argsIgnorePattern: 'res|next|^err',
      },
    ],
    'prefer-const': [
      'error',
      {
        destructuring: 'all',
      },
    ],
    'arrow-body-style': [2, 'as-needed'],
    'no-unused-expressions': [
      2,
      {
        allowTaggedTemplates: true,
      },
    ],
    'no-param-reassign': [
      2,
      {
        props: false,
      },
    ],
    'no-console': 0,
    'no-plusplus': 0,
    // import: 0,
    // 'import/prefer-default-export': 0,
    // 'import/extensions': 0,
    'func-names': 0,
    'space-before-function-paren': 0,
    'comma-dangle': 0,
    'max-len': 0,
    'no-underscore-dangle': 0,
    'consistent-return': 0,
    radix: 0,
    'no-shadow': [
      2,
      {
        hoist: 'all',
        allow: ['resolve', 'reject', 'done', 'next', 'err', 'error'],
      },
    ],
    quotes: [
      2,
      'single',
      {
        avoidEscape: true,
        allowTemplateLiterals: true,
      },
    ],
    'no-tabs': [
      'error',
      {
        allowIndentationTabs: true,
      },
    ],
    'vue/html-closing-bracket-newline': [
      'error',
      {
        multiline: 'never',
      },
    ],
    'vue/html-closing-bracket-spacing': [
      'error',
      {
        startTag: 'never',
        endTag: 'never',
        selfClosingTag: 'always',
      },
    ],
    'vue/max-attributes-per-line': [
      'error',
      {
        singleline: 5,
      },
    ],
    'vue/no-parsing-error': [
      'error',
      {
        'duplicate-attribute': true,
      },
    ],
    'vue/require-default-prop': 'off',
    'prettier/prettier': [
      'error',
      {
        trailingComma: 'es5',
        singleQuote: true,
        printWidth: 150,
        endOfLine: 'auto',
        vueIndentScriptAndStyle: true,
      },
    ],
  },
};
