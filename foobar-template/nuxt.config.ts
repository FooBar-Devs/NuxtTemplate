// https://nuxt.com/docs/api/configuration/nuxt-config
import tailwindcss from "@tailwindcss/vite";

export default defineNuxtConfig({
    compatibilityDate: '2025-07-15',
    future: {
        compatibilityVersion: 4,
    },
    ssr: false,

    devtools: { enabled: true },

    css: ['./app/assets/css/main.css'],

    app: {
        baseURL: "/",
        pageTransition: { name: "page", mode: "out-in" },
        layoutTransition: { name: 'layout', mode: 'out-in' },
        head: {
            meta: [
                { charset: "utf-8" },
                { 
                    name: "viewport", 
                    content: "width=device-width, height=device-height, initial-scale=1.0, minimum-scale=1.0, maximum-scale=1.0, user-scalable=no" 
                },
            ],
            link: [
                { rel: "preconnect", href: "https://fonts.googleapis.com" },
                { rel: "preconnect", href: "https://fonts.gstatic.com", crossorigin: "anonymous" },
                { 
                    rel: "stylesheet", 
                    href: "https://fonts.googleapis.com/css2?family=Poppins:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap" 
                },
                { 
                    rel: "stylesheet", 
                    href: "node_modules/modern-normalize/modern-normalize.css" 
                },
            ],
        }
    },

    modules: ['@nuxt/icon', '@pinia/nuxt', 'pinia-plugin-persistedstate', "@vee-validate/nuxt"],
    vite: {
        plugins: [
            tailwindcss(),
        ],
    },
})