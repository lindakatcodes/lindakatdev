<template>
  <main class="container">
    <h2 class="title">Articles & Thoughts</h2>
    <div class="divider"></div>
    <div class="posts-wrapper">
      <BlogPostBlurb v-for="(post, index) in blogposts" :key="index" :post-blurb="post" class="post"></BlogPostBlurb>
    </div>
  </main>
</template>

<script>
  export default {
    async fetch() {
      this.blogposts = await this.$content('blogPosts').only(['title', 'blurb', 'tags', 'slug']).sortBy('createdAt', 'asc').fetch();
    },
    data() {
      return {
        blogposts: [],
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

  .posts-wrapper {
    margin: 0 auto 1%;
    width: 90%;
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    grid-gap: 4% 1.5%;
  }

  .post {
    grid-column: span 2;
  }
</style>
