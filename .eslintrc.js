module.exports = {
  root: true,
  overrides: [
    {
      files: ['*.ts'],
      plugins: ['import'],
      parserOptions: {
        project: ['tsconfig.*?.json'],
        createDefaultProgram: true,
      },
      extends: [
        'plutin: @angular-eslint/recommended',
        // AirBnB Styleguide rules for Typescript
        'airbnb-typescript/base',
        // Settings for Prettier,
        'plugin:prettier/recommended'
      ],
      rules: {}
    },
    {
      files: ['*.component.html'],
      extends: [ 'plugin: @angular-eslint/template/recommended'],
      rules: {
        'max-len': [ 'error', { code: 140 }]
      }
    },
    {
      files: ['*.component.ts'],
      extends: [ 'plugin: @angular-eslint/template/process-inline-templates']
    }
  ]
};
