import { defineConfig } from "vite"
import vue from "@vitejs/plugin-vue"
import path from 'path'

/**
 * Vite 配置文件
 * 配置项目的构建和开发服务器选项
 */

export default defineConfig({
    plugins: [vue()],
    resolve: {
        alias: {
            '@': path.resolve(__dirname, './src')
        }
    },
    server: {
        host: '0.0.0.0',
        port: 3000,
        proxy: {
            '/api': {
                target: 'http://localhost:8000',
                changeOrigin: true,
                rewrite: (path) => path.replace(/^\/api/, '')
            }
        }
    },
    preview: {
        host: '0.0.0.0',
        port: 3000
    }
})