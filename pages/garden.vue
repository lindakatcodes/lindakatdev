<template>
  <main class="container">
    <h2 class="title">The Note Garden</h2>
    <div class="divider"></div>
    <p class="description">Notes from Courses, Conference Talks, etc. View by tag if you'd like!</p>
    <TagList :tags="tagdata" :all="page"></TagList>
    <nuxt-child :noteposts="noteposts"></nuxt-child>
  </main>
</template>

<script>
  export default {
    async fetch() {
      this.noteposts = await this.$content('notes').only(['title', 'blurb', 'tags', 'slug']).sortBy('createdAt', 'desc').fetch();
      this.tagdata = await this.$content('notes').only(['tags']).fetch();
    },
    data() {
      return {
        noteposts: [],
        tagdata: [],
        page: 'garden',
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

  .description {
    color: var(--lightBasic);
    font-family: var(--sansSerif);
    text-align: center;
    margin-bottom: 1.5%;
    padding: 0 5%;
  }

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
    .title {
      font-size: 2.2rem;
    }

    .divider {
      width: 70%;
      margin: 2% auto 4%;
    }

    .posts-wrapper {
      grid-template-columns: 1fr;
      grid-gap: 0;
    }

    .post {
      grid-column: 1;
    }
  }

  @media screen and (min-width: 769px) and (max-width: 1200px) {
    .divider {
      width: 45%;
    }

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
    }
  }
</style>
