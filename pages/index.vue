<template>
  <main class="container">
    <section class="intro">
      <h1 class="intro-name">Linda Thompson</h1>
      <p class="intro-subtitle">
        Web Dev • JavaScript • Data • Design
      </p>
      <hr class="intro-divider" />
      <div class="intro-icons">
        <a href="https://github.com/lindakatcodes" target="_blank" rel="noreferrer" tooltip="GitHub">
          <img src="~assets/icons/github-square.svg" alt="GitHub icon" class="gh-icon" />
        </a>
        <a href="https://twitter.com/lindakatcodes" target="_blank" rel="noreferrer" tooltip="Twitter">
          <img src="~assets/icons/twitter-square.svg" alt="Twitter icon" class="tw-icon" />
        </a>
      </div>
    </section>
    <section class="featured-projects">
      <h2 class="section-title">Featured Projects</h2>
      <div class="title-divider"></div>
      <div class="project-block">
        <ProjectCard v-for="(project, index) in projects" :key="index" :project="project"></ProjectCard>
      </div>
      <nuxt-link to="/projects" class="section-link-to-all">See All Projects</nuxt-link>
    </section>
    <section class="recent-writing">
      <h2 class="section-title">Recent Writings</h2>
      <div class="title-divider"></div>
      <div class="writing-block">
        <BlogPostBlurb v-for="(post, index) in blogposts" :key="index" :post-blurb="post"></BlogPostBlurb>
      </div>
      <nuxt-link to="/writing" class="section-link-to-all">See All Posts</nuxt-link>
    </section>
  </main>
</template>

<script>
  export default {
    async fetch() {
      this.projects = await this.$content('projects').where({ featured: true }).sortBy('id', 'desc').fetch();
      this.blogposts = await this.$content('blogPosts').only(['title', 'blurb', 'tags', 'slug']).sortBy('createdAt', 'asc').limit(8).fetch();
    },
    data() {
      return {
        projects: [],
        blogposts: [],
      };
    },
  };
</script>

<style scoped>
  .container {
    margin: 0 auto;
    min-height: 100vh;
    max-width: 100vw;
  }

  /* Intro section styles */

  .intro {
    width: 100%;
    height: 85vh;
    margin-top: 25px;
    display: flex;
    flex-flow: column;
    justify-content: center;
    align-items: center;
  }

  .intro-name {
    font-size: 5rem;
    color: var(--lightBasic);
  }

  .intro-subtitle {
    font-size: 1.5rem;
    text-align: center;
    background: var(--lightGradient);
    background-clip: text;
    -webkit-text-fill-color: transparent;
    margin-top: 1%;
  }

  .intro-divider {
    background: var(--lightBasic);
    height: 4px;
    width: 28%;
    margin-top: 2%;
  }

  .intro-icons {
    width: 25%;
    display: flex;
    justify-content: center;
    align-items: center;
    margin-top: 2%;
  }

  .intro-icons img {
    width: 9vw;
    padding: 0.5rem 1.5rem 0;
  }

  .gh-icon:hover {
    filter: url('~assets/icons/github-square.svg#gh-hover-color');
  }

  .tw-icon:hover {
    filter: url('~assets/icons/twitter-square.svg#tw-hover-color');
  }

  /* General section styles - applies to all sections */
  section {
    /* border-bottom: 3px solid var(--lightBasic); */
    margin: 2% 0 3%;
    position: relative;
  }

  .section-title {
    text-align: center;
    font-family: var(--serif);
    color: var(--lightBasic);
    font-size: 2.5rem;
  }

  .title-divider {
    height: 4px;
    width: 25%;
    background: var(--lightGradient);
    margin: 0.25% auto 2%;
  }

  .section-link-to-all {
    background: var(--lightGradient);
    background-clip: text;
    -webkit-text-fill-color: transparent;
    text-decoration: 2px solid underline var(--lightBasic);
    font-size: 1.4rem;
    position: relative;
    left: 44%;
  }

  .section-link-to-all:hover {
    text-decoration-color: var(--lightPink);
    text-decoration-style: double;
  }

  /* Project styles */
  .project-block {
    /* height: 78vh; */
    width: 90%;
    margin: 0 auto 2%;
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(min(350px, 100%), 1fr));
    grid-gap: 2%;
  }

  /* Writing styles */
  .writing-block {
    margin: 0 auto 2%;
    width: 60%;
  }
</style>
