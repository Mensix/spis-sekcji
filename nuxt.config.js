export default {
  mode: 'spa',
  head: {
    title: 'Spis Sekcji JBwA i tag-grupek',
    meta: [
      { charset: 'utf-8' },
      {
        name: 'viewport',
        content: 'width=device-width, initial-scale=1, user-scalable=no',
        hid: 'viewport'
      },
      {
        name: 'title',
        content: 'Spis Sekcji JBwA i tag-grupek',
        hid: 'title'
      },
      {
        name: 'theme-color',
        content: '#114d47',
        hid: 'theme-color'
      },
      {
        name: 'description',
        content:
          'Na bieżąco aktualizowany największy spis sekcji JBwA i tag-grupek pod postacią eleganckiej strony internetowej.',
        hid: 'description'
      },
      {
        property: 'og:title',
        content: 'Spis Sekcji JBwA i tag-grupek',
        hid: 'og:title'
      },
      {
        property: 'og:description',
        content:
          'Na bieżąco aktualizowany największy spis sekcji JBwA i tag-grupek pod postacią eleganckiej strony internetowej',
        hid: 'og:description'
      },
      { property: 'og:type', content: 'website', hid: 'og:type' },
      {
        property: 'og:url',
        content: 'https://sekcje.github.io/',
        hid: 'og:url'
      },
      {
        property: 'og:image',
        content: 'https://i.imgur.com/v4efulm.png',
        hid: 'og:image'
      }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
      {
        rel: 'stylesheet',
        type: 'text/css',
        href: 'https://use.fontawesome.com/releases/v5.9.0/css/all.css'
      },
      {
        rel: 'stylesheet',
        type: 'text/css',
        href:
          'https://fonts.googleapis.com/css?family=Roboto:100,300,400,500,700,900|Material+Icons'
      }
    ]
  },
  css: [
    '~/assets/css/tweaks.css',
    'quasar/dist/quasar.min.css',
    'normalize.css/normalize.css'
  ],
  loading: { color: '#fff' },
  plugins: ['~/plugins/quasar'],
  modules: [
    [
      '@nuxtjs/google-analytics',
      {
        id: 'UA-140414002-1',
        debug: {
          enabled: false,
          trace: false,
          sendHitTask: true
        },
        set: [{ field: 'anonymizeIp', value: true }]
      }
    ]
  ],
  buildModules: ['@nuxtjs/gtm'],
  gtm: {
    id: 'GTM-K2QFVPC'
  },
  build: {
    filenames: {
      app: '[name].js',
      chunk: '[name].js',
      css: '[name].css',
      img: '[path][name].[ext]',
      font: '[path][name].[ext]',
      video: '[path][name].[ext]'
    },
    extend(config) {
      config.module.rules.push({
        enforce: 'pre',
        test: /\.(js|vue)$/,
        exclude: /node_modules/,
        loader: 'eslint-loader'
      })
    }
  }
}
