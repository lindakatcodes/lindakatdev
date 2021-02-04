<template>
  <main class="container">
    <h2 class="title">Key Projects</h2>
    <p>Click an image for a larger view!</p>
    <div class="divider"></div>
    <div class="key-projects-wrapper">
      <ProjectCard v-for="(project, index) in keyProjects" :key="index" :project="project" class="card"></ProjectCard>
    </div>
    <h3 class="title">Extra Side Projects</h3>
    <div class="divider"></div>
    <div class="extra-projects-wrapper">
      <ProjectCard v-for="(project, index) in extraProjects" :key="index" :project="project" class="card"></ProjectCard>
    </div>
  </main>
</template>

<script>
  import getShareImage from '@jlengstorf/get-share-image';

  export default {
    data() {
      return {
        keyProjects: [],
        extraProjects: [],
      };
    },
    async fetch() {
      this.keyProjects = await this.$content('projects')
        .where({ type: { $eq: 'key' } })
        .sortBy('featured', 'desc')
        .sortBy('id', 'desc')
        .fetch();

      this.extraProjects = await this.$content('projects')
        .where({ type: { $eq: 'extra' } })
        .sortBy('id', 'desc')
        .fetch();
    },
    head() {
      return {
        title: 'Lindakat Devs - Projects',
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
            content: 'LindaKat Devs - Projects',
          },
          {
            hid: 'og:description',
            name: 'og:description',
            property: 'og:description',
            content: 'A showcase of projects crafted with love and code',
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
          title: 'LindaKat Codes',
          tagline: 'A showcase of projects crafted with love and code',
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

  p {
    text-align: center;
    color: var(--lightBasic);
    margin: 0.5% 0 1.5%;
    font-family: var(--sansSerif);
  }

  .divider {
    height: 4px;
    width: 25%;
    background: var(--lightGradient);
    margin: 0.25% auto 2%;
  }

  .key-projects-wrapper {
    width: 90%;
    margin: 2% auto;
    padding: 2% 1% 5%;
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
    /* grid-template-rows: repeat(auto-fit, minmax(min(550px, 100%), 1fr)); */
    grid-gap: 20px;
    justify-items: center;
  }

  .extra-projects-wrapper {
    width: 95%;
    margin: 2% auto;
    padding: 2% 1% 5%;
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
    grid-gap: 15px;
    justify-items: center;
  }

  @media screen and (max-width: 768px) {
    .container {
      margin-top: 2%;
    }

    .title {
      font-size: 2rem;
    }

    p {
      margin: 2% 3% 4%;
      font-size: 0.85rem;
    }

    .divider {
      width: 70%;
      margin: 2% auto;
    }

    .key-projects-wrapper {
      width: 95%;
      padding: 0;
      margin-bottom: 5%;
      grid-row-gap: 0;
      grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
    }

    .card:last-child {
      border-bottom: none;
    }
  }
</style>
