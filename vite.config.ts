import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import svgr from 'vite-plugin-svgr'
const path = require('path')


const projectRootDir = path.resolve(__dirname);
// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react({
      fastRefresh: true,
      // jsxRuntime: 'automatic',
    }),
    svgr({
      include: '**/*.svg',
      exportAsDefault: false,
    })
  ],
  build:{
    rollupOptions:{

    }
  },
  css:{

  },
  resolve:{
   alias:{
      'src': path.resolve(projectRootDir, 'src')
   }
  }
})
