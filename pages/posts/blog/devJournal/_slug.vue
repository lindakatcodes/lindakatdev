<template>
  <div class="container">
    <nuxt-link to="/writing" class="navigate">← Back to All Posts</nuxt-link>
    <article class="full-post">
      <h1 class="title">{{ post[0].title }}</h1>
      <p class="timeToRead">{{ post[0].readingTime }}</p>
      <div class="tag-container">
        <p v-for="tag in post[0].tags" :key="tag">{{ tag }}</p>
      </div>
      <nuxt-content :document="post[0]" class="content"></nuxt-content>
    </article>
    <div class="prev-next">
      <nuxt-link v-if="next" :to="{ name: postPath(next.dir), params: { slug: next.slug, path: next.path } }" class="navigate next">
        ← {{ next.title }}
      </nuxt-link>
      <span v-if="prev && next" class="pn-div"></span>
      <nuxt-link v-if="prev" :to="{ name: postPath(prev.dir), params: { slug: prev.slug, path: prev.path } }" class="navigate prev">
        {{ prev.title }} →
      </nuxt-link>
    </div>
    <div class="title-divider"></div>
    <WmLogic></WmLogic>
    <BackToTop visibleoffset="950" bottom="25px" class="scrollUp">
      <i class="material-icons arrow">arrow_upward</i>Back<br />
      to Top
    </BackToTop>
    <nuxt-link to="/writing" class="navigate">← Back to All Posts</nuxt-link>
  </div>
</template>

<script>
  import getShareImage from '@jlengstorf/get-share-image';

  export default {
    async asyncData({ $content, params }) {
      const post = await $content('posts/blog', { deep: true }).where({ slug: params.slug }).fetch();
      const [prev, next] = await $content('posts/blog', { deep: true })
        .only(['title', 'slug', 'dir'])
        .where({ type: { $eq: 'live' } })
        .sortBy('createdAt', 'asc')
        .surround(params.slug)
        .fetch();
      return {
        post,
        prev,
        next,
      };
    },
    data() {
      return {};
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
    computed: {
      socialImage() {
        return this.getImageLink();
      },
      tagLineText() {
        const tagList = this.post[0].tags.map((tag) => `#${tag} `);
        return tagList.join(' ');
      },
    },
    methods: {
      getImageLink() {
        const imageLink = getShareImage({
          title: this.post[0].title,
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
      postPath(path) {
        const split = path.slice(1).split('/');
        return split.join('-').concat('-slug');
      },
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
    margin: 0 auto 5%;
    max-width: 720px;
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
    margin-top: -50px;
    height: 50px;
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

  .post-image {
    text-align: center;
    margin: 2% auto;
  }

  .post-image img {
    max-width: 55%;
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

  .prev-next {
    padding: 0 2%;
    display: grid;
    grid-template-areas: 'next div prev';
    grid-template-columns: 1fr 0.15fr 1fr;
    gap: 15px;
    margin-bottom: 5%;
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

  .title-divider {
    height: 4px;
    width: 100%;
    background: var(--lightGradient);
    margin: 0 auto 4%;
  }

  .scrollUp {
    position: sticky;
    display: flex;
    flex-flow: column;
    margin: 0 2% 2% 90%;
    padding: 1%;
    font-size: 0.9rem;
    color: var(--lightBasic);
    background: var(--darkBasic);
    text-align: center;
    opacity: 0.7;
  }

  .scrollUp:hover {
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
      width: 90%;
    }

    .navigate {
      font-size: 1rem;
    }

    .title {
      font-size: 1.75rem;
      margin-bottom: 6%;
    }

    .timeToRead {
      margin-bottom: 4%;
    }

    .tag-container p {
      font-size: 0.8rem;
    }

    .content hr {
      background: var(--lightGradient);
      margin: 3.5% auto 5%;
    }

    .content p {
      margin-bottom: 5%;
    }

    .content h1,
    .content h2,
    .content h3,
    .content h4,
    .content h5,
    .content h6 {
      margin-bottom: 5%;
    }

    .nuxt-content-highlight {
      margin: 5% 0;
    }

    .nuxt-content-highlight code {
      overflow-wrap: break-word;
      white-space: pre-wrap;
    }

    .content blockquote p {
      font-size: 1.05rem;
    }

    .content blockquote {
      margin-bottom: 5%;
    }

    .prev-next a {
      font-size: 0.9rem;
    }

    .post-image img {
      max-width: 65%;
    }

    .scrollUp {
      margin-left: 82%;
      font-size: 0.7rem;
    }
  }
</style>
