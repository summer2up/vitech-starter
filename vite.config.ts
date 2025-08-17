import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'

// import VueMacros from 'unplugin-vue-macros'

import { VueRouterAutoImports } from 'unplugin-vue-router'

import VueRouter from 'unplugin-vue-router/vite'
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import Layouts from 'vite-plugin-vue-layouts'
import UnoCSS from 'unocss/vite'

import { VitePWA } from 'vite-plugin-pwa'
import postcssViewportPlugin from 'postcss-px-to-viewport-8-plugin'
import { viteMockServe } from 'vite-plugin-mock'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    VueRouter(),
    vue(),
    vueJsx(),
    // Vue3.3以后，不需要这些新的特性了
    // VueMacros.vite({
    //   plugins: {
    //     vue: vue(),
    //     vueJsx: vueJsx() // 如果需要
    //   }
    // }),
    UnoCSS(),
    AutoImport({
      include: [
        /\.[tj]sx?$/, // .ts, .tsx, .js, .jsx
        /\.vue$/,
        /\.vue\?vue/, // .vue
        /\.md$/ // .md
      ],

      // global imports to register
      imports: [
        // presets
        'vue',
        // 'vue-router'
        VueRouterAutoImports,
        '@vueuse/core',
        'pinia'
      ]
    }),
    Components({
      directoryAsNamespace: true,
      collapseSamePrefixes: true
    }),
    Layouts({
      layoutsDirs: 'src/layouts',
      defaultLayout: 'default'
    }),
    VitePWA({
      manifest: {
        name: 'Vite App',
        short_name: 'Vite App',
        theme_color: '#ffffff',
        icons: [
          {
            src: '/192x192.png',
            sizes: '192x192',
            type: 'image/png'
          },
          {
            src: '/512x512.png',
            sizes: '512x512',
            type: 'image/png'
          }
        ]
      },
      registerType: 'autoUpdate'
    }),
    viteMockServe({
      mockPath: 'mock',
      enable: false
    })
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  },
  css: {
    postcss: {
      plugins: [postcssViewportPlugin({
        unitToConvert: 'px',
        viewportWidth: 750,
        unitPrecision: 5,
        viewportUnit: 'vw',
        propList: ['*', '!font-size'],
        selectorBlackList: [],
        fontViewportUnit: 'vw',
        minPixelValue: 1,
        mediaQuery: false,
        replace: true,
        exclude: /node_modules/,
        include: /\/src\//,
        landscape: false,
        landscapeUnit: 'vw',
        landscapeWidth: 1125
      })]
    }
  }
})
