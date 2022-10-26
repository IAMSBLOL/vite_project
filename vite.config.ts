
import { defineConfig, splitVendorChunkPlugin } from 'vite'
import react from '@vitejs/plugin-react'
import svgr from 'vite-plugin-svgr'
import legacy from '@vitejs/plugin-legacy'


// import dynamicImportVars from '@rollup/plugin-dynamic-import-vars';
// import eslint from '@rollup/plugin-eslint';
// import eslint from 'vite-plugin-eslint'
const path = require('path')

const projectRootDir = path.resolve(__dirname);
// https://vitejs.dev/config/
export default defineConfig((configEnv) => {


  const generateScopedName = "[name]__[hash:base64:5]";
  process.env.mode = configEnv.mode

  const isDev = configEnv.mode === 'development'
  const isPro = process.env.mode === 'production'

  return {

    plugins: [

      
      react({
        fastRefresh: true,
        babel: {
          babelrc: true,
          configFile: true
        },
      }),
      
      isPro && legacy({
        targets: ['defaults', 'not IE 11']
      }),
      // dynamicImportVars({
      //   // options
      // }),
 
      svgr({
        include: '**/*.svg',
        exportAsDefault: false,
      }),

      // 编译器提示就够了其实，没必要写进进程
      // isDev && eslint({
      //   /* your options */

      // }),
      splitVendorChunkPlugin()
    ].filter(Boolean),


    css: {
      modules: {
        generateScopedName: generateScopedName
      },
    },

    build: {
      rollupOptions: {
        
      }
    },

    resolve: {
      alias: {
        '@src': path.resolve(projectRootDir, 'src'),
        '@assets': path.resolve(projectRootDir, 'src/assets'),
        '@view': path.resolve(projectRootDir, 'src/view'),
        '@router': path.resolve(projectRootDir, 'src/router'),
      }
    }
  }
})
