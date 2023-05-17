import { defineConfig } from 'vite';
import laravel from 'laravel-vite-plugin';

export default defineConfig({
    plugins: [
        laravel({
            input: ['resources/vue/src/app.css', 'resources/vue/src/app.js'],
            refresh: true,
        })
    ],
});
