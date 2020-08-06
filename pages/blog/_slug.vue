<template>
  <div class="container">
    <nuxt-link to="/writing" class="navigate">← Back to All Posts</nuxt-link>
    <article class="full-post">
      <h1 class="title">{{ post.title }}</h1>
      <p class="timeToRead">{{ post.readingTime }}</p>
      <div class="tag-container">
        <p v-for="tag in post.tags" :key="tag">{{ tag }}</p>
      </div>
      <nuxt-content :document="post" class="content"></nuxt-content>
    </article>
    <div class="prev-next">
      <nuxt-link v-if="prev" :to="{ name: 'blog-slug', params: { slug: prev.slug } }" class="navigate prev">← {{ prev.title }}</nuxt-link>
      <span v-if="prev && next" class="pn-div"></span>
      <nuxt-link v-if="next" :to="{ name: 'blog-slug', params: { slug: next.slug } }" class="navigate next">{{ next.title }} →</nuxt-link>
    </div>
  </div>
</template>

<script>
  export default {
    async asyncData({ $content, params }) {
      const post = await $content('blog', params.slug).fetch();
      const [prev, next] = await $content('blog').only(['title', 'slug']).sortBy('createdAt', 'asc').surround(params.slug).fetch();
      return {
        post,
        prev,
        next,
      };
    },
  };
</script>

<style scoped>
  .container {
    max-width: 720px;
    margin: 2% auto;
  }

  .navigate {
    color: var(--lightBlue);
    text-decoration: 2px solid underline var(--lightBasic);
    font-family: var(--sansSerif);
    font-size: 1.1rem;
    font-weight: 700;
  }

  .navigate:hover {
    color: var(--lightPink);
  }

  .full-post {
    padding: 3%;
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
    font-family: var(--sansSerif);
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

  .content p {
    margin-bottom: 1.5%;
  }

  .content h1,
  .content h2 {
    font-family: var(--serif);
    color: var(--lightYellow);
  }

  .content h3,
  .content h4,
  .content h5,
  .content h6 {
    font-family: var(--serif);
    color: var(--lightGreen);
  }

  .content a {
    color: var(--lightPurple);
    text-decoration: 1px solid var(--lightYellow);
  }

  .content a:hover {
    color: var(--lightGreen);
  }

  .content img {
    width: 90%;
    margin: 2% auto;
  }

  .nuxt-content-highlight {
    margin: 2.5% 0;
    width: 98%;
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

    .nuxt-content-highlight code {
      overflow-wrap: break-word;
      white-space: pre-wrap;
    }
  }
</style>
