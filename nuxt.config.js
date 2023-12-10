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
    {src: '~/plugins/veevalidate.js', ssr: false},
    {src: '~/plugins/axios.js'},
  ],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    'bootstrap-vue/nuxt',
    '@nuxtjs/axios',
    '@nuxtjs/auth-next',
    "vue-toastification/nuxt",
  ],

  env: {
    BASE_URL: process.env.BASE_URL || 'https://app.bizmahbd.com',
  },

  axios: {
    baseURL: (process.env.BASE_URL || 'https://app.bizmahbd.com') + '/api',
    common: {
      'Accept': 'application/json'
    }
  },

  auth: {
    strategies: {
      local: {
        token: {
          property: 'token',
          global: true,
          // required: true,
          type: 'Bearer',
          //1 month
          maxAge: 60 * 60 * 24 * 30
        },
        user: {
          property: false,
          autoFetch: true,
        },
        endpoints: {
          login: {url: '/auth/login', method: 'post'},
          logout: {url: '/auth/logout', method: 'post'},
          user: {url: '/auth/user', method: 'get'}
        }
      }
    }
  },

  router: {
    base: '/',
    linkActiveClass: '',
    linkExactActiveClass: 'active',
    extendRoutes(routes, resolve) {
      routes.push(
        {
          path: '/category/:category',
          component: resolve(__dirname, 'pages/shop/index.vue'),
        },
        {
          path: '/category/:category/:subCategory',
          component: resolve(__dirname, 'pages/shop/index.vue'),
        },
        {
          path: '/category/:category/:subCategory/:subSubCategory',
          component: resolve(__dirname, 'pages/shop/index.vue'),
        },
        {
          path: '/shop',
          component: resolve(__dirname, 'pages/shop/index.vue'),
        },
        {
          path: '/search/:q',
          component: resolve(__dirname, 'pages/shop/index.vue'),
        },
      )
    }
  },


  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {}
}
