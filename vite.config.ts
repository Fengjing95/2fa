/*
 * @Date: 2023-06-18 09:16:21
 * @Author: 枫
 * @LastEditors: 枫
 * @description: description
 * @LastEditTime: 2023-06-21 21:19:34
 */
import { defineConfig } from 'vite'
import { crx } from '@crxjs/vite-plugin'
import react from '@vitejs/plugin-react'
import zipPack from 'vite-plugin-zip-pack';
// @ts-ignore
import manifest from './src/manifest'
//@ts-ignore
import { config } from './src/read_pages_folder'

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  return {
    resolve: {
      alias: {
        '@': '/src',
        '#': '/typings'
      }
    },
    build: {
      emptyOutDir: true,
      outDir: 'build',
      rollupOptions: {
        input: config,
        output: {
          chunkFileNames: 'assets/chunk-[hash].js',
        },
      },
    },
    css: {
      modules: {
        localsConvention: 'camelCaseOnly'
      }
    },
    plugins: [
      crx({ manifest }),
      react(),
      zipPack({
        outDir: `package`,
        inDir: 'build',
        // @ts-ignore
        outFileName: `${manifest.short_name ?? manifest.name.replaceAll(" ", "-")}-extension-v${manifest.version}.zip`,
      }),],
  }
})
