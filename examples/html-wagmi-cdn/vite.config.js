import { defineConfig } from 'vite'

export default defineConfig({
  server: {
    open: true,
    port: 3000
  },
  optimizeDeps: {
    exclude: ['@safubit/appkit-cdn']
  },
  build: {
    commonjsOptions: {
      include: []
    }
  }
})
