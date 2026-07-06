// For more info, see https://github.com/storybookjs/eslint-plugin-storybook#configuration-flat-config-format
import storybook from 'eslint-plugin-storybook'
import { FlatCompat } from '@eslint/eslintrc'

import { defineConfig, globalIgnores } from 'eslint/config'

const compat = new FlatCompat({
  baseDirectory: import.meta.dirname,
})

const eslintConfig = defineConfig([
  ...compat.extends('next/core-web-vitals', 'next/typescript'),
  // Override default ignores of eslint-config-next.
  globalIgnores([
    // Default ignores of eslint-config-next:
    '.next/**',
    'out/**',
    'build/**',
    'next-env.d.ts',
  ]),
  ...storybook.configs['flat/recommended']
])

export default eslintConfig
