<template>
  <main class="container">
    <div class="page-header">
      <h2 class="page-title">Hi there - nice to meet you!</h2>
      <div class="title-divider"></div>
    </div>
    <img src="~assets/images/profile/me.jpg" alt="Woman with brown hair, brown eyes, and a winning smile." class="photo" />
    <section class="info benefits">
      <h3 class="section-title">A Few Key Details About Me:</h3>
      <div class="title-divider about-div"></div>
      <div class="section-details">
        <ul class="list">
          <li class="item">
            I'm resilient. The process of learning, applying, and improving is a common theme in my life. Frustration & stubbornness can sometimes
            hold me back, but I've learned the skill of knowing when to change tactics, when to take a break, & when to keep pushing. Nothing gets in
            my way if I want it bad enough.
          </li>
          <li class="item">
            I'm perceptive. It's relatively easy for me to pick up on where others are coming from, be it figuring out what a customer's trying to
            explain, or knowing when my co-workers need to vent so everyone can move forward. While I don't enjoy tense situations, navigating them
            and striving to meet people where they are & understand them comes naturally to me.
          </li>
          <li class="item">
            I'm analytical. I love organizing & digging into details. I'll catch proofreading mistakes that others miss. Tracking jobs, maintaining
            spreadsheets, and puzzling out discrepancies & bugs is my JAM.
          </li>
          <li class="item">
            I'm creative. One of my favorite parts of my career is getting to bring ideas to life. No matter the scale, being able to see something
            take shape & go out into the world is such a joy.
          </li>
        </ul>
      </div>
    </section>
    <section class="info goals">
      <h3 class="section-title">Professional Goals</h3>
      <div class="title-divider about-div"></div>
      <div class="section-details">
        <p><strong>I'm searching for my first developer job!</strong></p>

        <p>
          My favorite language is JavaScript - it's my first coding love, really. I'm fairly proficient with HTML and CSS too. I'm typically drawn to
          projects where I'm making data easier to view or track, though I can be distracted playing with the design quite often. I prefer VS Code as
          my editor of choice, & can navigate Git (most of the time).
        </p>

        <p>
          I'd really love to work on location (looking to relocate!), where I can be truly immersed in programming and be able to learn and grow with
          my teammates - though I'd happily work remotely as well. I'm searching for a place with mentorship, where everyone is free to ask questions
          and can communicate openly when things are stressful. I really want to learn & grow as a developer in all the best ways - making things
          accessible to as many folks as possible, building projects that look nice and are easy to read and maintain, and being somewhere that's just
          plain FUN to be. If what I work on can benefit the world, no matter how big or small the impact, it would be the icing on the cake.
        </p>

        <p>I'm not looking to be the best - just continuously better than I am at this moment.</p>
      </div>
    </section>
    <section class="info learning">
      <h3 class="section-title">Currently Learning</h3>
      <div class="title-divider about-div"></div>
      <div class="section-details">
        <p>
          Right now....I'm between things! I've been building out this site and my most recent project in Vue, which has been a lot of fun! Thinking
          I'll get into some React next, but I haven't decided exactly what yet. Absolutely plan on digging back into some JavaScript basics again as
          well, really cement some knowledge on a few things that have gotten me stuck while working with Vue. I'll update here once I decide on a
          specific plan!
        </p>
      </div>
    </section>
    <div class="certificates">
      <figure v-for="(cert, index) in certificates" :key="index" class="cert-figure">
        <a :href="cert.link" class="cert-link">
          <img :src="picUrl(cert.img)" :alt="cert.altText" class="cert-pic" />
        </a>
        <figcaption class="cert-caption">{{ cert.class }}</figcaption>
      </figure>
    </div>
  </main>
</template>

<script>
  export default {
    async fetch() {
      this.certificates = await this.$content('certificates').sortBy('completion_id', 'desc').fetch();
    },
    data() {
      return {
        certificates: [],
      };
    },
    methods: {
      picUrl(pic) {
        // eslint-disable-next-line global-require, import/no-dynamic-require
        return require(`@/assets/images/certificates/${pic}.png`);
      },
    },
  };
</script>

<style scoped>
  .container {
    position: relative;
    display: grid;
    grid-template-areas:
      'title title title title'
      'image benefits benefits benefits'
      'goals goals learning learning'
      'certs certs certs certs';
    grid-template-columns: 1fr 1fr 1fr 1fr;
    grid-template-rows: 10% 0.75fr 1fr 30%;
    gap: 1% 2%;
    justify-content: space-around;
    align-content: center;
    padding: 1% 2%;
    width: 92%;
    margin: 25px auto;
    /* border: 2px solid purple; */
  }

  .page-header {
    grid-area: title;
    /* border: 2px solid green; */
  }

  .page-title {
    text-align: center;
    font-family: var(--serif);
    color: var(--lightBasic);
    font-size: 2.75rem;
  }

  .title-divider {
    height: 4px;
    width: 39%;
    background: var(--lightGradient);
    margin: 0.25% auto 2%;
  }

  .about-div {
    width: 40%;
  }

  .photo {
    grid-area: image;
    justify-self: center;
    align-self: start;
    width: 100%;
    height: 85%;
    border-radius: 10%;
    border: 2px solid var(--lightYellow);
    object-fit: cover;
    object-position: right top;
  }

  .section-title {
    text-align: center;
    font-family: var(--serif);
    color: var(--lightBasic);
    font-size: 2.15rem;
  }

  .section-details {
    padding: 1% 3% 2% 4%;
    color: var(--lightBasic);
    font-family: var(--sansSerif);
    line-height: 1.35rem;
  }

  .section-details p {
    margin-bottom: 2%;
  }

  .list {
    list-style-type: none;
    padding-left: 3%;
    width: 96%;
  }

  .list li {
    text-indent: -4.5%;
  }

  .list li::before {
    content: '»';
    margin: 0 0.25rem;
  }

  .benefits {
    grid-area: benefits;
    /* border: 2px solid red; */
  }

  .goals {
    grid-area: goals;
    /* border: 2px solid blue; */
  }

  .learning {
    grid-area: learning;
    /* border: 2px solid white; */
  }

  .certificates {
    grid-area: certs;
    /* border: 2px solid brown; */
    display: flex;
    justify-content: space-around;
    width: 100%;
  }

  .cert-figure {
    width: 20vw;
    height: 33vh;
    margin: 1%;
    border: 3px ridge var(--lightPurple);
  }

  .cert-pic {
    width: 100%;
    height: 75%;
    object-fit: cover;
    object-position: center center;
    overflow: hidden;
    border-bottom: 4px solid var(--lightPurple);
  }

  .cert-figure:nth-child(2n) {
    border: 3px ridge var(--lightBlue);
  }

  .cert-figure:nth-child(2n) .cert-pic {
    border-bottom: 4px solid var(--lightBlue);
  }

  .cert-figure:nth-child(3n) {
    border: 3px ridge var(--lightYellow);
  }

  .cert-figure:nth-child(3n) .cert-pic {
    border-bottom: 4px solid var(--lightYellow);
  }

  .cert-figure:nth-child(4n) {
    border: 3px ridge var(--lightPink);
  }

  .cert-figure:nth-child(4n) .cert-pic {
    border-bottom: 4px solid var(--lightPink);
  }

  .cert-caption {
    /* border: 2px solid white; */
    color: var(--lightBasic);
    font-size: 0.8rem;
    text-transform: uppercase;
    font-family: var(--sansSerif);
    letter-spacing: 0.75px;
    font-weight: 700;
    display: flex;
    justify-content: center;
    align-items: center;
    text-align: center;
    height: 22%;
    padding: 0 2%;
  }

  @media screen and (max-width: 1200px) {
    .container {
      grid-template-areas:
        'title'
        'image'
        'benefits'
        'goals'
        'learning'
        'certs';
      grid-template-columns: 1fr;
      grid-template-rows: auto;
      gap: 0.35%;
      margin: calc(50px + 2%) 0 0 0;
      width: 100%;
    }
  }

  @media screen and (max-width: 768px) {
    .page-title {
      font-size: 2.3rem;
      padding: 0 1.5%;
    }

    .title-divider {
      width: 64%;
      margin-top: 2%;
    }

    .about-div {
      width: 58%;
    }

    .photo {
      width: 90%;
      height: 90%;
    }

    .section-title {
      font-size: 1.85rem;
      margin-bottom: 3%;
    }

    .section-details p {
      margin-bottom: 4%;
    }

    .list li {
      margin-bottom: 4%;
    }

    .certificates {
      flex-flow: wrap;
      margin: 0 auto 10%;
    }

    .cert-figure {
      width: 44vw;
      height: 55vw;
      margin: 2%;
    }

    .cert-pic {
      height: 60%;
    }

    .cert-caption {
      padding: 4% 3% 2%;
      height: 31%;
    }
  }

  @media screen and (min-width: 769px) and (max-width: 1200px) {
    .title-divider {
      width: 44%;
    }

    .photo {
      width: 55%;
      height: 90%;
    }

    .certificates {
      flex-flow: wrap;
      margin: 0 auto 10%;
    }

    .cert-figure {
      width: 28vw;
      height: 32vw;
    }

    .cert-pic {
      height: 63%;
    }

    .cert-caption {
      padding: 2% 3%;
      height: 30%;
    }
  }
</style>
