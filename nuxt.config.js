export default {
  mode: 'spa',
  head: {
    title: 'Spis Sekcji JBwA',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      {
        name: 'description',
        content:
          'Na bieżąco aktualizowany największy spis sekcji JBwA i tag-grupek pod postacią eleganckiej strony internetowej'
      },
      { name: 'og:title', content: 'Spis Sekcji i tag-grupek JBwA' },
      {
        name: 'og:description',
        content:
          'Na bieżąco aktualizowany największy spis sekcji JBwA i tag-grupek pod postacią eleganckiej strony internetowej'
      },
      { name: 'og:type', content: 'website' },
      { name: 'og:url', content: 'https://sekcje.github.io/' },
      { name: 'og:image', content: 'https://i.imgur.com/v4efulm.png' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
      {
        rel: 'stylesheet',
        href:
          'https://cdn.jsdelivr.net/npm/normalize.css@8.0.1/normalize.min.css'
      },
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
      },
      {
        rel: 'stylesheet',
        href: 'https://cdn.jsdelivr.net/npm/animate.css@3.7.1/animate.min.css'
      },
      {
        rel: 'stylesheet',
        type: 'text/css',
        href: 'https://cdn.jsdelivr.net/npm/quasar@1.0.5/dist/quasar.min.css'
      }
    ],
    body: {
      script: [
        {
          src:
            'https://cdn.jsdelivr.net/npm/quasar@1.0.5/dist/quasar.umd.min.js'
        }
      ]
    }
  },
  loading: { color: '#fff' },
  plugins: ['~/plugins/quasar', '~/plugins/quantcast'],
  modules: [],
  build: {
    filenames: {
      app: '[name].js',
      chunk: '[name].js',
      css: '[name].css',
      img: '[path][name].[ext]',
      font: '[path][name].[ext]',
      video: '[path][name].[ext]'
    }
  }
}
