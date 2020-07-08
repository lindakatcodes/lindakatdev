<template>
  <div class="blurb-container">
    <nuxt-link :to="{ name: 'blog-slug', params: { slug: postBlurb.slug } }" class="post-title">
      {{ postBlurb.title }}
    </nuxt-link>
    <p class="post-blurb">{{ postBlurb.blurb }}</p>
  </div>
</template>

<script>
  export default {
    props: {
      postBlurb: {
        type: Object,
      },
    },
  };
</script>

<style scoped>
  .blurb-container {
    /* border: 2px solid purple; */
    margin-bottom: 2%;
    padding: 0 2%;
  }

  .blurb-container:nth-last-child() {
    margin-bottom: 0;
  }

  .post-title {
    color: var(--lightBasic);
    text-decoration: none;
    border-bottom: 1.5px solid;
    border-bottom-color: var(--lightPurple);
    transition: color 0.3s;
    font-size: 1.2rem;
  }

  .post-title:hover {
    color: var(--lightPurple);
  }

  .blurb-container:nth-child(2n) .post-title {
    border-bottom-color: var(--lightBlue);
  }

  .blurb-container:nth-child(2n) .post-title:hover {
    color: var(--lightBlue);
  }

  .blurb-container:nth-child(3n) .post-title {
    border-bottom-color: var(--lightYellow);
  }

  .blurb-container:nth-child(3n) .post-title:hover {
    color: var(--lightYellow);
  }

  .blurb-container:nth-child(4n) .post-title {
    border-bottom-color: var(--lightPink);
  }

  .blurb-container:nth-child(4n) .post-title:hover {
    color: var(--lightPink);
  }

  .post-blurb {
    font-family: var(--sansSerif);
    font-size: 1rem;
    color: var(--lightBasic);
    margin-left: 1%;
    margin-top: 1%;
  }
</style>
