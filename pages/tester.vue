<template>
  <div class="container">
    <div class="item item1">Item 01</div>
    <div class="item item2">Bonjour!</div>
    <div class="item item3">Item 03</div>
    <div class="item item4">Item 04</div>
  </div>
</template>
<style scoped>
  .container {
    margin: 5% auto;
    width: 95vw;
    display: grid;
    grid-gap: 20px;
    border: 10px solid var(--yellow);
    grid-template-columns: repeat(auto-fit, minmax(min(150px, 100%), 1fr));
    /* grid-template-columns: fit-content(100px) 150px 150px 150px; */
  }

  .item {
    background: blue;
    color: white;
  }
</style>
