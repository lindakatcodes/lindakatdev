<template>
  <div class="navigation-container">
    <nav class="nav">
      <nuxt-link to="/" class="home-link link"><img :srcset="srcset" :sizes="sizes" class="home-icon" /></nuxt-link>
      <span v-if="fullSize" class="divider"></span>
      <nuxt-link to="/projects" class="link projects-link">PROJECTS</nuxt-link>
      <nuxt-link to="/writing" class="link writing-link">WRITING</nuxt-link>
      <nuxt-link to="/about" class="link about-link">ABOUT</nuxt-link>
    </nav>
    <div class="underline"></div>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        srcset: '/logo48.png 48w, /logo72.png 72w',
        sizes: '(max-width: 768px) 48px, 72px',
      };
    },
    computed: {
      fullSize() {
        if (window.innerWidth < 768) {
          return false;
        }
        return true;
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
    position: sticky;
    top: 6px;
    margin-left: 1%;
    border-bottom: none;
  }

  .projects-link:hover .projects-link:focus {
    border-bottom-color: var(--lightPurple);
    color: var(--lightPurple);
  }

  .writing-link:hover .writing-link:focus {
    border-bottom-color: var(--lightBlue);
    color: var(--lightBlue);
  }

  .about-link:hover .about-link:focus {
    border-bottom-color: var(--lightYellow);
    color: var(--lightYellow);
  }
</style>
