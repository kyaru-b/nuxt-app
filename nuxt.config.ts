// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({

  modules: [
    '@nuxt/eslint',
    '@nuxt/ui'
  ],

  devtools: {
    enabled: true
  },

  css: ['~/assets/css/main.css'],
  spaLoadingTemplate: false,

  routeRules: {
    '/': { prerender: true }
  },
  devServer: {
    port: 3000,
    host: '0.0.0.0'
  },

  runtimeConfig: {
    bitrixWebhookUrl: process.env.BITRIX_WEBHOOK_URL || ''
  },

  compatibilityDate: '2026-06-30',
  eslint: {
    config: {
      stylistic: {
        commaDangle: 'never',
        braceStyle: '1tbs'
      }
    }
  }
})
