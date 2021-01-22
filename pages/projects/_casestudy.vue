<template>
  <div class="container">
    <div class="header" :style="headerBg">
      <h1 class="title">{{ project.name }}</h1>
      <div class="underline"></div>
    </div>
    <div class="purpose">
      <h2 class="section-title">Purpose: Why This?</h2>
      {{ project.purpose }}
    </div>
    <div class="data">
      <p class="data-text">Built With:</p>
      <div class="tech">
        <p v-for="(tech, index) in techList" :key="index" class="tech-list">{{ tech }}</p>
      </div>
      <p class="data-text">See it in Action:</p>
      <div class="links">
        <a v-if="project.links.demo" :href="project.links.demo" class="demo" target="_blank" rel="noreferrer noopener">Demo</a>
        <a v-if="project.links.code" :href="project.links.code" class="code" target="_blank" rel="noreferrer noopener">Code</a>
        <a v-if="project.links.site" :href="project.links.site" class="live" target="_blank" rel="noreferrer noopener">Live Site</a>
      </div>
    </div>

    <div class="highlight">
      <h2 class="section-title">Highlights: My Favorite Bits</h2>
      {{ project.highlight }}
    </div>
    <div class="support-img-1">
      <img :src="picUrl(project.images[2])" :alt="project.altText[2]" />
    </div>
    <div class="support-img-2">
      <img :src="picUrl(project.images[3])" :alt="project.altText[3]" />
    </div>

    <div class="challenge">
      <h2 class="section-title">Challenges: Struggles While Building</h2>
      {{ project.challenge }}
    </div>
    <div class="lessons">
      <h2 class="section-title">Takeaway: Lessons Learned</h2>
      {{ project.lessons }}
    </div>
    <nuxt-link to="/projects" class="back">← Back to All Projects</nuxt-link>
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
      headerBg() {
        return `background-image: linear-gradient(to top, rgba(37, 50, 55, 1), rgba(37, 50, 55, 0.8) 20%, transparent 50%), url(${this.picUrl(
          this.project.images[1]
        )});`;
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
    grid-template-columns: repeat(auto-fit, minmax(200px, 24%));
    grid-template-rows: repeat(auto-fit, minmax(200px, 30vh));
    grid-template-areas:
      'header header header header'
      'purpose purpose purpose data'
      'highlight highlight support-img-1 support-img-1'
      'support-img-2 support-img-2 challenge challenge'
      'lessons lessons lessons lessons'
      '... back-link back-link ...';
    justify-content: space-around;
    color: var(--lightBasic);
    font-family: var(--sansSerif);
  }

  .header {
    grid-area: header;
    display: flex;
    flex-flow: column;
    justify-content: end;
  }

  .title {
    text-align: center;
    font-size: 2.2rem;
    padding-bottom: 1%;
    font-family: var(--serif);
  }

  .underline {
    width: 100%;
    height: 5px;
    background: var(--lightGradient);
  }

  .purpose,
  .highlight,
  .challenge,
  .lessons {
    margin: 2% 2% 2% 3%;
  }

  .purpose {
    grid-area: purpose;
  }

  .highlight {
    grid-area: highlight;
    padding: 2% 0;
  }

  .challenge {
    grid-area: challenge;
    padding: 2% 0;
  }

  .lessons {
    grid-area: lessons;
  }

  .section-title {
    text-decoration: underline solid var(--lightYellow);
    margin-bottom: 1.5%;
    font-family: var(--serif);
  }

  .data {
    grid-area: data;
    display: flex;
    flex-flow: column;
    justify-content: center;
    font-family: var(--serif);
  }

  .tech,
  .links {
    display: flex;
    justify-content: center;
    margin: 1% 0 6%;
  }

  .data-text {
    text-transform: uppercase;
    font-weight: 700;
    text-align: center;
  }

  .tech-list {
    text-transform: uppercase;
    font-weight: 600;
    letter-spacing: 0.75px;
    color: var(--lightPurple);
    margin: 1% 1.75%;
  }

  .tech-list:nth-child(2n) {
    color: var(--lightBlue);
  }

  .tech-list:nth-child(3n) {
    color: var(--lightYellow);
  }

  .tech-list:nth-child(4n) {
    color: var(--lightPink);
  }

  .links a {
    font-size: 1.05rem;
    border-radius: 5px;
    padding: 1% 2.5%;
    margin: 1% 2%;
    font-weight: 700;
    transition: color 0.2s ease-in-out, background 0.2s ease-in-out;
  }

  .demo {
    color: var(--lightPurple);
    text-decoration: underline solid var(--lightPurple);
  }

  .demo:hover {
    background: var(--lightPurple);
    color: var(--darkBasic);
  }

  .code {
    color: var(--lightYellow);
    text-decoration: underline solid var(--lightYellow);
  }

  .code:hover {
    background: var(--lightYellow);
    color: var(--darkBasic);
  }

  .live {
    color: var(--lightGreen);
    text-decoration: underline solid var(--lightGreen);
  }

  .live:hover {
    background: var(--lightGreen);
    color: var(--darkBasic);
  }

  .support-img-1 {
    grid-area: support-img-1;
  }

  .support-img-2 {
    grid-area: support-img-2;
  }

  .support-img-1 img,
  .support-img-2 img {
    width: 100%;
    height: auto;
    /* display: block; */
    object-fit: contain;
    /* align-self: center; */
  }

  .back {
    grid-area: back-link;
    text-align: center;
    margin: 1%;
    font-size: 1.2rem;
    font-weight: bold;
    color: var(--lightBlue);
    text-decoration: none;
    transition: text-decoration 0.3s;
  }

  .back:hover {
    text-decoration: underline double var(--lightPink);
  }
</style>
