<template>
  <div class="navigation-container">
    <nav v-if="pageType === 'main'" class="nav">
      <nuxt-link to="/" class="home-link link">
        <img :srcset="srcset" :sizes="sizes" class="home-icon" alt="The letters LT crossed over each other in rainbow colors" />
      </nuxt-link>
      <span v-if="largeScreen" class="divider"></span>
      <nuxt-link to="/projects" class="link projects-link">PROJECTS</nuxt-link>
      <nuxt-link to="/writing" class="link writing-link">WRITING</nuxt-link>
      <nuxt-link to="/about" class="link about-link">ABOUT</nuxt-link>
      <nuxt-link to="/garden" class="link garden-link"><GardenIcon /></nuxt-link>
    </nav>
    <nav v-else class="nav">
      <nuxt-link to="/garden" class="home-link link">
        <img :srcset="srcset" :sizes="sizes" class="home-icon" alt="The letters LT crossed over each other in rainbow colors" />
      </nuxt-link>
      <span v-if="largeScreen" class="divider"></span>
      <nuxt-link to="/garden/playground" class="link projects-link">PLAYGROUND</nuxt-link>
      <nuxt-link to="/garden/seedlings" class="link writing-link">NOTES</nuxt-link>
    </nav>
    <div class="underline"></div>
  </div>
</template>

<script>
  export default {
    props: {
      pageType: {
        type: String,
      },
    },
    data() {
      return {
        srcset: '/logo48.png 48w, /logo72.png 72w',
        sizes: '(max-width: 768px) 48px, 72px',
        largeScreen: this.fullSize,
      };
    },
    mounted() {
      this.largeScreen = !(window.innerWidth < 768);
    },
  };
</script>

<style scoped>
  .navigation-container {
    position: sticky;
    top: 0;
    height: 60px;
    width: 100%;
    z-index: 1;
  }

  .nav {
    height: 95%;
    width: 100%;
    display: flex;
    flex-wrap: nowrap;
    justify-content: space-around;
    align-items: center;
    background: var(--darkBasic);
  }

  .underline {
    width: 100%;
    height: 5px;
    background: var(--lightGradient);
  }

  .divider {
    flex-grow: 2;
  }

  .link {
    margin: 1.5%;
    border-bottom: thick double;
    border-bottom-color: transparent;
    text-decoration: none;
    color: var(--lightBasic);
    transition: border-bottom-color 0.2s linear, color 0.2s linear;
    font-size: 1.1rem;
    font-family: var(--sansSerif);
    font-weight: 700;
    letter-spacing: 0.75px;
  }

  .home-link {
    position: relative;
    top: 18px;
    margin-left: 1%;
    border-bottom: none;
  }

  .projects-link:hover,
  .projects-link:focus {
    border-bottom-color: var(--lightPurple);
    color: var(--lightPurple);
  }

  .writing-link:hover,
  .writing-link:focus {
    border-bottom-color: var(--lightBlue);
    color: var(--lightBlue);
  }

  .about-link:hover,
  .about-link:focus {
    border-bottom-color: var(--lightYellow);
    color: var(--lightYellow);
  }

  .garden-link {
    height: 10%;
  }

  @media screen and (max-width: 768px) {
    .home-link {
      top: 20px;
    }

    .link {
      font-size: 0.95rem;
      margin: 1.5% 0.75%;
    }
  }
</style>
