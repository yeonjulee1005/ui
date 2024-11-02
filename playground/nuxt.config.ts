// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  modules: ['../src/module'],

  ui: {
    prefix: 'DD'
  },
  future: {
    compatibilityVersion: 4
  },

  compatibilityDate: '2024-07-09'
})
