<template>
  <div class="container">
    <img :src="picUrl(project.images[1])" class="header-img" />
    <h2 class="name">{{ project.name }}</h2>
    <p class="intro">
      {{ project.intro }}
    </p>
    <p class="purpose">
      {{ project.purpose }}
    </p>
    <div class="tech">
      <p class="tech-text">Built With:</p>
      <p v-for="(tech, index) in techList" :key="index" class="tech">{{ tech }}</p>
    </div>
    <div class="links">
      <a v-if="project.links.demo" :href="project.links.demo" class="demo" target="_blank" rel="noreferrer noopener">Demo</a>
      <a v-if="project.links.code" :href="project.links.code" class="code" target="_blank" rel="noreferrer noopener">Code</a>
      <a v-if="project.links.site" :href="project.links.site" class="live" target="_blank" rel="noreferrer noopener">Live Site</a>
    </div>
    <p class="highlight">
      {{ project.highlight }}
    </p>
    <img :src="picUrl(project.images[2])" class="support-img-1" />
    <img :src="picUrl(project.images[3])" class="support-img-2" />
    <p class="challenge">
      {{ project.challenge }}
    </p>
    <p class="lessons">
      {{ project.lessons }}
    </p>
    <nuxt-link to="/projects" class="back">View All Projects</nuxt-link>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        project: this.$route.params.projectObj,
      };
    },
    computed: {
      techList() {
        return this.project.tech.split(', ');
      },
    },
    methods: {
      picUrl(pic) {
        // eslint-disable-next-line global-require, import/no-dynamic-require
        return require(`@/assets/images/projects/${pic}.png`);
      },
    },
  };
</script>

<style scoped>
  .container {
    display: grid;
    grid-template-columns: 50vw 50vw;
    grid-template-rows: auto;
    grid-template-areas:
      'header-img header-img'
      'name name'
      'intro purpose'
      'tech links'
      'highlight support-img-1'
      'support-img-2 challenge'
      'lessons lessons'
      'back-link back-link';
    gap: 1% 3%;
  }

  img {
    object-fit: contain;
  }
</style>
