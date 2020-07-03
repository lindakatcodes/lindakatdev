<template>
  <div class="navigation-container">
    <div class="nav">
      <nuxt-link to="/" class="home-link link">HOME</nuxt-link>
      <span class="divider"></span>
      <nuxt-link to="/projects" class="link projects-link">PROJECTS</nuxt-link>
      <nuxt-link to="/writing" class="link writing-link">WRITING</nuxt-link>
      <nuxt-link to="/about" class="link about-link">ABOUT</nuxt-link>
      <nuxt-link to="/contact" class="link contact-link">CONTACT</nuxt-link>
    </div>
    <div class="underline"></div>
  </div>
</template>

<script>
  export default {};
</script>

<style scoped>
  .navigation-container {
    position: sticky;
    top: 0;
    height: 55px;
    width: 100%;
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
    transition: border-bottom-color 0.3s linear, font-size 0.3s linear, color 0.3s linear;
    font-size: 1.1rem;
    font-family: var(--sansSerif);
  }

  .link:hover {
    font-size: 1.15rem;
  }

  .home-link:hover {
    border-bottom-color: var(--lightGreen);
    color: var(--lightGreen);
  }

  .projects-link:hover {
    border-bottom-color: var(--lightPurple);
    color: var(--lightPurple);
  }

  .writing-link:hover {
    border-bottom-color: var(--lightBlue);
    color: var(--lightBlue);
  }

  .about-link:hover {
    border-bottom-color: var(--lightYellow);
    color: var(--lightYellow);
  }

  .contact-link:hover {
    border-bottom-color: var(--lightPink);
    color: var(--lightPink);
  }
</style>
