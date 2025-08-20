import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  esbuild: {
    loader: 'jsx',
    include: /src\/.*\.[jt]sx?$/, // 处理 js / jsx / ts / tsx
    exclude: [],
  },
  resolve: {
    extensions: ['.js', '.jsx'], // 让 import 不用写后缀
  },
})
