import js from '@eslint/js';
import globals from 'globals';
import tseslint from 'typescript-eslint';
import vueParser from 'vue-eslint-parser';
import pluginVue from 'eslint-plugin-vue';
// import prettierConfig from 'eslint-config-prettier';
// import prettier from 'eslint-plugin-prettier';

export default [
  js.configs.recommended,
  // TypeScript поддержка
  ...tseslint.configs.recommended,
  // Vue 3 поддержка
  ...pluginVue.configs[
    'flat/recommended'
  ],
  {
    ignores: [
      '**/node_modules/**', // Игнорировать node_modules
      '**/dist/**', // Игнорировать папку сборки (dist)
      '**/*.md', // Игнорировать Markdown-файлы
      '**/*.css', // Игнорировать CSS-файлы
      '**/coverage/**',
      '**/public/**',
      '**/tests/**',
      '**/*.config.js'
      // Дополнительные игнорируемые пути (если нужно)
    ],
    settings: {
      'import/resolver': {
        alias: {
          map: [
            ['@', './src'],
            ['@components', './src/components'],
            ['@base', './src/components/base'],
            ['@views', './src/views'],
            ['@assets', './src/assets'],
            ['@stores', './src/stores'],
            ['@utils', './src/utils']
          ],
          extensions: ['.js', '.jsx', '.vue', '.ts', '.tsx']
        }
      }
    }
  },
  // Общие настройки для всех файлов
  {
    files: ['**/*.{js,ts,vue}'],
    languageOptions: {
      globals: {
        ...globals.browser,
        ...globals.node
      },
      parser: vueParser,
      parserOptions: {
        parser: tseslint.parser,
        ecmaVersion: 'latest',
        sourceType: 'module',
        extraFileExtensions: ['.vue']
      }
    },
    plugins: {
      // prettier
    },
    rules: {
      // 'vue/no-v-html': 'error', // Более строго, чем ваш текущий 'warn'
      // 'vue/no-mutating-props': 'error',
      // 'prettier/prettier': 'error',
      // 'no-undef': 'off',
      // 'prefer-const': 'error',
      // 'no-var': 'error',
      // 'object-shorthand': 'error',
      // Удаление лишних пробелов
      'no-multi-spaces': ['error', { ignoreEOLComments: false }],
      'no-trailing-spaces': 'error',

      // Пустые строки
      'no-multiple-empty-lines': ['error', { max: 1, maxEOF: 0 }],
      'vue/no-undef-components': 'error', // Ошибка, если компонент не зарегистрирован
      // Проверка порядка атрибутов
      'vue/attributes-order': [
        'error',
        {
          order: [
            'DEFINITION',
            'LIST_RENDERING',
            'CONDITIONALS',
            'RENDER_MODIFIERS',
            'GLOBAL',
            ['UNIQUE', 'SLOT'],
            'TWO_WAY_BINDING',
            'OTHER_DIRECTIVES',
            'OTHER_ATTR',
            'EVENTS',
            'CONTENT'
          ],
          alphabetical: false
        }
      ],
      // Проверка на максимальное количество атрибутов в строке
      'vue/max-attributes-per-line': [
        'error',
        {
          singleline: {
            max: 1
          },
          multiline: {
            max: 1
          }
        }
      ],
      // Проверка на самозакрывающийся тег или компонент
      'vue/html-self-closing': [
        'error',
        {
          html: {
            void: 'never',
            normal: 'always',
            component: 'always'
          },
          svg: 'always',
          math: 'always'
        }
      ],
      // Проверка последовательного отступа в шаблоне <template>
      'vue/html-indent': [
        'error',
        2,
        {
          attribute: 1,
          baseIndent: 1,
          closeBracket: 0,
          alignAttributesVertically: true,
          ignores: []
        }
      ],
      // Проверка регистра для стиля именования компонентов в шаблоне
      'vue/component-name-in-template-casing': [
        'error',
        'PascalCase',
        {
          registeredComponentsOnly: true
        }
      ],
      // Проверка нерегулярных пробелов
      'vue/no-irregular-whitespace': [
        'error',
        {
          skipStrings: true,
          skipComments: false,
          skipRegExps: false,
          skipTemplates: false,
          skipHTMLAttributeValues: false,
          skipHTMLTextContents: false
        }
      ],
      // Проверка на определенный регистр для имени компонента
      'vue/component-definition-name-casing': ['error', 'PascalCase'],
      // Проверка имени компонента — оно должно соответствовать имени файла, в котором он находится
      'vue/match-component-file-name': [
        'error',
        {
          extensions: ['vue'],
          shouldMatchCase: true
        }
      ],
      // Запретить дублирование имен полей
      'vue/no-dupe-keys': [
        'error',
        {
          groups: []
        }
      ],
      // Порядок свойств в компонентах
      'vue/order-in-components': [
        'error',
        {
          order: [
            'el',
            'name',
            'key',
            'parent',
            'functional',
            ['delimiters', 'comments'],
            ['components', 'directives', 'filters'],
            'extends',
            'mixins',
            ['provide', 'inject'],
            'ROUTER_GUARDS',
            'layout',
            'middleware',
            'validate',
            'scrollToTop',
            'transition',
            'loading',
            'inheritAttrs',
            'model',
            ['props', 'propsData'],
            'emits',
            'setup',
            'asyncData',
            'data',
            'fetch',
            'head',
            'computed',
            'watch',
            'watchQuery',
            'LIFECYCLE_HOOKS',
            'methods',
            ['template', 'render'],
            'renderError'
          ]
        }
      ],
      // Проверка  запятых
      // 'comma-dangle': [
      //   'error',
      //   {
      //     arrays: 'never',
      //     objects: 'never',
      //     imports: 'never',
      //     exports: 'never',
      //     functions: 'never',
      //   },
      // ],
      // 'linebreak-style': ['error', 'unix'], // стиль разрыва строки linebreak-style: ["error", "unix || windows"]
      'vue/multi-word-component-names': [ // запрет на однословное именование компонентов
        'error',
        {
          ignores: ['index'] // игнорировать компоненты с именем index
        }
      ],
      'no-console': 'warn', // без console.log
      'no-debugger': 'warn', // без debugger
      // 'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off', // без console.log
      // 'no-debugger': process.env.NODE_ENV === 'production' ? 'warn' : 'off', // без debugger
      'arrow-parens': ['error', 'as-needed'], // скобки в стрелочной функции
      'no-plusplus': 'off', //запрещает унарные операторы ++и --
      'constructor-super': 'off', // конструкторы производных классов должны вызывать super(). Конструкторы не производных классов не должны вызывать super().
      'no-mixed-operators': [
        //Заключение сложных выражений в круглые скобки проясняет замысел разработчика
        'error',
        {
          groups: [
            ['+', '-', '*', '/', '%', '**'],
            ['&', '|', '^', '~', '<<', '>>', '>>>'],
            ['==', '!=', '===', '!==', '>', '>=', '<', '<='],
            ['&&', '||'],
            ['in', 'instanceof']
          ],
          allowSamePrecedence: true
        }
      ],
      'import/extensions': 'off', // обеспечить согласованное использование расширения файла в пути импорта
      'import/prefer-default-export': 'off', // ESLint предпочитает экспорт по умолчанию импорт/предпочитает экспорт по умолчанию
      'no-unused-expressions': 'error', //нет неиспользуемых выражений
      'no-param-reassign': 'off', //без переназначения параметров
      'prefer-destructuring': [
        'error',
        {
          // требуется деструктуризация массивов и/или объектов.
          array: true,
          object: true
        },
        {
          enforceForRenamedProperties: false
        }
      ],
      'no-bitwise': ['error', { allow: ['~'] }], // запрещает побитовые операторы.
      'no-unused-vars': ['warn', { argsIgnorePattern: '^_' }], // запрещает неиспользуемые переменные.
      // 'max-len': ['error', { code: 120 }], // обеспечивает максимальную длину строки.
      'object-curly-newline': [
        'error',
        {
          ObjectExpression: { multiline: true, consistent: true },
          ObjectPattern: { multiline: true, consistent: true }
        }
      ], // применяет согласованные разрывы строк после открытия и перед закрытием фигурных скобок.
      'lines-between-class-members': [
        'error',
        'always',
        { exceptAfterSingleLine: true }
      ], // требует или запрещает пустую строку между членами класса.
      'vue/no-unused-components': 'error', // Правило для подсветки неиспользуемых компонентов
      'vue/require-component-is': 'error',
      'vue/no-v-html': 'warn', // Для безопасности рекомендуется ограничить использование v-html
      'vue/require-default-prop': 'off',
      'vue/no-mutating-props': 'error',
      // 'vue/component-tags-order': ['error', {
      //   order: ['script', 'template', 'style']
      // }],
      'vue/padding-line-between-blocks': ['error', 'always'],
      // Для Vue файлов
      'vue/html-closing-bracket-newline': ['error', {
        singleline: 'never',
        multiline: 'always'
      }],
      "semi": ["error", "always"], // расставляет точку с запятой
      'vue/script-indent': ['error', 2, { baseIndent: 1 }], // форматирует код в теге script
    }
  },

  // Дополнительные правила для TS-файлов
  {
    files: ['**/*.ts'],
    rules: {
      'no-undef': 'off', // TS сам следит за undefined
      '@typescript-eslint/no-explicit-any': 'warn',
      '@typescript-eslint/no-unused-vars': ['warn', { argsIgnorePattern: '^_' }],
      '@typescript-eslint/explicit-function-return-type': 'error',
      '@typescript-eslint/no-non-null-assertion': 'error',
      '@typescript-eslint/consistent-type-imports': 'error',
      "@typescript-eslint/ban-ts-comment": "off"
    }
  },
  // {
  //   files: ['**/*.vue'],
  //   rules: {
  //     // 'no-undef': 'off',
  //     'vue/no-ref-as-operand': 'error',
  //     'vue/no-setup-props-destructure': 'error',
  //     'vue/script-setup-uses-vars': 'error',
  //     'vue/padding-line-between-blocks': ['error', 'always']
  //   }
  // }
  // prettier
];
