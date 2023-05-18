import { defineConfig } from 'vite';
import laravel from 'laravel-vite-plugin';
import vue from '@vitejs/plugin-vue';

export default defineConfig({
    plugins: [
        laravel({
            input: ['resources/vue/app.js'],
            refresh: true,
        }),
        vue(),
    ],
    server: {
        host: '0.0.0.0',
        hmr: {
            host: process.env.APP_DOMAIN,
        },
        https: {
            cert: './storage/app/ssl/cert.crt',
            key: './storage/app/ssl/cert.key',
        }
    },
    resolve: {
        alias: {
            '@': '/resources/vue',
        }
    }
});
