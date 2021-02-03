<template>
  <main class="container">
    <div class="page-header">
      <h2 class="page-title">All About Linda</h2>
      <div class="title-divider"></div>
    </div>
    <img src="~assets/images/profile/me-sm.jpg" alt="Woman with brown hair, brown eyes, and a winning smile." class="photo" />
    <section class="info summary">
      <div class="section-details">
        <nuxt-content :document="aboutSections.summary"></nuxt-content>
      </div>
    </section>
    <section class="info traits">
      <h3 class="section-title">Quality Traits:</h3>
      <div class="title-divider about-div"></div>
      <nuxt-content :document="aboutSections.traits"></nuxt-content>
    </section>
    <section class="info career">
      <h3 class="section-title">Career Wants:</h3>
      <div class="title-divider about-div"></div>
      <nuxt-content :document="aboutSections.career"></nuxt-content>
    </section>
    <section class="info favorites">
      <h3 class="section-title">Quick Fire Favorites:</h3>
      <div class="title-divider about-div"></div>
      <nuxt-content :document="aboutSections.favorites"></nuxt-content>
    </section>
    <div class="certificates">
      <figure v-for="(cert, index) in certificates" :key="index" class="cert-figure">
        <a :href="cert.link" class="cert-link" target="_blank" rel="noreferrer noopener">
          <img :src="picUrl(cert.img)" :alt="cert.altText" class="cert-pic" />
        </a>
        <figcaption class="cert-caption">{{ cert.class }}</figcaption>
      </figure>
    </div>
  </main>
</template>

<script>
  import getShareImage from '@jlengstorf/get-share-image';

  export default {
    async asyncData({ $content }) {
      const aboutArr = await $content('about').fetch();
      const aboutSections = {};

      aboutArr.forEach((section) => {
        aboutSections[section.title] = section;
      });
      return {
        aboutSections,
      };
    },
    data() {
      return {
        certificates: [],
      };
    },
    async fetch() {
      this.certificates = await this.$content('certificates').sortBy('completion_id', 'desc').fetch();
    },
    head() {
      return {
        title: 'LindaKat Devs - About',
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
            content: 'LindaKat Devs - About',
          },
          {
            hid: 'og:description',
            name: 'og:description',
            property: 'og:description',
            content: "Everything you want to know about Linda's goals and knowledge",
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
      picUrl(pic) {
        // eslint-disable-next-line global-require, import/no-dynamic-require
        return require(`@/assets/images/certificates/${pic}.png`);
      },
      getImageLink() {
        const imageLink = getShareImage({
          title: 'All About LindaKat',
          tagline: "Everything you want to know about Linda's goals and knowledge",
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
    display: grid;
    grid-template-areas:
      'title title title'
      'image summary summary'
      'traits career favorites'
      'certs certs certs';
    grid-template-columns: 1fr 1fr 1fr;
    grid-template-rows: auto;
    gap: 30px;
    justify-content: space-around;
    align-content: center;
    padding: 1% 2%;
    width: 94%;
    margin: 50px auto 5%;
    /* border: 2px solid purple; */
  }

  .page-header {
    grid-area: title;
  }

  .page-title {
    text-align: center;
    color: var(--lightBasic);
    font-size: 3rem;
    font-weight: 900;
  }

  .title-divider {
    height: 4px;
    width: 25%;
    background: var(--lightGradient);
    margin: 0.25% auto 1%;
  }

  .about-div {
    width: 50%;
    margin-bottom: 2.5%;
  }

  .photo {
    grid-area: image;
    /* align-self: start; */
    justify-self: center;
    border-radius: 10%;
    border: 2px solid var(--lightYellow);
    margin: 5% 0;
    width: 85%;
    object-fit: cover;
    object-position: right top;
  }

  .section-title {
    text-align: center;
    color: var(--lightBasic);
    font-size: 1.8rem;
    font-weight: 900;
  }

  .section-details,
  .nuxt-content {
    padding: 1% 2% 2%;
    color: var(--lightBasic);
    font-family: var(--sansSerif);
    line-height: 1.35rem;
  }

  .section-details p {
    margin-bottom: 2%;
  }

  ul {
    list-style-type: none;
    padding-left: 3%;
    width: 96%;
  }

  ul li {
    text-indent: -4.5%;
    margin-bottom: 2%;
  }

  ul li::before {
    content: '»';
    margin: 0 0.5rem;
    font-size: 1.2rem;
    font-weight: bold;
    color: var(--lightPurple);
  }

  ul li:nth-child(2n)::before {
    color: var(--lightBlue);
  }

  ul li:nth-child(3n)::before {
    color: var(--lightYellow);
  }

  ul li:nth-child(4n)::before {
    color: var(--lightPink);
  }

  .link {
    background: var(--lightGradient);
    background-clip: text;
    -webkit-text-fill-color: transparent;
    text-decoration: none;
    transition: text-decoration 0.3s;
  }

  .link:hover {
    text-decoration: solid underline var(--lightBasic);
  }

  .summary {
    grid-area: summary;
  }

  .favorites {
    grid-area: favorites;
  }

  .career {
    grid-area: career;
  }

  .traits {
    grid-area: traits;
  }

  .certificates {
    grid-area: certs;
    display: flex;
    justify-content: space-around;
    width: 100%;
    margin-bottom: 2%;
  }

  .cert-figure {
    width: 20vw;
    height: 33vh;
    margin: 1%;
    border: 3px ridge var(--lightPurple);
  }

  .cert-pic {
    width: 100%;
    height: 75%;
    object-fit: cover;
    object-position: center center;
    overflow: hidden;
    border-bottom: 4px solid var(--lightPurple);
  }

  .cert-figure:nth-child(2n) {
    border: 3px ridge var(--lightBlue);
  }

  .cert-figure:nth-child(2n) .cert-pic {
    border-bottom: 4px solid var(--lightBlue);
  }

  .cert-figure:nth-child(3n) {
    border: 3px ridge var(--lightYellow);
  }

  .cert-figure:nth-child(3n) .cert-pic {
    border-bottom: 4px solid var(--lightYellow);
  }

  .cert-figure:nth-child(4n) {
    border: 3px ridge var(--lightPink);
  }

  .cert-figure:nth-child(4n) .cert-pic {
    border-bottom: 4px solid var(--lightPink);
  }

  .cert-caption {
    /* border: 2px solid white; */
    color: var(--lightBasic);
    font-size: 0.9rem;
    text-transform: uppercase;
    /* font-family: var(--sansSerif); */
    letter-spacing: 0.75px;
    font-weight: 700;
    display: flex;
    justify-content: center;
    align-items: center;
    text-align: center;
    height: 22%;
    padding: 0 2%;
  }

  @media screen and (max-width: 1200px) {
    .container {
      grid-template-areas:
        'title'
        'image'
        'summary'
        'career'
        'traits'
        'favorites'
        'certs';
      grid-template-columns: 1fr;
      grid-template-rows: auto;
      gap: 20px 0;
      margin: calc(50px + 2%) 0 0 0;
      width: 100%;
    }

    .certificates {
      flex-flow: wrap;
      margin: 0 auto 5%;
    }

    .photo {
      justify-self: center;
      margin-bottom: 2%;
    }
  }

  @media screen and (max-width: 768px) {
    .page-title {
      font-size: 2.3rem;
      padding: 0 1.5%;
    }

    .title-divider {
      width: 64%;
    }

    .about-div {
      width: 58%;
    }

    .photo {
      width: 90%;
    }

    .section-title {
      font-size: 1.75rem;
      margin-bottom: 2%;
    }

    .section-details p {
      margin-bottom: 5%;
    }

    ul li {
      margin-bottom: 5%;
    }

    .cert-figure {
      width: 44vw;
      height: 56vw;
      margin: 2%;
    }

    .cert-pic {
      height: 63%;
    }

    .cert-caption {
      padding: 2% 2%;
      height: 31%;
      font-size: 0.7rem;
    }
  }

  @media screen and (min-width: 769px) and (max-width: 1200px) {
    .title-divider {
      width: 44%;
    }

    .photo {
      width: 45%;
    }

    .cert-figure {
      width: 28vw;
      height: 32vw;
    }

    .cert-pic {
      height: 63%;
    }

    .cert-caption {
      padding: 2% 3%;
      height: 30%;
    }
  }

  @media screen and (min-width: 2000px) {
    .certificates {
      margin-bottom: 10%;
    }
  }
</style>
