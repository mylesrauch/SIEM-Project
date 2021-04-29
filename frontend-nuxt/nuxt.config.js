// import Vue from 'vue';
// import axios from 'axios';
// Vue.prototype.$http = axios;


// import the API from localhost
const API = 'http://localhost:3000/';

export default {
  
  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    title: 'frontend-nuxt',
    htmlAttrs: {
      lang: 'en'
    },
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
    ]
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: [
  ],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [
    '@plugins/vuetify'
  ],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
  ],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    // https://go.nuxtjs.dev/axios
    '@nuxtjs/axios',
    '@nuxtjs/proxy'
  ],

  // Axios module configuration: https://go.nuxtjs.dev/config-axios
  axios: {
    proxy: true
  },
  proxy: {
    "/api/": {
      target: `${API}/`,
      pathRewrite: { "^/api/": "" }
    },
    "/api/all-logs": {
      target: `${API}/all-logs`,
      pathRewrite: { "^/api/all-logs": "" }
    },
    "/api/test": {
      target: `${API}/test`,
      pathRewrite: { "^/api/test": "" }
    },
  },

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {
  },
  server: {
    host: "0.0.0.0", // default: localhost
    port: 8000 // default: 3000
  }
}
