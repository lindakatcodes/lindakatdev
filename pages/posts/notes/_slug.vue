<template>
  <div class="container">
    <nuxt-link to="/garden/seedlings" class="navigate">← Back to the Note Garden</nuxt-link>
    <article class="full-post">
      <h1 class="title">{{ post.title }}</h1>
      <p class="timeToRead">{{ post.readingTime }}</p>
      <div class="tag-container">
        <p v-for="tag in post.tags" :key="tag">{{ tag }}</p>
      </div>
      <h2 class="toc">Jump to a Section:</h2>
      <ul>
        <li v-for="link of links" :key="link.id" class="toc-link">
          <NuxtLink v-scroll-to="`#${link.id}`" :to="`#${link.id}`" :class="{ 'link-h2': link.depth === 2, 'link-h3': link.depth === 3 }">{{
            link.text
          }}</NuxtLink>
        </li>
      </ul>
      <div class="title-divider"></div>
      <nuxt-content :document="post" class="content"></nuxt-content>
    </article>
    <BackToTop visibleoffset="950" bottom="25px" class="scrollUp">
      <i class="material-icons arrow">arrow_upward</i>Back<br />
      to Top
    </BackToTop>
  </div>
</template>

<script>
  import getShareImage from '@jlengstorf/get-share-image';

  export default {
    layout: 'school',
    async asyncData({ $content, params }) {
      const post = await $content('posts/notes', params.slug).fetch();
      const links = post.toc;
      return {
        post,
        links,
      };
    },
    computed: {
      socialImage() {
        return this.getImageLink();
      },
      tagLineText() {
        const tagList = this.post.tags.map((tag) => `#${tag} `);
        return tagList.join(' ');
      },
    },
    methods: {
      getImageLink() {
        const imageLink = getShareImage({
          title: this.post.title,
          tagline: this.tagLineText,
          cloudName: 'lindakatcodes',
          imagePublicID: 'lkdev/og-image',
          titleFont: 'Overlock',
          taglineFont: 'Fira Sans',
          textColor: 'F3F6F7',
          textAreaWidth: 850,
          textLeftOffset: 325,
          titleBottomOffset: 300,
          taglineTopOffset: 425,
          titleFontSize: 66,
          taglineFontSize: 50,
          titleExtraConfig: '_bold',
        });
        return imageLink;
      },
    },
    head() {
      return {
        title: this.post.title,
        meta: [
          {
            hid: 'og:description',
            name: 'og:description',
            property: 'og:description',
            content: this.post.blurb,
          },
          {
            hid: 'og:title',
            name: 'og:title',
            property: 'og:title',
            content: this.post.title,
          },
          {
            hid: 'og:image',
            name: 'og:image',
            property: 'og:image',
            content: this.socialImage,
          },
          {
            hid: 'og:type',
            name: 'og:type',
            property: 'og:type',
            content: 'article',
          },
          {
            hid: 'og:url',
            name: 'og:name',
            property: 'og:url',
            content: `https://www.lindakat.com${this.post.path}`,
          },
          {
            hid: 'twitter:card',
            name: 'twitter:card',
            property: 'twitter:card',
            content: 'summary_large_image',
          },
        ],
      };
    },
  };
</script>

<style scoped>
  .container {
    margin: 2% auto;
    max-width: 880px;
  }

  .navigate {
    color: var(--lightBlue);
    text-decoration: solid underline var(--lightBasic);
    font-family: var(--sansSerif);
    font-size: 1.1rem;
    font-weight: 700;
  }

  .navigate:hover {
    color: var(--lightYellow);
  }

  .full-post {
    padding: 3%;
    max-width: 720px;
    margin: 0 auto;
  }

  .title {
    width: 85%;
    color: var(--lightBasic);
    text-align: center;
    font-size: 2.25rem;
    padding-bottom: 0.5rem;
    margin: 0 auto 3%;
    border: 4px solid;
    border-image-source: var(--lightGradient);
    border-image-slice: 0 0 4 0;
  }

  .timeToRead {
    text-align: center;
    color: var(--lightYellow);
    font-family: var(--sansSerif);
    margin-bottom: 2%;
  }

  .tag-container {
    display: flex;
    justify-content: center;
    align-items: center;
    margin-bottom: 4%;
  }

  .tag-container p {
    padding: 0.5% 1%;
    margin: 0 1.5%;
    text-transform: uppercase;
    font-size: 0.9rem;
    font-weight: 700;
    letter-spacing: 0.75px;
    background: var(--lightPurple);
    color: var(--darkBasic);
    border-radius: 5px;
  }

  .tag-container p:nth-child(2n) {
    background: var(--lightBlue);
  }

  .tag-container p:nth-child(3n) {
    background: var(--lightYellow);
  }

  .tag-container p:nth-child(4n) {
    background: var(--lightPink);
  }

  .toc {
    color: var(--lightBasic);
    font-size: 1.5rem;
  }

  .toc-link {
    list-style: none;
    margin: 1% 0;
  }

  .toc-link:last-of-type {
    margin-bottom: 3%;
  }

  .link-h2 {
    background: var(--lightGradient);
    background-clip: text;
    -webkit-text-fill-color: transparent;
    font-size: 1.1rem;
    text-decoration: none;
    transition: text-decoration 0.3s;
  }

  .link-h2:hover,
  .link-h3:hover {
    text-decoration: solid double var(--lightBasic);
  }

  .link-h3 {
    margin-left: 4%;
    font-family: var(--sansSerif);
    font-size: 0.9rem;
    color: var(--lightBasic);
    background: none;
    text-decoration: none;
    transition: text-decoration 0.3s;
  }

  .title-divider {
    height: 4px;
    width: 100%;
    background: var(--lightGradient);
    margin: 0 auto 2%;
  }

  .content {
    line-height: 1.5;
    color: var(--lightBasic);
    font-family: var(--sansSerif);
  }

  .content hr {
    width: 60%;
    height: 4px;
    border: 0;
    background: var(--lightGradient);
    margin: 2.5% auto;
  }

  .content p,
  .content li:last-child {
    margin-bottom: 1.75%;
    z-index: 1;
  }

  .content h1,
  .content h2,
  .content h3,
  .content h4,
  .content h5,
  .content h6 {
    margin-bottom: 2%;
    font-family: var(--serif);
  }

  .content h1::before,
  .content h2::before,
  .content h3::before,
  .content h4::before,
  .content h5::before,
  .content h6::before {
    display: block;
    content: ' ';
    margin-top: -55px;
    height: 55px;
    visibility: hidden;
    pointer-events: none;
    z-index: 0;
  }

  .content h1,
  .content h2 {
    color: var(--lightYellow);
  }

  .content h3,
  .content h4 {
    color: var(--lightGreen);
  }

  .content h5,
  .content h6 {
    color: var(--lightPink);
  }

  .content strong {
    color: var(--lightBlue);
    font-size: 1.05rem;
  }

  .content a {
    background: var(--lightGradient);
    background-clip: text;
    -webkit-text-fill-color: transparent;
    text-decoration: none;
    transition: text-decoration 0.3s;
  }

  .content a:hover {
    text-decoration: solid underline var(--lightBasic);
  }

  .content img {
    width: 90%;
    margin: 2% auto;
  }

  .content p code {
    color: var(--lightPurple);
    overflow-wrap: break-word;
  }

  .content blockquote {
    background-image: var(--lightGradient);
    border-radius: 5px;
    padding: 0 1%;
  }

  .content blockquote p {
    background-color: #212c31;
    padding: 2% 1% 2% 3%;
    font-size: 1.2rem;
    font-weight: bold;
  }

  .nuxt-content-highlight {
    margin: 2.5% 0;
    width: 98%;
  }

  .nuxt-content-highlight .comment {
    color: #8e9ba1;
  }

  .nuxt-content-highlight code {
    overflow-wrap: break-word;
    white-space: pre-wrap;
  }

  .prev-next {
    padding: 0 2%;
    display: grid;
    grid-template-areas: 'prev div next';
    grid-template-columns: 1fr 0.15fr 1fr;
    gap: 15px;
  }

  .prev {
    grid-area: prev;
    text-align: left;
  }

  .next {
    grid-area: next;
    text-align: right;
  }

  .pn-div {
    width: 2px;
    height: 75%;
    margin: auto 0;
    background: var(--lightBasic);
    justify-self: center;
  }

  .scrollUp {
    position: sticky;
    display: flex;
    flex-flow: column;
    margin: 0 2% 2% 90%;
    padding: 1%;
    font-size: 0.8rem;
    color: var(--lightBasic);
    background: var(--darkBasic);
    text-align: center;
    opacity: 0.7;
  }

  .scrollUp:hover {
    opacity: 1;
  }

  .scrollUp button {
    background: var(--darkBasic);
    border: none;
    border-radius: 10px;
    cursor: pointer;
    display: flex;
    flex-flow: column;
    align-content: center;
    font-size: 0.8rem;
    color: var(--lightBasic);
    opacity: 0.5;
  }

  .scrollUp button:hover {
    opacity: 1;
  }

  .arrow {
    background: var(--lightGradient);
    background-clip: text;
    -webkit-text-fill-color: transparent;
  }

  @media screen and (max-width: 768px) {
    .container {
      margin: 4% auto;
      width: 95%;
    }

    .title {
      font-size: 2rem;
      margin-bottom: 6%;
    }

    .timeToRead {
      margin-bottom: 4%;
    }

    .toc {
      font-size: 1.3rem;
    }

    .link-h2 {
      font-size: 1rem;
    }

    .content hr {
      background: var(--lightGradient);
      margin: 3.5% auto;
    }

    .content p {
      margin-bottom: 3%;
    }

    .nuxt-content-highlight {
      margin: 5% 0;
    }
  }
</style>
