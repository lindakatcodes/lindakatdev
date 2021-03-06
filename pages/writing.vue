<template>
  <main class="container">
    <h2 class="title">Articles & Thoughts</h2>
    <div class="divider"></div>
    <p class="description">View posts by tag:</p>
    <TagList :tags="tagdata" :all="page"></TagList>
    <nuxt-child :blogposts="blogposts"></nuxt-child>
  </main>
</template>

<script>
  import getShareImage from '@jlengstorf/get-share-image';

  export default {
    data() {
      return {
        blogposts: [],
        tagdata: [],
        page: 'writing',
      };
    },
    async fetch() {
      this.blogposts = await this.$content('posts/published/posts')
        .only(['title', 'blurb', 'tags', 'slug', 'dir'])
        .sortBy('createdAt', 'desc')
        .fetch();
      this.tagdata = await this.$content('posts/published/posts').only(['tags']).fetch();
    },
    head() {
      return {
        title: 'LindaKat Devs - Writing',
        meta: [
          {
            hid: 'og:image',
            name: 'og:image',
            property: 'og:image',
            content: this.socialImage,
          },
          {
            hid: 'og:title',
            name: 'og:title',
            property: 'og:title',
            content: 'LindaKat Devs - Writing',
          },
          {
            hid: 'og:description',
            name: 'og:description',
            property: 'og:description',
            content: 'Tech blog posts - sharing, learning, & having fun in public',
          },
        ],
      };
    },
    computed: {
      socialImage() {
        return this.getImageLink();
      },
    },
    methods: {
      getImageLink() {
        const imageLink = getShareImage({
          title: 'LindaKat Writes',
          tagline: 'Tech blog posts - sharing, learning, & having fun in public',
          cloudName: 'lindakatcodes',
          imagePublicID: 'lkdev/og-image',
          titleFont: 'Overlock',
          taglineFont: 'Fira Sans',
          textColor: 'F3F6F7',
          textAreaWidth: 850,
          textLeftOffset: 325,
          titleBottomOffset: 450,
          taglineTopOffset: 350,
          titleFontSize: 94,
          taglineFontSize: 50,
          titleExtraConfig: '_bold',
        });
        return imageLink;
      },
    },
  };
</script>

<style scoped>
  .container {
    position: relative;
    margin: 2% 0;
  }

  .title {
    text-align: center;
    font-family: var(--serif);
    color: var(--lightBasic);
    font-size: 2.5rem;
    font-weight: 900;
  }

  .divider {
    height: 4px;
    width: 20%;
    background: var(--lightGradient);
    margin: 0.25% auto 2%;
  }

  .description {
    color: var(--lightBasic);
    font-family: var(--sansSerif);
    text-align: center;
    margin-bottom: 1.5%;
    padding: 0 5%;
  }

  @media screen and (max-width: 768px) {
    .title {
      font-size: 2.2rem;
    }

    .divider {
      width: 70%;
      margin: 2% auto 4%;
    }
  }

  @media screen and (min-width: 769px) and (max-width: 1200px) {
    .divider {
      width: 45%;
    }
  }
</style>
