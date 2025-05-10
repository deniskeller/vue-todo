import js from '@eslint/js';
import globals from 'globals';
import tseslint from 'typescript-eslint';
import vueParser from 'vue-eslint-parser';
import pluginVue from 'eslint-plugin-vue';

export default [
  js.configs.recommended,
  // TypeScript поддержка
  ...tseslint.configs.recommended,
  // Vue 3 поддержка
  ...pluginVue.configs['flat/recommended'],
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
    rules: {
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
        'kebab-case',
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
          shouldMatchCase: false
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
      'comma-dangle': [
        'error',
        {
          arrays: 'never',
          objects: 'never',
          imports: 'never',
          exports: 'never',
          functions: 'never'
        }
      ],

      // 'linebreak-style': ['error', 'unix'], // стиль разрыва строки linebreak-style: ["error", "unix || windows"]
      'no-console': 'error', // без console.log
      'no-debugger': 'error', // без debugger
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
      'no-unused-vars': ['error', { argsIgnorePattern: '^_' }], // запрещает неиспользуемые переменные.
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
      ] // требует или запрещает пустую строку между членами класса.
    }
  },

  // Дополнительные правила для TS-файлов
  {
    files: ['**/*.ts'],
    rules: {
      'no-undef': 'off' // TS сам следит за undefined
    }
  }
];
