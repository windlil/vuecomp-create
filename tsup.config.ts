import { defineConfig } from 'tsup'

export default defineConfig({
  entry: [
    'src/index.ts',
  ],
  format: ['cjs'],
  splitting: true,
  clean: true,
  shims: false,
})