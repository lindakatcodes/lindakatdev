<template>
  <div class="posts-wrapper">
    <NotePostBlurb v-for="(post, index) in noteposts" :key="index" :post-blurb="post" class="post"></NotePostBlurb>
  </div>
</template>

<script>
  export default {
    props: {
      noteposts: {
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
    grid-gap: 4% 1.5%;
  }

  .post {
    grid-column: span 2;
  }

  @media screen and (max-width: 768px) {
    .posts-wrapper {
      grid-template-columns: 1fr;
      grid-gap: 0;
    }

    .post {
      grid-column: 1;
    }
  }

  @media screen and (min-width: 769px) and (max-width: 1200px) {
    .posts-wrapper {
      grid-template-columns: 1fr;
      grid-gap: 0;
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