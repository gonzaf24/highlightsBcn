module.exports = {
  env: {
    browser: true,
    es6: true,
    es2021: true,
  },
  extends: [
    'standard',
    'prettier',
    'plugin:react/recommended',
    'plugin:react-hooks/recommended',
    'airbnb',
  ],
  parserOptions: {
    ecmaFeatures: {
      legacyDecorators: true,
      jsx: true,
    },
    ecmaVersion: 'latest',
    sourceType: 'module',
  },
  plugins: [
    'react',
    'prettier',
    'simple-import-sort',
    'import',
  ],
  globals: {
    beforeEach: 'readonly',
    afterEach: 'readonly',
    describe: 'readonly',
    it: 'readonly',
  },
  rules: {
    // Line
    'max-len': [2, {
      code: 140,
      tabWidth: 4,
      ignoreUrls: true,
      ignoreStrings: true,
      ignoreTemplateLiterals: true,
      ignoreComments: true,
      ignoreRegExpLiterals: true,
    }],
    'eol-last': [2, 'always'],

    // JavaScript
    'no-underscore-dangle': 0,
    'no-unused-vars': [2, { argsIgnorePattern: '^_' }],
    'no-console': 0,
    'arrow-parens': [2, 'as-needed'],
    'global-require': 0,
    'object-curly-newline': [2, {
      multiline: true,
      minProperties: 5,
      consistent: true,
    }],

    // React
    'react/jsx-curly-spacing': [2, 'always'],
    'react/sort-prop-types': [2, {
      callbacksLast: true,
      ignoreCase: true,
      requiredFirst: true,
      sortShapeProp: true,
      noSortAlphabetically: false,
    }],
    'react/jsx-sort-props': [2, {
      callbacksLast: true,
      ignoreCase: true,
      noSortAlphabetically: false,
      shorthandFirst: false,
      shorthandLast: false,
      reservedFirst: true,
    }],
    'react/boolean-prop-naming': [2, {
      rule: '^(is|has|use|show|hide|force)[A-Z]([A-Za-z0-9]?)+',
      validateNested: true,
    }],
    'react/forbid-dom-props': [2, { forbid: ['style'] }],
    'react/function-component-definition': [2, {
      namedComponents: 'arrow-function',
      unnamedComponents: 'arrow-function',
    }],
    'react/forbid-foreign-prop-types': 1,

    // Imports
    'import/no-cycle': 0,
    'import/first': 2,
    'import/newline-after-import': 2,
    'import/no-duplicates': 2,
    'import/extensions': 2,
    'import/prefer-default-export': 0,
    'import/no-named-as-default-member': 1,
    'simple-import-sort/imports': [
      2, // Display error when an import is not sorted properly
      {
        groups: [
          [
            '^react', // `react` related packages come first.
            '^next', // `react` related packages come second.
            '^mantine', // `react` related packages come third.
            '^@?\\w', // Rest of packages. Things that start with a letter (or digit or underscore), or `@` followed by a letter.
          ],
          [
            '^', // Absolute imports. Anything not matched in another group.
            '^(app|assets|base|services|modules|utils|tests|styles)', // Internal packages, absolute path aliases.
          ],
          ['^\\.\\.(?!/?$)', '^\\.\\./?$'], // Parent imports.
          ['^\\./(?=.*/)(?!/?$)', '^\\.(?!/?$)', '^\\./?$'], // Other relative imports. Put same-folder imports and `.` last.
          ['^.+\\.s?css$'], // Style imports.
        ],
      },
    ],
    'simple-import-sort/exports': 2, // Display error when an export is not sorted properly
  },
  settings: {
    react: {
      version: 'detect',
    },
    'import/resolver': {
      alias: {
        map: [
          ['app', './src/app'],
          ['assets', './src/assets'],
          ['base', './src/base'],
          ['modules', './src/modules'],
          ['utils', './src/utils'],
          ['tests', './src/tests'],
          ['styles', './src/styles'],
        ],
        extensions: ['.js', '.jsx', '.json', '.css', '.scss'],
      },
    },
    'mdx/code-blocks': true,
  },
};
