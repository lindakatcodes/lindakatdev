<template>
  <main class="container">
    <h2 class="title">Personal Projects</h2>
    <div class="divider"></div>
    <div class="projects-wrapper">
      <ProjectCard v-for="(project, index) in projects" :key="index" :project="project" class="card"></ProjectCard>
    </div>
  </main>
</template>

<script>
  export default {
    async fetch() {
      this.projects = await this.$content('projects').sortBy('id', 'desc').fetch();
    },
    data() {
      return {
        projects: [],
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

  .projects-wrapper {
    width: 90vw;
    margin: 2% auto;
    padding: 2% 1% 5%;
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(min(350px, 100%), 1fr));
    /* grid-template-rows: repeat(auto-fit, minmax(min(550px, 100%), 1fr)); */
    grid-gap: 20px;
  }

  .card:last-child:nth-child(3n - 2) {
    grid-column: 2;
  }

  @media screen and (max-width: 768px) {
    .container {
      margin-top: 4%;
    }

    .title {
      font-size: 2.15rem;
    }

    .divider {
      width: 70%;
      margin: 1% auto 4%;
    }

    .projects-wrapper {
      grid-row-gap: 0;
      grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
    }

    .card:last-child:nth-child(3n - 2) {
      grid-column: 1;
    }
  }
</style>
