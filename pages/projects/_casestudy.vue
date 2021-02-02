<template>
  <div class="container">
    <div class="header">
      <h1 class="title">{{ project.name }}</h1>
      <div class="underline"></div>
    </div>
    <div class="main-img">
      <img :src="picUrl(project.images[0])" :alt="project.altText[0]" @click="enlargeImg(0)" />
    </div>
    <div class="details">
      <div class="purpose">
        <h2 class="section-title">Purpose: Why This?</h2>
        <p>{{ project.purpose }}</p>
      </div>
      <div class="data">
        <p class="data-text tech-text">Built With:</p>
        <div class="tech">
          <p v-for="(tech, index) in techList" :key="index" class="tech-list">{{ tech }}</p>
        </div>
        <p class="data-text link-text">See it in Action:</p>
        <div class="section-divider"></div>
        <div class="links">
          <a v-if="project.links.demo" :href="project.links.demo" class="demo" target="_blank" rel="noreferrer noopener">Demo</a>
          <a v-if="project.links.code" :href="project.links.code" class="code" target="_blank" rel="noreferrer noopener">Code</a>
          <a v-if="project.links.site" :href="project.links.site" class="live" target="_blank" rel="noreferrer noopener">Live Site</a>
        </div>
      </div>
    </div>
    <div class="highlight">
      <h2 class="section-title">Highlights: My Favorite Bits</h2>
      <ul class="list">
        <li v-for="(value, index) in project.highlight" :key="index" class="full-item">{{ value }}</li>
      </ul>
    </div>
    <div class="support-img-1">
      <img :src="picUrl(project.images[1])" :alt="project.altText[1]" @click="enlargeImg(1)" />
    </div>
    <div class="support-img-2">
      <img :src="picUrl(project.images[2])" :alt="project.altText[2]" @click="enlargeImg(2)" />
    </div>

    <div class="challenge">
      <h2 class="section-title">Challenges: Struggles While Building</h2>
      <ul class="list">
        <li v-for="(value, index) in project.challenge" :key="index" class="full-item">{{ value }}</li>
      </ul>
    </div>
    <div class="lessons">
      <h2 class="section-title">Takeaway: Lessons Learned</h2>
      <p>{{ project.lessons.intro }}</p>
      <div v-if="project.lessons.takeaways">
        <h3 class="subsection-title">During the building process, the biggest takeaways for me were:</h3>
        <ul class="list">
          <li v-for="(value, index) in project.lessons.takeaways" :key="index" class="short-item">{{ value }}</li>
        </ul>
      </div>
      <div v-if="project.lessons.improvements">
        <h3 class="subsection-title">A few things I'd like to improve in this project:</h3>
        <ul class="list">
          <li v-for="(value, index) in project.lessons.improvements" :key="index" class="short-item">{{ value }}</li>
        </ul>
      </div>
    </div>
    <nuxt-link to="/projects" class="back">← Back to All Projects</nuxt-link>
    <ImgModal :picsrc="picUrl(project.images[0])" :class="[isOpen0]" @close-image="shrinkImg(0)"></ImgModal>
    <ImgModal :picsrc="picUrl(project.images[1])" :class="[isOpen1]" @close-image="shrinkImg(1)"></ImgModal>
    <ImgModal :picsrc="picUrl(project.images[2])" :class="[isOpen2]" @close-image="shrinkImg(2)"></ImgModal>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        project: this.$route.params.projectObj,
        isOpen0: '',
        isOpen1: '',
        isOpen2: '',
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
      enlargeImg(num) {
        console.log('open modal');
        const picClass = `isOpen${num}`;
        this[picClass] = 'open';
      },
      shrinkImg(num) {
        console.log('close modal');
        const picClass = `isOpen${num}`;
        this[picClass] = '';
      },
    },
  };
</script>

<style scoped>
  .container {
    display: grid;
    grid-template-columns: repeat(auto-fit, 24%);
    /* grid-template-rows: 15%, 45%, 45%, 45%, 45%, 15%; */
    grid-template-areas:
      'header header header header'
      'main-img main-img details details'
      'highlight highlight support-img-1 support-img-1'
      'support-img-2 support-img-2 challenge challenge'
      'lessons lessons lessons lessons'
      '... back-link back-link ...';
    justify-content: space-between;
    align-items: center;
    grid-row-gap: 50px;
    color: var(--lightBasic);
    font-family: var(--sansSerif);
  }

  .header {
    grid-area: header;
    align-self: start;
    display: flex;
    flex-flow: column;
    justify-content: flex-end;
    background-image: linear-gradient(to top, rgba(37, 50, 55, 0.9), rgba(37, 50, 55, 0.7) 40%, rgba(37, 50, 55, 0.6) 45%, transparent 55%),
      var(--lightGradient);
    height: 20vh;
  }

  .title {
    text-align: center;
    font-size: 2.2rem;
    padding-bottom: 0.5%;
    font-family: var(--serif);
  }

  .underline {
    width: 100%;
    height: 5px;
    background: var(--lightGradient);
  }

  .details,
  .highlight,
  .challenge,
  .lessons {
    margin: 1% 4%;
  }

  .highlight {
    grid-area: highlight;
  }

  .challenge {
    grid-area: challenge;
  }

  .lessons {
    grid-area: lessons;
    padding: 0 6%;
  }

  .details {
    grid-area: details;
    display: flex;
    flex-flow: column;
    justify-content: center;
  }

  .data {
    display: grid;
    grid-template-columns: 1fr 0.1fr 1fr;
    grid-template-rows: 0.5fr 0.5fr;
    grid-template-areas:
      'tech-text divider link-text'
      'tech-names divider link-names';
    align-items: center;
    font-family: var(--serif);
    margin-top: 3%;
  }

  .tech,
  .links {
    display: flex;
    justify-content: center;
    flex-wrap: wrap;
  }

  .section-divider {
    grid-area: divider;
    justify-self: center;
    width: 3px;
    height: 100%;
    background: var(--lightGradient);
  }

  .data-text {
    text-transform: uppercase;
    font-weight: 700;
    text-align: center;
    font-size: 1.1rem;
    margin-bottom: 0;
  }

  .tech-text {
    grid-area: tech-text;
  }

  .link-text {
    grid-area: link-text;
  }

  .tech-list {
    grid-area: tech-names;
    text-transform: uppercase;
    font-weight: 600;
    letter-spacing: 0.75px;
    color: var(--lightPurple);
    margin: 1% 1.75%;
    font-size: 0.9rem;
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

  .links {
    grid-area: link-names;
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

  .main-img {
    grid-area: main-img;
  }

  .support-img-1 {
    grid-area: support-img-1;
  }

  .support-img-2 {
    grid-area: support-img-2;
  }

  .main-img,
  .support-img-1,
  .support-img-2 {
    width: 100%;
  }

  .main-img img,
  .support-img-1 img,
  .support-img-2 img {
    width: 96%;
    height: auto;
    object-fit: contain;
    margin: 2%;
    border: 2px inset var(--lightBasic);
    border-radius: 3px;
  }

  .section-title {
    text-decoration: underline solid var(--lightBasic);
    margin-bottom: 1.5%;
    font-family: var(--serif);
    font-size: 1.5rem;
  }

  .purpose .section-title {
    color: var(--lightPurple);
  }

  .highlight .section-title {
    color: var(--lightYellow);
  }

  .challenge .section-title {
    color: var(--lightBlue);
  }

  .lessons .section-title {
    color: var(--lightPink);
  }

  .subsection-title {
    font-weight: bold;
    font-size: 1.1rem;
    margin-bottom: 1.5%;
    color: var(--lightGreen);
  }

  p {
    margin-bottom: 2%;
    line-height: 1.5;
    padding: 0 2%;
  }

  .list {
    list-style-type: none;
    padding-left: 3%;
    margin-bottom: 2%;
    line-height: 1.5;
  }

  .list li {
    text-indent: -2.5%;
  }

  .list .full-item {
    margin-bottom: 2%;
  }

  .list .short-item {
    margin-bottom: 0.5%;
  }

  .list li::before {
    content: '»';
    margin: 0 0.25rem;
    font-size: 1.2rem;
    font-weight: bold;
    color: var(--lightPurple);
  }

  .list li:nth-child(2n)::before {
    color: var(--lightYellow);
  }

  .list li:nth-child(3n)::before {
    color: var(--lightBlue);
  }

  .list li:nth-child(4n)::before {
    color: var(--lightPink);
  }

  .back {
    grid-area: back-link;
    text-align: center;
    margin: 2% 0 4%;
    font-size: 1.2rem;
    font-weight: bold;
    color: var(--lightBlue);
    text-decoration: none;
    transition: text-decoration 0.3s;
  }

  .back:hover {
    text-decoration: underline double var(--lightPink);
  }

  @media screen and (max-width: 768px) {
    .container {
      grid-template-columns: 1fr;
      grid-template-areas:
        'header'
        'details'
        'main-img'
        'highlight'
        'support-img-1'
        'challenge'
        'support-img-2'
        'lessons'
        'back-link';
      grid-row-gap: 40px;
    }

    .header {
      background-image: none;
    }

    .lessons {
      padding: 0;
    }

    .data {
      grid-template-columns: 1fr;
      grid-template-rows: 1fr 1fr 0.2fr 1fr 1fr;
      grid-template-areas:
        'tech-text'
        'tech-names'
        'divider'
        'link-text'
        'link-names';
    }

    .links {
      align-self: start;
    }

    .links a {
      font-size: 1rem;
      margin: 0;
    }

    .section-divider {
      width: 60%;
      height: 3px;
      margin: 2% 0;
    }

    .section-title {
      font-size: 1.4rem;
      margin-bottom: 3.5%;
    }

    .subsection-title {
      line-height: 1.5;
      margin-bottom: 3%;
    }

    p {
      padding: 0;
      margin-bottom: 3%;
    }

    .list {
      padding-left: 1.5%;
    }

    .list .full-item,
    .list .short-item {
      margin-bottom: 4%;
    }

    .list li::before {
      margin: 0 0.5rem 0 0.25rem;
    }

    .back {
      font-size: 1.1rem;
      margin: 1% 0 6%;
    }
  }

  @media screen and (min-width: 769px) and (max-width: 1200px) {
    .container {
      grid-template-columns: 1fr;
      grid-template-areas:
        'header'
        'details'
        'main-img'
        'highlight'
        'support-img-1'
        'challenge'
        'support-img-2'
        'lessons'
        'back-link';
      grid-row-gap: 40px;
    }

    .main-img,
    .support-img-1,
    .support-img-2 {
      justify-self: center;
      width: 75%;
    }
  }

  @media screen and (min-width: 2000px) {
    .container {
      grid-template-areas:
        'header header header header'
        'main-img main-img details details'
        'highlight highlight support-img-1 support-img-1'
        'support-img-2 support-img-2 challenge challenge'
        '... lessons lessons ...'
        '... back-link back-link ...';
    }
  }
</style>
