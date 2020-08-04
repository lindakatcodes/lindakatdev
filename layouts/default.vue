<template>
  <div>
    <NavigationBar />
    <Nuxt />
    <FooterBar />
    <script data-goatcounter="https://lktdev.goatcounter.com/count" async src="//gc.zgo.at/count.js"></script>
  </div>
</template>

<script>
  window.goatcounter = { no_onload: true };

  window.addEventListener('hashchange', function (e) {
    window.goatcounter.count({
      // eslint-disable-next-line no-restricted-globals
      path: location.pathname + location.search + location.hash,
    });
  });
</script>

<style>
  html {
    font-size: 18px;
    word-spacing: 1px;
    box-sizing: border-box;
    font-family: var(--serif);
    background: var(--darkBasic);
  }

  *,
  *::before,
  *::after {
    box-sizing: border-box;
    margin: 0;
  }
</style>
