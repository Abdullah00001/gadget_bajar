// eslint.config.js
import eslint from '@eslint/js';
import tseslint from 'typescript-eslint';
import importPlugin from 'eslint-plugin-import';
import unusedImportsPlugin from 'eslint-plugin-unused-imports';
import prettierConfig from 'eslint-config-prettier';

export default [
  // 1. Core ESLint and TypeScript Recommended Rules
  eslint.configs.recommended,
  ...tseslint.configs.recommended,

  // 2. Configuration for all .ts files
  {
    files: ['**/*.ts'],
    // 3. Language options (replaces parser, parserOptions, and env)
    languageOptions: {
      ecmaVersion: 2021, // Corresponds to your old ecmaVersion
      sourceType: 'module',
      globals: {
        node: true,
        es2021: true,
      },
      parserOptions: {
        project: './tsconfig.json',
        tsconfigRootDir: import.meta.dirname,
      },
      parser: tseslint.parser,
    },

    // 4. Plugins (must explicitly import and register)
    plugins: {
      import: importPlugin,
      'unused-imports': unusedImportsPlugin,
    },

    // 5. Custom Rules (replaces your old 'rules' block)
    rules: {
      // TypeScript rules (keep off for 'any' and 'ts-comment' as per your original file)
      '@typescript-eslint/no-unused-vars': [
        'warn',
        { argsIgnorePattern: '^_', varsIgnorePattern: '^_' },
      ],
      '@typescript-eslint/explicit-function-return-type': 'off',
      '@typescript-eslint/no-explicit-any': 'off',
      '@typescript-eslint/ban-ts-comment': 'off',

      // Import rules
      'import/order': [
        'warn',
        {
          groups: [
            'builtin',
            'external',
            'internal',
            'parent',
            'sibling',
            'index',
          ],
          alphabetize: { order: 'asc', caseInsensitive: true },
          'newlines-between': 'always',
        },
      ],
      // This is now automatically handled better, keep off if using aliases
      'import/no-unresolved': 'off',

      // Unused imports plugin
      'unused-imports/no-unused-imports': 'warn',
      'unused-imports/no-unused-vars': [
        'warn',
        {
          vars: 'all',
          varsIgnorePattern: '^_',
          args: 'after-used',
          argsIgnorePattern: '^_',
        },
      ],

      // General rules
      'no-console': 'off',
      'no-debugger': 'warn',
      'no-useless-escape': 'off',
    },
  },

  // 6. Prettier (MUST be the last item to override all style-conflicting rules)
  prettierConfig,

  // 7. Ignoring files (replaces .eslintignore and your old 'ignorePatterns')
  {
    ignores: ['dist/', 'node_modules/'],
  },
];
