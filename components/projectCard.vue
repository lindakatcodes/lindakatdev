<template>
  <article class="project-wrapper">
    <div class="project-images" :class="{ multiPic: project.multiPicType }">
      <img v-for="(pic, index) in project.images" :key="index" :src="picUrl(pic)" :alt="project.altText[index]" />
    </div>
    <h3 class="project-title">{{ project.name }}</h3>
    <div class="project-tech">
      <p v-for="(tech, index) in techList" :key="index" class="tech">{{ tech }}</p>
    </div>
    <p class="project-description">{{ project.description }}</p>
    <div class="project-links">
      <a v-if="project.links.demo" :href="project.links.demo" class="demo" target="_blank" rel="noreferrer noopener">Demo</a>
      <a v-if="project.links.site" :href="project.links.site" class="live" target="_blank" rel="noreferrer noopener">Live Site</a>
      <a v-if="project.links.code" :href="project.links.code" class="code" target="_blank" rel="noreferrer noopener">Code</a>
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
    methods: {
      picUrl(pic) {
        if (this.$route.path.includes('/school')) {
          // eslint-disable-next-line global-require, import/no-dynamic-require
          return require(`@/assets/images/playground/${pic}.png`);
        }
        // eslint-disable-next-line global-require, import/no-dynamic-require
        return require(`@/assets/images/projects/${pic}.png`);
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
    width: 98%;
    padding: 1% 1.5%;
    border-radius: 8px;
    box-shadow: none;
    transition: box-shadow 0.3s, border 0.3s;
  }

  .project-wrapper:hover {
    box-shadow: 0 1px 4px -1px hsla(195, 20%, 96%, 0.35), 0 2px 5px 0 hsla(195, 20%, 96%, 0.35), 0 1px 7px 0 hsla(195, 20%, 96%, 0.35);
  }

  .project-images {
    width: 100%;
    height: 20vw;
    display: flex;
    justify-content: center;
  }

  .project-images img {
    width: auto;
    height: 100%;
    object-fit: contain;
    object-position: center top;
    overflow: hidden;
  }

  .multiPic {
    justify-content: flex-start;
    overflow-x: auto;
    scroll-snap-type: x mandatory;
    scroll-behavior: smooth;
    -webkit-overflow-scrolling: touch;
    scrollbar-color: var(--lightBasic) var(--darkBasic);
    scrollbar-width: thin;
  }

  .multiPic::-webkit-scrollbar {
    width: 2px;
  }

  .multiPic::-webkit-scrollbar-track {
    background: var(--darkBasic);
  }

  .multiPic::-webkit-scrollbar-thumb {
    background-color: var(--lightBasic);
  }

  .multiPic img {
    width: 30vw;
    flex-shrink: 0;
    transform-origin: center center;
    transform: scale(1);
    transition: transform 0.5s;
    position: relative;
    margin-left: 0;
    margin-right: 3%;
  }

  .multiPic img:nth-last-child() {
    margin-left: 3%;
    margin-right: 0;
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
    align-items: center;
    font-size: 0.7rem;
    text-transform: uppercase;
    font-family: var(--sansSerif);
    font-weight: 600;
    letter-spacing: 0.75px;
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
    margin-top: 1%;
    padding-left: 2%;
    color: var(--lightBasic);
    font-size: 0.8rem;
    width: 100%;
    font-family: var(--sansSerif);
    letter-spacing: 0.5px;
    font-weight: 300;
    line-height: 1rem;
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
    padding: 0 2% 1%;
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

  @media screen and (max-width: 768px) {
    .project-wrapper {
      width: 95%;
      padding: 5% 1.5%;
      border-bottom: 1px solid var(--lightBasic);
      border-radius: 0;
      margin-top: 7%;
    }

    .project-images {
      height: 50vw;
      flex-direction: column;
      flex-wrap: wrap;
    }

    .multiPic {
      justify-content: center;
    }

    .multiPic img {
      width: 85vw;
    }

    .project-title {
      margin-top: 2%;
      font-size: 1.65rem;
      text-align: center;
    }

    .project-tech {
      font-size: 0.85rem;
    }

    .project-description {
      font-size: 0.875rem;
      padding-bottom: 2%;
    }
  }
</style>
