module.exports = {
  root: true,
  env: { browser: true, es2020: true },
  extends: [
    'eslint:recommended',
    'plugin:react/recommended',
    'plugin:react/jsx-runtime',
    'plugin:react-hooks/recommended',
    'plugin:@react-three/recommended',
  ],
  ignorePatterns: ['dist', '.eslintrc.cjs'],
  parserOptions: { ecmaVersion: 'latest', sourceType: 'module' },
  settings: { react: { version: '18.2' } },
  plugins: ['react-refresh', '@react-three'],
  rules: {
    'react-refresh/only-export-components': [
      'warn',
      { allowConstantExport: true },
    ],
    'react/no-unknown-property': [
      'error',
      {
        ignore: [
          'attach',
          'args',
          'position',
          'rotation',
          'uniforms',
          'map',
          'toneMapped',
          'dispose',
          'transparent',
          'wireframe',
          'castShadow',
          'receiveShadow',
          'geometry',
          'material',
          'intensity',
        ],
      },
    ],
    'no-unused-vars': 'warn',
  },
};
