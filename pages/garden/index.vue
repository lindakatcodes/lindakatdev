<template>
  <main class="container">
    <section class="intro">
      <h1 class="intro-name">Learning with Linda!</h1>
      <p class="intro-subtitle">Notes & fun projects from courses or conferences</p>
      <i class="material-icons more-arrow">expand_more</i>
    </section>
    <section class="featured-projects">
      <h2 class="section-title">Fun Side Projects</h2>
      <div class="title-divider"></div>
      <div class="project-block">
        <ProjectCard v-for="(project, index) in playground" :key="index" :project="project" class="card"></ProjectCard>
      </div>
      <div class="section-link-to-all">
        <nuxt-link to="/garden/playground">See All Side Projects</nuxt-link>
      </div>
    </section>
    <section class="recent-writing">
      <h2 class="section-title">Recent Notes</h2>
      <div class="title-divider"></div>
      <div class="writing-block">
        <PostBlurb v-for="(post, index) in noteposts" :key="index" :post-blurb="post" :route-name="routeName"></PostBlurb>
      </div>
      <div class="section-link-to-all">
        <nuxt-link to="/garden/seedlings">See All Notes</nuxt-link>
      </div>
    </section>
  </main>
</template>

<script>
  import getShareImage from '@jlengstorf/get-share-image';

  export default {
    layout: 'gardenView',
    async fetch() {
      this.playground = await this.$content('playground').where({ featured: true }).sortBy('id', 'desc').fetch();
      this.noteposts = await this.$content('notes').only(['title', 'blurb', 'tags', 'slug']).sortBy('updatedAt', 'desc').limit(5).fetch();
    },
    data() {
      return {
        playground: [],
        noteposts: [],
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
          title: 'LindaKat Learns',
          tagline: 'Side projects, guided examples, course notes, and cheat sheets',
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
        title: 'LindaKat Learns',
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
            content: 'Lindakat Learns',
          },
          {
            hid: 'og:description',
            name: 'og:description',
            property: 'og:description',
            content: 'Side projects, guided examples, course notes, and cheat sheets',
          },
          {
            hid: 'og:url',
            name: 'og:url',
            property: 'og:url',
            content: 'https://www.lindakat.com/garden',
          },
        ],
      };
    },
  };
</script>

<style scoped>
  .container {
    margin: 0 auto;
    min-height: 100vh;
    max-width: 100vw;
  }

  /* Intro section styles */

  .intro {
    width: 100%;
    height: 85vh;
    margin-top: 25px;
    display: flex;
    flex-flow: column;
    justify-content: center;
    align-items: center;
  }

  .intro-name {
    font-size: 5rem;
    color: var(--lightBasic);
  }

  .intro-subtitle {
    width: 80%;
    font-size: 1.5rem;
    font-weight: 700;
    text-align: center;
    background: var(--lightGradient);
    background-clip: text;
    -webkit-text-fill-color: transparent;
    margin-top: 1%;
  }

  .more-arrow {
    font-size: 3.5rem;
    color: var(--lightBasic);
    position: absolute;
    bottom: 0;
    left: calc((100% - 3.5rem) / 2);
  }

  /* General section styles - applies to all sections */
  section {
    /* border-bottom: 3px solid var(--lightBasic); */
    margin: 2% 0 3%;
    position: relative;
  }

  .section-title {
    text-align: center;
    font-family: var(--serif);
    color: var(--lightBasic);
    font-size: 2.5rem;
    font-weight: 900;
  }

  .title-divider {
    height: 4px;
    width: 25%;
    background: var(--lightGradient);
    margin: 0.25% auto 2%;
  }

  .section-link-to-all {
    margin: 0 auto;
    text-align: center;
  }

  .section-link-to-all a {
    background: var(--lightGradient);
    background-clip: text;
    -webkit-text-fill-color: transparent;
    text-decoration: solid underline var(--lightBasic);
    font-size: 1.4rem;
    font-weight: 700;
    transition: text-decoration 0.3s;
  }

  .section-link-to-all a:hover {
    text-decoration-color: var(--lightPink);
    text-decoration-style: double;
  }

  /* Project styles */
  .project-block {
    /* height: 78vh; */
    width: 90%;
    margin: 0 auto 2%;
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(min(350px, 100%), 1fr));
    grid-gap: 2%;
  }

  /* Writing styles */
  .writing-block {
    margin: 0 auto 2%;
    width: 60%;
  }

  @media screen and (max-width: 768px) {
    .intro-name {
      font-size: 3.25rem;
      text-align: center;
      line-height: 3.5rem;
    }

    .intro-subtitle {
      margin-top: 5%;
      width: 93%;
      font-size: 1.25rem;
    }

    .more-arrow {
      font-size: 2.5rem;
      left: calc((100% - 2.5rem) / 2);
    }

    section {
      margin-bottom: 4.5%;
    }

    .section-title {
      font-size: 1.85rem;
    }

    .title-divider {
      width: 65%;
      margin: 2% auto 4%;
    }

    .section-link-to-all {
      font-size: 1.2rem;
      left: 29%;
    }

    .project-block {
      grid-row-gap: 0;
      margin-bottom: 5%;
      grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
    }

    .card:last-child {
      border-bottom: none;
    }

    .writing-block {
      width: 90%;
    }
  }

  @media screen and (min-width: 769px) and (max-width: 1200px) {
    .intro-icons {
      width: 35%;
    }

    .intro-divider {
      width: 48%;
    }
  }
</style>
