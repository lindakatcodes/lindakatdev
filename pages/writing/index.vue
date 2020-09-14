<template>
  <div class="posts-wrapper">
    <BlogPostBlurb v-for="(post, index) in blogposts" :key="index" :post-blurb="post" class="post"></BlogPostBlurb>
  </div>
</template>

<script>
  export default {
    props: {
      blogposts: {
        type: Array,
      },
    },
  };
</script>

<style scoped>
  .posts-wrapper {
    margin: 0 auto 4%;
    width: 90%;
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    column-gap: 1.5%;
  }

  .post {
    grid-column: span 2;
    margin-bottom: 3%;
  }

  @media screen and (max-width: 768px) {
    .posts-wrapper {
      grid-template-columns: 1fr;
      column-gap: 0;
    }

    .post {
      grid-column: 1;
      margin-bottom: 6%;
    }
  }

  @media screen and (min-width: 769px) and (max-width: 1200px) {
    .posts-wrapper {
      grid-template-columns: 1fr;
      column-gap: 0;
      width: 70%;
    }

    .post {
      grid-column: 1;
    }
  }

  @media screen and (min-width: 2000px) {
    .posts-wrapper {
      margin-bottom: 10%;
      width: 70%;
      grid-template-columns: repeat(6, 1fr);
    }
  }
</style>
