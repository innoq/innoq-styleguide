import js from '@eslint/js'
import globals from 'globals'
import prettier from 'eslint-config-prettier'

export default [
  {
    ignores: ['dist/', 'public/', 'components/index.js'],
  },
  {
    files: ['**/*.js'],
    ...js.recommended,
    languageOptions: {
      ecmaVersion: 2020,
      sourceType: 'module',
      globals: {
        ...globals.browser,
      },
    },
  },
  {
    files: ['*.config.js', 'scripts/**/*.js'],
    languageOptions: {
      sourceType: 'commonjs',
      globals: {
        ...globals.node,
      },
    },
  },
  prettier,
]
