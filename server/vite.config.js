import { defineConfig } from 'vite';
import laravel from 'laravel-vite-plugin';
import vue from '@vitejs/plugin-vue';
import wasm from "vite-plugin-wasm";

export default defineConfig({
    plugins: [
        laravel({
            input: ['resources/vue/app.js'],
            refresh: true,
        }),
        vue(),
        wasm(),
    ],
    server: {
        host: '0.0.0.0',
        hmr: {
            host: 'localhost',
            protocol: 'ws',
        },
    },
    resolve: {
        alias: {
            '@': '/resources/vue',
        }
    }
});
