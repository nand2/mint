// https://nuxt.com/docs/api/configuration/nuxt-config

export default defineNuxtConfig({
  extends: [
    '@visualizevalue/mint-theme-zinc',
    '@visualizevalue/mint-app-base',
  ],

  future: {
    compatibilityVersion: 4,
  },

  compatibilityDate: '2024-08-14',
})
