<template>
  <div>
    <NavigationBar :page-type="'garden'" />
    <Nuxt class="main" />
    <FooterBar />
    <script data-goatcounter="https://lktdev.goatcounter.com/count" async src="//gc.zgo.at/count.js"></script>
  </div>
</template>

<script></script>

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

  @media screen and (max-width: 768px) {
    .main {
      margin: 0 3%;
    }
  }
</style>
