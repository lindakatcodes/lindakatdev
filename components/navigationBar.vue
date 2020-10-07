<template>
  <div class="navigation-container">
    <nav class="nav">
      <nuxt-link v-if="mainRoutes.includes(this.$route.path)" to="/" class="home-link link">
        <img :srcset="srcset" :sizes="sizes" class="home-icon" />
      </nuxt-link>
      <nuxt-link v-else to="/school" class="home-link link">
        <img :srcset="srcset" :sizes="sizes" class="home-icon" />
      </nuxt-link>
      <span v-if="largeScreen" class="divider"></span>
      <nuxt-link :to="setCodeRoute()" class="link projects-link">{{ setCodeName }}</nuxt-link>
      <nuxt-link :to="setWriteRoute()" class="link writing-link">{{ setWriteName }}</nuxt-link>
      <nuxt-link v-if="mainRoutes.includes(this.$route.path)" to="/about" class="link about-link">ABOUT</nuxt-link>
      <nuxt-link v-else-if="this.$route.path.includes('/blog')" to="/about" class="link about-link">ABOUT</nuxt-link>
    </nav>
    <div class="underline"></div>
  </div>
</template>

<script>
  export default {
    props: {
      paths: {
        type: Array,
      },
    },
    data() {
      return {
        srcset: '/logo48.png 48w, /logo72.png 72w',
        sizes: '(max-width: 768px) 48px, 72px',
        largeScreen: this.fullSize,
        pageType: '',
        mainRoutes: ['/', '/projects', '/writing', '/about'],
      };
    },
    computed: {
      setCodeName() {
        return this.paths[0].toUpperCase();
      },
      setWriteName() {
        return this.paths[1].toUpperCase();
      },
    },
    mounted() {
      this.largeScreen = !(window.innerWidth < 768);
      this.pageType = this.mainRoutes.includes(this.$route.path) ? '/' : '/school/';
    },
    methods: {
      setCodeRoute() {
        return `${this.pageType}${this.paths[0]}`;
      },
      setWriteRoute() {
        return `${this.pageType}${this.paths[1]}`;
      },
    },
  };
</script>

<style scoped>
  .navigation-container {
    position: sticky;
    top: 0;
    height: 50px;
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
