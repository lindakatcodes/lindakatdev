<template>
  <div class="container">
    <nuxt-link to="/writing" class="back">Back to All Posts</nuxt-link>
    <article class="full-post">
      <h1 class="title">{{ post.title }}</h1>
      <div class="tag-container">
        <p v-for="tag in post.tags" :key="tag">{{ tag }}</p>
      </div>
      <nuxt-content :document="post"></nuxt-content>
      <nuxt-link v-if="prev" to="{ name: 'blog-slug', params: { slug: prev.slug} ">{{ prev.title }}</nuxt-link>
      <nuxt-link v-if="next" to="{ name: 'blog-slug', params: { slug: next.slug} ">{{ next.title }}</nuxt-link>
    </article>
  </div>
</template>

<script>
  export default {
    async asyncData({ $content, params }) {
      const post = await $content('blogPosts', params.slug).fetch();
      const [prev, next] = await $content('blogPosts').only(['title', 'slug']).sortBy('createdAt', 'asc').surround(params.slug).fetch();
      return {
        post,
        prev,
        next,
      };
    },
  };
</script>

<style scoped></style>
