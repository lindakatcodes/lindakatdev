<template>
  <article class="project-wrapper">
    <div class="project-images" :class="{ extraPic: project.type === 'extra' }">
      <img :src="picUrl(project.images)" :alt="project.altText" @click="enlargeImg()" />
    </div>
    <h3 class="project-title" :class="{ extraTitle: project.type === 'extra' }">{{ project.name }}</h3>
    <div class="project-tech">
      <p v-for="(tech, index) in techList" :key="index" class="tech">{{ tech }}</p>
    </div>
    <p v-if="project.type === 'key'" class="project-description">{{ project.description }}</p>
    <div class="project-links">
      <a v-if="project.links.demo" :href="project.links.demo" class="demo" target="_blank" rel="noreferrer noopener">Demo</a>
      <a v-if="project.links.code" :href="project.links.code" class="code" target="_blank" rel="noreferrer noopener">Code</a>
      <a v-if="project.links.site" :href="project.links.site" class="live" target="_blank" rel="noreferrer noopener">Live Site</a>
    </div>
    <ImgModal :picsrc="picUrl(project.images)" :class="[isOpen]" @close-image="shrinkImg()"></ImgModal>
  </article>
</template>

<script>
  export default {
    props: {
      project: {
        type: Object,
      },
    },
    data() {
      return {
        isOpen: '',
      };
    },
    computed: {
      techList() {
        return this.project.tech.split(', ');
      },
    },
    methods: {
      picUrl(pic) {
        if (this.$route.path.includes('/garden')) {
          // eslint-disable-next-line global-require, import/no-dynamic-require
          return require(`@/assets/images/playground/${pic}.png`);
        }
        // eslint-disable-next-line global-require, import/no-dynamic-require
        return require(`@/assets/images/projects/${pic}.png`);
      },
      enlargeImg() {
        console.log('open modal');
        this.isOpen = 'open';
      },
      shrinkImg() {
        console.log('close modal');
        this.isOpen = '';
      },
    },
  };
</script>

<style scoped>
  .project-wrapper {
    display: flex;
    flex-flow: column;
    justify-content: flex-start;
    align-items: center;
    width: 98%;
    padding: 1% 1.5% 2%;
    border-radius: 8px;
    box-shadow: none;
    transition: box-shadow 0.3s, border 0.3s;
  }

  .project-wrapper:hover {
    box-shadow: 0 1px 4px -1px hsla(195, 20%, 96%, 0.35), 0 2px 5px 0 hsla(195, 20%, 96%, 0.35), 0 1px 7px 0 hsla(195, 20%, 96%, 0.35);
  }

  .project-images {
    width: 100%;
    height: 17vw;
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

  .extraPic {
    height: 12vw;
  }

  /* .multiPic {
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
    width: 27vw;
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
  } */

  .project-title {
    color: var(--lightBasic);
    font-size: 1.4rem;
    text-align: center;
    margin: 0.5% 0 1.5%;
  }

  .extraTitle {
    font-size: 1.15rem;
    height: 20%;
  }

  .project-tech {
    width: 100%;
    height: 10%;
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
    height: 25%;
    font-family: var(--sansSerif);
    line-height: 1.1rem;
  }

  .project-links {
    width: 100%;
    margin: 2% 0;
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    align-items: flex-end;
  }

  .project-links a {
    text-decoration: none;
    border-radius: 5px;
    padding: 1% 2.5%;
    margin: 3%;
    font-weight: 700;
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

  .code {
    border: 2px solid var(--lightYellow);
  }

  .code:hover {
    background: var(--lightYellow);
    color: var(--darkBasic);
  }

  .live {
    border: 2px solid var(--lightGreen);
  }

  .live:hover {
    background: var(--lightGreen);
    color: var(--darkBasic);
  }

  @media screen and (max-width: 768px) {
    .project-wrapper {
      width: 95%;
      padding: 5% 1.5%;
      border-bottom: 1px solid var(--lightBasic);
      border-radius: 0;
      margin-top: 3%;
    }

    .project-images {
      height: 50vw;
    }

    /* .multiPic {
      flex-direction: column;
      flex-wrap: wrap;
      justify-content: center;
    }

    .multiPic img {
      width: 85vw;
    } */

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
