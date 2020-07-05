<template>
  <div class="container">
    <section class="intro">
      <h1 class="intro-name">Linda Thompson</h1>
      <p class="intro-subtitle">
        Lover of all things JavaScript • Data • Design
      </p>
      <hr class="intro-divider" />
      <div class="intro-icons">
        <a href="https://github.com/lindakatcodes" target="_blank" rel="noreferrer" tooltip="GitHub">
          <img src="~assets/icons/github-square.svg" alt="Link to Linda's GitHub page" class="gh-icon" />
        </a>
        <a href="https://twitter.com/lindakatcodes" target="_blank" rel="noreferrer" tooltip="Twitter">
          <img src="~assets/icons/twitter-square.svg" alt="Link to Linda's Twitter account" class="tw-icon" />
        </a>
      </div>
    </section>
    <section class="featured-projects">
      <h2 class="section-title">Featured Projects</h2>
      <div class="title-divider"></div>
      <div class="project-block">
        <ProjectCard v-for="(project, index) in projects" :key="index" :project="project" :img-src="project.images"></ProjectCard>
      </div>
      <nuxt-link to="/projects.vue" class="section-link-to-all">See All Projects</nuxt-link>
    </section>
  </div>
</template>

<script>
  export default {
    async fetch() {
      this.projects = await this.$content('projects').where({ featured: true }).fetch();
    },
    data() {
      return {
        projects: [],
      };
    },
  };
</script>

<style>
  .container {
    margin: 0 auto;
    min-height: 100vh;
    max-width: 100vw;
  }

  /* Intro section styles */

  .intro {
    width: 100%;
    height: 80vh;
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
    width: 30%;
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
    border-bottom: 3px solid var(--lightBasic);
    margin: 2% 0;
    position: relative;
  }

  .section-title {
    text-align: center;
    font-family: var(--sansSerif);
    color: var(--lightBasic);
    font-size: 2.5rem;
  }

  .title-divider {
    height: 4px;
    width: 25%;
    background: var(--lightGradient);
    margin: 0.25% auto 1%;
  }

  .section-link-to-all {
    background: var(--lightGradient);
    background-clip: text;
    -webkit-text-fill-color: transparent;
    text-decoration: 2px solid underline var(--lightBasic);
    font-size: 1.2rem;
    position: relative;
    left: 82%;
    transition: font-size 0.25s ease-out;
  }

  .section-link-to-all:hover {
    font-size: 1.25rem;
  }

  /* Project styles */
  .project-block {
    height: 70vh;
    display: flex;
    flex-wrap: nowrap;
    justify-content: space-around;
    align-items: center;
    margin-bottom: 2%;
  }
</style>
