<template>
  <main class="container">
    <section class="intro">
      <h1 class="intro-name">Linda Thompson</h1>
      <p class="intro-subtitle">
        A friendly and analytical web developer
        <br />
        building with design, data, and details in mind
      </p>
      <hr class="intro-divider" />
      <div class="intro-icons">
        <a href="https://github.com/lindakatcodes" target="_blank" rel="noreferrer noopener" tooltip="GitHub">
          <img src="~assets/icons/github-square.svg" alt="GitHub icon" class="gh-icon" />
        </a>
        <a href="https://twitter.com/lindakatcodes" target="_blank" rel="noreferrer noopener" tooltip="Twitter">
          <img src="~assets/icons/twitter-square.svg" alt="Twitter icon" class="tw-icon" />
        </a>
      </div>
    </section>
    <section class="featured-projects">
      <h2 class="section-title">Featured Projects</h2>
      <div class="title-divider"></div>
      <div class="project-block">
        <ProjectCard v-for="(project, index) in projects" :key="index" :project="project" class="card"></ProjectCard>
      </div>
      <div class="section-link-to-all">
        <nuxt-link to="/projects">See All Projects</nuxt-link>
      </div>
    </section>
    <section class="recent-writing">
      <h2 class="section-title">Featured Writings</h2>
      <div class="title-divider"></div>
      <div class="writing-block">
        <BlogPostBlurb v-for="(post, index) in blogposts" :key="index" :post-blurb="post"></BlogPostBlurb>
      </div>
      <div class="section-link-to-all">
        <nuxt-link to="/writing">See All Posts</nuxt-link>
      </div>
    </section>
  </main>
</template>

<script>
  export default {
    async fetch() {
      this.projects = await this.$content('projects').where({ featured: true }).sortBy('id', 'desc').fetch();
      this.blogposts = await this.$content('blog')
        .only(['title', 'blurb', 'tags', 'slug'])
        .where({
          type: { $eq: 'live' },
          featured: true,
        })
        .sortBy('createdAt', 'desc')
        .limit(8)
        .fetch();
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
    width: 80%;
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
    width: 32%;
    margin-top: 2%;
  }

  .intro-icons {
    width: 25%;
    display: flex;
    justify-content: center;
    align-items: center;
    margin-top: 2%;
  }

  .intro-icons a {
    width: 35%;
  }

  .intro-icons img {
    width: 100%;
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
    margin: 0 auto;
    text-align: center;
  }

  .section-link-to-all a {
    background: var(--lightGradient);
    background-clip: text;
    -webkit-text-fill-color: transparent;
    text-decoration: solid underline var(--lightBasic);
    font-size: 1.4rem;
    transition: text-decoration 0.3s;
  }

  .section-link-to-all a:hover {
    text-decoration-color: var(--lightPink);
    text-decoration-style: double;
  }

  /* Project styles */
  .project-block {
    /* height: 78vh; */
    width: 90%;
    margin: 0 auto 2%;
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(min(350px, 100%), 1fr));
    grid-gap: 2%;
  }

  /* Writing styles */
  .writing-block {
    margin: 0 auto 2%;
    width: 60%;
  }

  @media screen and (max-width: 768px) {
    .intro-name {
      font-size: 3.5rem;
      text-align: center;
      line-height: 3.5rem;
    }

    .intro-subtitle {
      margin-top: 5%;
      width: 93%;
    }

    .intro-divider {
      width: 67%;
      margin-top: 5%;
    }

    .intro-icons {
      width: 75%;
    }

    section {
      margin-bottom: 4.5%;
    }

    .section-title {
      font-size: 2rem;
    }

    .title-divider {
      width: 65%;
      margin: 2% auto 4%;
    }

    .section-link-to-all {
      font-size: 1.2rem;
      left: 29%;
    }

    .project-block {
      grid-row-gap: 0;
      margin-bottom: 3.5%;
      grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
    }

    .card:last-child {
      border-bottom: none;
    }

    .writing-block {
      width: 90%;
    }
  }

  @media screen and (min-width: 769px) and (max-width: 1200px) {
    .intro-icons {
      width: 35%;
    }

    .intro-divider {
      width: 48%;
    }
  }
</style>
