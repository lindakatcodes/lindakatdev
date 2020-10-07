<template>
  <main class="container">
    <h2 class="title">Side Projects & Exercises</h2>
    <div class="divider"></div>
    <div class="projects-wrapper">
      <ProjectCard v-for="(project, index) in playground" :key="index" :project="project" class="card"></ProjectCard>
    </div>
  </main>
</template>

<script>
  import getShareImage from '@jlengstorf/get-share-image';

  export default {
    async fetch() {
      this.playground = await this.$content('playground').sortBy('id', 'desc').fetch();
    },
    data() {
      return {
        playground: [],
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
          title: 'LindaKat Plays',
          tagline: 'Small side projects and guided learning exercises',
          cloudName: 'lindakatcodes',
          imagePublicID: 'lkdev/og-image',
          titleFont: 'Bree Serif',
          taglineFont: 'Fira Sans',
          textColor: 'F3F6F7',
          textAreaWidth: 850,
          textLeftOffset: 325,
          titleBottomOffset: 450,
          taglineTopOffset: 350,
          titleFontSize: 94,
          taglineFontSize: 50,
        });
        return imageLink;
      },
    },
    head() {
      return {
        title: 'LindaKat Learns - Playground',
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
            content: 'Lindakat Learns - Playground',
          },
          {
            hid: 'og:description',
            name: 'og:description',
            property: 'og:description',
            content: 'Small side projects and guided learning exercises',
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
  }

  .divider {
    height: 4px;
    width: 20%;
    background: var(--lightGradient);
    margin: 0.25% auto 2%;
  }

  .projects-wrapper {
    width: 90%;
    margin: 2% auto;
    padding: 2% 1% 5%;
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
    /* grid-template-rows: repeat(auto-fit, minmax(min(550px, 100%), 1fr)); */
    grid-gap: 20px;
    justify-items: center;
  }

  @media screen and (max-width: 768px) {
    .container {
      margin-top: 4%;
    }

    .title {
      font-size: 2rem;
    }

    .divider {
      width: 70%;
      margin: 1% auto 6%;
    }

    .projects-wrapper {
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
