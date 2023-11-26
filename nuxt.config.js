export default {
  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    title: 'bizmah-client',
    htmlAttrs: {
      lang: 'en'
    },
    meta: [
      {charset: 'utf-8'},
      {name: 'viewport', content: 'width=device-width, initial-scale=1'},
      {hid: 'description', name: 'description', content: ''},
      {name: 'format-detection', content: 'telephone=no'}
    ],
    link: [
      {rel: 'icon', type: 'image/x-icon', href: '/favicon.ico'},
      {
        rel: "stylesheet",
        href: 'https://fonts.googleapis.com/css2?family=Assistant:wght@300;400&display=swap'
      }
    ]
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: [
    '~/static/assets/scss/main.scss',
    '~/static/fontawesome/css/all.min.css',
    'swiper/css/swiper.css',
  ],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [
    {src: '~/plugins/index.js', ssr: false},
    {src: '~/plugins/filters.js', ssr: true},
  ],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    'bootstrap-vue/nuxt',
    '@nuxtjs/axios'
  ],

  env: {
    BASE_URL: process.env.BASE_URL,
  },

  axios: {
    baseURL: process.env.BASE_URL + '/api',
    common: {
      'Accept': 'application/json'
    }
  },

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {}
}
