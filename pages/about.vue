<template>
  <main class="container">
    <div class="page-header">
      <h2 class="page-title">All About Linda</h2>
      <div class="title-divider"></div>
    </div>
    <img src="~assets/images/profile/me.jpg" alt="Woman with brown hair, brown eyes, and a winning smile." class="photo" />
    <section class="info learning">
      <h3 class="section-title">Currently Learning</h3>
      <div class="title-divider about-div"></div>
      <div class="section-details">
        <ul class="list">
          <li class="item">
            Digging into Basics!
          </li>
          <p class="item-description">
            While working on my most recent Vue project and building this portfolio, I was reminded of a few JavaScript and CSS techniques that
            regularly trip me up. So I'm going to be going back over some basics and digging into a few specific ideas, to really solidify my
            knowledge. Also planning to write about my understanding of each concept as I go over it!
          </p>
          <li class="item">
            Learning React!
          </li>
          <p class="item-description">
            While I like Vue a lot, I also want to get a basic understanding of how React works and build something with it. Can't hurt to be able to
            work with both options! I'm going to start with the tutorial on the React docs, then dig into the options on Free Code Camp. Not sure what
            I'll build with it just yet, though. I'll update here when I decide!
          </p>
        </ul>
      </div>
    </section>
    <section class="info goals">
      <h3 class="section-title">Professional Goals</h3>
      <div class="title-divider about-div"></div>
      <div class="section-details">
        <p>
          As a customer service sales associate at Cooper’s Copies, a local print shop, I did a little bit of everything! Besides assisting customers
          in all forms and working with QuickBooks for invoicing, it all boiled down to taking custom print orders and ensuring they made it all the
          way through design, production, and finishing, on time and correctly.
        </p>

        <p>
          This helped me build upon the detail tracking and service skills I developed during my previous role at Steinway Hall, a piano sales store.
          There, I developed my customer service skills & built a complete inventory of our piano stock, that helped resolve discrepancies in the
          sales records.
        </p>

        <p>
          <strong>With these experiences, I'm looking to put my detail & service skills to use as a front end web developer!</strong>
        </p>

        <p>
          I shine when I'm creating and problem solving. Taking an idea, bringing it to life, and then watching it go out into the world is the BEST
          feeling. The process is always messy, but the feeling of working through a problem and overcoming it brings me a lot of joy. I love to
          investigate the why's and how's of a situation, find the best possible solution, and implement the changes. It's like being a detective -
          and I always get what I'm after, in some form or another.
        </p>

        <p>
          I also love playing with data and designs! There's so much information in the world, readily accessible to everyone - but most people won't
          ever find it, because it's buried in technical documents, written in unusual wording, scattered in multiple places, or just plain boring to
          look through! Being able to gather information into one place, help it make sense, and display it in a way that's easy to interpret and sort
          through gives me such a sense of accomplishment, and helps others in the process!
        </p>

        <p>
          As for the type of place I'd like to work - I have a few priorities:
        </p>
        <ul class="list">
          <li class="item">
            An open and communicative office - where everyone is free to ask questions, help each other, and accepts each other as human beings
          </li>
          <li class="item">
            Colorado based, or remote
          </li>
          <li class="item">
            Somewhere I can learn and grow as a developer - mentorship would be amazing, but also being able to pair program with my teammates or
            listen in to conversations would be amazing. I have a lot of growing to do, and I can't wait!
          </li>
          <li class="item">
            Somewhere that's just plain fun to be! Folks who are friendly, kind, funny, and easy to be around. An environment where stress is left to
            certain moments and not an overwhelming air that hangs over every day. When problems do arise (it's impossible to avoid entirely), they
            are handled with respect and care for all involved.
          </li>
        </ul>

        <p>
          I'm not looking to be the best - just continuously better than I am at this moment. And I'm looking for a place where I can do just that!
        </p>
      </div>
    </section>
    <section class="info benefits">
      <h3 class="section-title">A Few Key Qualities:</h3>
      <div class="title-divider about-div"></div>
      <div class="section-details">
        <ul class="list">
          <li class="item">
            Analytical - I love organizing and digging into details. I catch proofreading mistakes others miss. I made an app to organize and track my
            nail polish collection. Tracking orders, solving puzzles, and finding solutions is my JAM.
          </li>
          <li class="item">
            Empathy - It's easy for me to figure out where folks are coming from and what they're looking for. I'm the listening ear for my
            co-workers, the calm presence in the middle of a storm. While I don't enjoy tense situations (and would honestly like less of them in my
            life), I can navigate through them and try to help everyone come out stronger and happier on the other side. I want people to feel heard,
            understood, and seen in any interaction I have with them.
          </li>
          <li class="item">
            Creative - I majored in music in college. I love trying to draw (even if most times it looks like a toddler drew it). I take photographs
            almost everywhere I go. I play card games and do jigsaw puzzles for fun. And playing with the design of the sites I create is one of my
            favorite parts of development. Any chance I have to use the creative part of my brain is a chance I'll take!
          </li>
          <li class="item">
            Grit - The process of learning, applying, working through frustration, and improving is a common theme in my life. We can't avoid road
            blocks and frustrating situations - but I've learned when to push through, when to take a break, and how to find the answers I need. If I
            want it bad enough, I will persevere until I get there, no matter how long it takes.
          </li>
          <li class="item">
            Optimistic Realist - I always find the bright side of any situation. I believe there's always some bit of good in everything and everyone.
            But I'm also enough of a realist to know when it's time to let something go or move on. The ability to find good in things and also be
            aware of the reality of a situation is a tough line to follow, but I couldn't have it any other way.
          </li>
        </ul>

        <p><strong>Quick Fire Favorites:</strong></p>
        <ul class="list">
          <li class="item">
            Programming Language - JavaScript
          </li>
          <li class="item">
            JavaScript Library - Vue
          </li>
          <li class="item">
            Code Editor - VS Code
          </li>
          <li class="item">
            Current Editor Theme - Overnight Slumber Italic
          </li>
          <li class="item">
            Video Game Series - Ratchet & Clank
          </li>
          <li class="item">
            Musician - Matt Nathanson
          </li>
          <li class="item">
            Coffee Roast - Medium Dark
          </li>
          <li class="item">
            Type of Pet - Cats
          </li>
        </ul>
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
      'image image learning learning'
      'goals goals benefits benefits'
      'certs certs certs certs';
    grid-template-columns: 1fr 1fr 1fr 1fr;
    grid-template-rows: 10% 1fr 2fr 30%;
    gap: 0.5% 2%;
    justify-content: space-around;
    align-content: center;
    padding: 1% 2%;
    width: 92%;
    margin: calc(50px + 2%) auto 3%;
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
    font-size: 3rem;
  }

  .title-divider {
    height: 4px;
    width: 25%;
    background: var(--lightGradient);
    margin: 0.25% auto 2%;
  }

  .about-div {
    width: 50%;
  }

  .photo {
    grid-area: image;
    justify-self: center;
    align-self: start;
    width: 90%;
    border-radius: 10%;
    border: 2px solid var(--lightYellow);
    margin-top: 3%;
    /* object-fit: cover;
    object-position: right top; */
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
    margin-bottom: 2%;
  }

  .list li::before {
    content: '»';
    margin: 0 0.25rem;
  }

  .item-description {
    margin-left: 4%;
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
        'learning'
        'goals'
        'benefits'
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
