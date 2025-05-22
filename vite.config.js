import { defineConfig } from "vite";
import laravel from "laravel-vite-plugin";
import react from "@vitejs/plugin-react";
// import vue from '@vitejs/plugin-vue';

export default defineConfig({
    plugins: [
        laravel({ input: ["resources/pos/src/index.jsx"], refresh: true }),

        react(),
        // vue({
        //     template: {
        //         transformAssetUrls: {
        //             base: null,
        //             includeAbsolute: false,
        //         },
        //     },
        // }),
    ],
    resolve: {
        alias: {
            "@": "/resources/js",
        },
    },
});
