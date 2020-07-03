<template>
  <article class="project-wrapper">
    <div class="project-images">
      <img v-for="(pic, index) in project.images" :key="index" :src="pic" :alt="project.altText[index]" />
    </div>
    <h3 class="project-title">{{ project.name }}</h3>
    <div class="project-tech">
      <p v-for="(tech, index) in techList" :key="index" class="tech">{{ tech }}</p>
    </div>
    <p class="project-description">{{ project.description }}</p>
    <div class="project-links">
      <a v-if="project.links.demo" :href="project.links.demo" class="demo">Demo</a>
      <a v-if="project.links.site" :href="project.links.site" class="live">Live Site</a>
      <a v-if="project.links.code" :href="project.links.code" class="code">Code</a>
    </div>
  </article>
</template>

<script>
  export default {
    props: {
      project: {
        type: Object,
      },
    },
    computed: {
      techList() {
        return this.project.tech.split(', ');
      },
    },
  };
</script>

<style scoped>
  .project-wrapper {
    display: flex;
    flex-flow: column;
    justify-content: space-between;
    align-items: center;
    width: 32%;
    height: 100%;
    padding: 0.5% 1.5%;
    border-radius: 8px;
    box-shadow: none;
    transition: box-shadow 0.3s, border 0.3s;
  }

  .project-wrapper:hover {
    box-shadow: 0 1px 4px -1px var(--lightPink), 0 2px 5px 0 var(--lightPink), 0 1px 7px 0 var(--lightPink);
  }

  .project-wrapper:hover:nth-child(even) {
    box-shadow: 0 1px 4px -1px var(--lightBlue), 0 2px 5px 0 var(--lightBlue), 0 1px 7px 0 var(--lightBlue);
  }

  .project-images {
    display: flex;
    width: 100%;
    height: 35%;
  }

  .project-images img {
  }

  .project-title {
    color: var(--lightBasic);
    font-size: 1.5rem;
  }

  .project-tech {
    width: 100%;
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    align-items: baseline;
    font-size: 0.7rem;
    text-transform: uppercase;
  }

  .project-tech p {
    color: var(--lightPurple);
    margin: 1% 1.75%;
  }

  .project-tech p:nth-child(2n) {
    color: var(--lightBlue);
  }

  .project-tech p:nth-child(3n) {
    color: var(--lightYellow);
  }

  .project-tech p:nth-child(4n) {
    color: var(--lightPink);
  }

  .project-description {
    margin-top: 1.5%;
    color: var(--lightBasic);
    font-size: 0.9rem;
    width: 100%;
    font-family: var(--sansSerif);
  }

  .project-links {
    width: 100%;
    margin: 1% 0;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .project-links a {
    text-decoration: none;
    border-radius: 5px;
    padding: 0.5% 1.5%;
    margin: 0 3%;
    color: var(--lightBasic);
    transition: color 0.2s ease-in-out, background 0.2s ease-in-out;
  }

  .demo {
    border: 2px solid var(--lightPurple);
  }

  .demo:hover {
    background: var(--lightPurple);
    color: var(--darkBasic);
  }

  .live {
    border: 2px solid var(--lightYellow);
  }

  .live:hover {
    background: var(--lightYellow);
    color: var(--darkBasic);
  }

  .code {
    border: 2px solid var(--lightGreen);
  }

  .code:hover {
    background: var(--lightGreen);
    color: var(--darkBasic);
  }
</style>
