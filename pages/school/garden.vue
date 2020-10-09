<template>
  <main class="container">
    <h2 class="title">The Note Garden</h2>
    <div class="divider"></div>
    <p class="description">Notes from Courses, Conference Talks, etc. View by tag if you'd like!</p>
    <TagList :tags="tagdata" :all="page" :route-name="routeName"></TagList>
    <nuxt-child :noteposts="noteposts" :route-name="routeName"></nuxt-child>
  </main>
</template>

<script>
  import getShareImage from '@jlengstorf/get-share-image';

  export default {
    layout: 'school',
    async fetch() {
      this.noteposts = await this.$content('notes').only(['title', 'blurb', 'tags', 'slug']).sortBy('updatedAt', 'desc').fetch();
      this.tagdata = await this.$content('notes').only(['tags']).fetch();
    },
    data() {
      return {
        noteposts: [],
        tagdata: [],
        page: 'school-garden',
        routeName: 'notes',
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
          title: 'LindaKat Notes',
          tagline: 'Course notes and personal cheat sheets',
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
    head() {
      return {
        title: 'LindaKat Learns - Garden',
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
            content: 'Lindakat Learns - Garden',
          },
          {
            hid: 'og:description',
            name: 'og:description',
            property: 'og:description',
            content: 'Course notes and personal cheat sheets',
          },
          {
            hid: 'og:url',
            name: 'og:url',
            property: 'og:url',
            content: 'https://www.lindakat.com/school',
          },
        ],
      };
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
