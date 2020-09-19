export default {
  /*
   ** Nuxt rendering mode
   ** See https://nuxtjs.org/api/configuration-mode
   */
  ssr: false,
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
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      {
        hid: 'description',
        name: 'description',
        content: 'The online home of all projects and tech writings from Linda Thompson',
      },
      { property: 'og:type', name: 'og:type', content: 'website' },
      { property: 'og:url', name: 'og:url', content: 'https://www.lindakat.com' },
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.png' },
      { rel: 'stylesheet', href: 'https://fonts.googleapis.com/css2?family=Fira+Sans&family=Bree+Serif&display=swap' },
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
  ],

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

        const posts = await $content('blog').fetch();

        posts.forEach((post) => {
          const url = `https://www.lindakat.com/blog/${post.slug}`;

          feed.addItem({
            title: post.title,
            id: url,
            link: url,
            description: post.blurb,
            content: post.bodyPlainText,
          });
        });
      },
      cacheTime: 1000 * 60 * 15,
      type: 'rss2',
    },
  ],
  hooks: {
    'content:file:beforeInsert': (document) => {
      if (document.extension === '.md') {
        // eslint-disable-next-line global-require
        const { text } = require('reading-time')(document.text);

        document.readingTime = text;
        document.bodyPlainText = document.text;
      }
    },
  },
  /*
   ** Content module configuration
   ** See https://content.nuxtjs.org/configuration
   */
  content: {
    markdown: {
      prism: {
        theme: '@/assets/css/prism-theme.css',
      },
    },
  },
  /*
   ** Build configuration
   ** See https://nuxtjs.org/api/configuration-build/
   */
  build: {},
  generate: {
    fallback: true,
  },
};
