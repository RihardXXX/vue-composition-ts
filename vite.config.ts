import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [vue()],
    css: {
        preprocessorOptions: {
            scss: {
                // example : additionalData: `@import "./src/design/styles/variables";`
                // dont need include file extend .scss
                // чтобы работали в компонентах переменные scss
                additionalData: `@import "./src/variables";`,
            },
        },
    },
});

// export default {
//     css: {
//         preprocessorOptions: {
//             scss: {
//                 // example : additionalData: `@import "./src/design/styles/variables";`
//                 // dont need include file extend .scss
//                 additionalData: `@import "./src/variables";`
//             },
//         },
//     },
// };
