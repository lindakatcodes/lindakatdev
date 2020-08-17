<template>
  <div class="posts-wrapper">
    <BlogPostBlurb v-for="(post, index) in selectedPosts" :key="index" :post-blurb="post" class="post"></BlogPostBlurb>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        selectedTag: this.$route.params.tag,
        selectedPosts: [],
      };
    },
    computed: {
      filteredPosts() {
        return this.$attrs.blogposts.filter((post) => post.tags.includes(this.selectedTag));
      },
    },
    mounted() {
      this.selectedPosts = this.filteredPosts;
    },
    beforeUpdate() {
      this.selectedPosts = this.filteredPosts;
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
</style>
