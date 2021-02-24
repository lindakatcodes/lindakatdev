export default {
  /*
   ** Nuxt rendering mode
   ** See https://nuxtjs.org/api/configuration-mode
   */
  /*
   ** Nuxt target
   ** See https://nuxtjs.org/api/configuration-target
   */
  target: 'static',
  /*
   ** Headers of the page
   ** See https://nuxtjs.org/api/configuration-head
   */
  head: {
    title: 'LindaKat Devs',
    htmlAttrs: {
      lang: 'en',
    },
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      {
        hid: 'og:description',
        name: 'og:description',
        property: 'og:description',
        content: 'The online home of all projects and tech writings from Linda Thompson',
      },
      { hid: 'og:title', name: 'og:title', property: 'og:title', content: 'LindaKat Devs' },
      { hid: 'og:type', name: 'og:type', property: 'og:type', content: 'website' },
      { hid: 'og:url', name: 'og:url', property: 'og:url', content: 'https://www.lindakat.com' },
      {
        hid: 'twitter:card',
        name: 'twitter:card',
        property: 'twitter:card',
        content: 'summary_large_image',
      },
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.png' },
      { rel: 'stylesheet', href: 'https://fonts.googleapis.com/css2?family=Fira+Sans&family=Overlock:wght@400;700;900&display=swap' },
      { rel: 'stylesheet', href: 'https://fonts.googleapis.com/icon?family=Material+Icons' },
      { rel: 'webmention', href: 'https://webmention.io/www.lindakat.com/webmention' },
      { rel: 'pingback', href: 'https://webmention.io/www.lindakat.com/xmlrpc' },
    ],
  },
  /*
   ** Global CSS
   */
  css: ['@/assets/css/styles.css'],
  /*
   ** Plugins to load before mounting the App
   ** https://nuxtjs.org/guide/plugins
   */
  plugins: ['@/plugins/vue-tippy.js'],
  /*
   ** Auto import components
   ** See https://nuxtjs.org/api/configuration-components
   */
  components: true,
  /*
   ** Nuxt.js dev-modules
   */
  buildModules: [
    // Doc: https://github.com/nuxt-community/eslint-module
    '@nuxtjs/eslint-module',
  ],
  /*
   ** Nuxt.js modules
   */
  modules: [
    // Doc: https://github.com/nuxt/content
    '@nuxt/content',
    '@nuxtjs/feed',
    'vue-scrollto/nuxt',
    '@nuxtjs/markdownit',
    '@nuxtjs/sentry',
  ],
  // router: {
  //   routeNameSplitter: '/',
  // },
  feed: [
    {
      path: '/feed.xml',
      async create(feed) {
        feed.options = {
          title: 'LindaKat Blogs',
          description: 'Tech Writings from Linda Thompson',
          link: 'https://www.lindakat.com/feed.xml',
        };

        // eslint-disable-next-line global-require
        const { $content } = require('@nuxt/content');

        const posts = await $content('posts/blog', { deep: true })
          .where({ type: { $eq: 'live' } })
          .fetch();

        posts.forEach((post) => {
          const url = `https://www.lindakat.com/${post.dir}/${post.slug}`;
          feed.addItem({
            title: post.title,
            id: url,
            link: url,
            date: new Date(post.createdAt),
            description: post.blurb,
            content: post.bodyText,
          });
        });
      },
      cacheTime: 1000 * 60 * 15,
      type: 'rss2',
    },
  ],
  hooks: {
    'content:file:beforeInsert': (document) => {
      // eslint-disable-next-line
      const md = require('markdown-it')();
      if (document.extension === '.md') {
        // eslint-disable-next-line global-require
        const { text } = require('reading-time')(document.text);
        document.readingTime = text;
        const mdToHtml = md.render(document.text);
        document.bodyText = mdToHtml;
      }
    },
  },
  /*
   ** Content module configuration
   ** See https://content.nuxtjs.org/configuration
   */
  content: {
    liveEdit: false,
    markdown: {
      prism: {
        theme: '@/assets/css/prism-theme.css',
      },
    },
  },
  markdownit: {
    preset: 'default',
    linkify: true,
    breaks: true,
    use: ['markdown-it-div', 'markdown-it-attrs'],
  },
  sentry: {
    dsn: 'https://d74a3529f84f48a8a4239f0368c5c7b2@o530948.ingest.sentry.io/5650998', 
    config: {
      integrations: [new Integrations.BrowserTracing()],
      tracesSampleRate: 1.0,
    },
  }
  /*
   ** Build configuration
   ** See https://nuxtjs.org/api/configuration-build/
   */
  build: {},
  generate: {
    fallback: true,
    devtools: true,
  },
};
