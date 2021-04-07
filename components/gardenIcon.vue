<template>
  <div class="plant">
    <div class="pot">
      <div class="pot-base"></div>
    </div>
    <div class="stem">
      <div class="petal-1">
        <div class="vein-right"></div>
      </div>
      <div class="petal-2">
        <div class="vein-left"></div>
      </div>
      <!-- <div class="petal-3">
        <div class="vein-right"></div>
      </div> -->
      <!-- <div class="petal-4">
        <div class="vein-left"></div>
      </div> -->
      <!-- <div class="petal-5">
        <div class="vein-right"></div>
      </div> -->
    </div>
  </div>
</template>

<script>
  export default {};
</script>

<style scoped>
  .plant {
    /* position: relative; */
    /* top: 20%; */
    /* margin: 0 auto; */
    /* width: 15%; */
    /* height: 60%; */
  }

  .pot {
    background: var(--lightPurple);
    position: relative;
    margin: 0 auto;
    width: 25px;
    height: 30px;
    border-radius: 25px 25px 75px 75px / 60px 60px 90px 90px;
    transform: translatey(-2px);
    z-index: 2;
  }

  .pot-base {
    background: var(--lightYellow);
    position: absolute;
    bottom: 0;
    left: -18%;
    width: 35px;
    height: 10px;
    border-radius: 8px 8px 25px 25px;
  }

  .stem {
    background: var(--lightBasic);
    position: relative;
    /*   top: -15%; */
    margin: 0 auto;
    width: 4px;
    height: 20px;
    border-radius: 5px;
    transform: translatey(-50px);
    z-index: 1;
  }

  .petal-1 {
    background: var(--lightGreen);
    position: absolute;
    top: 2px;
    left: 9px;
    width: 11px;
    height: 15px;
    border-radius: 65% 0 70% 10%;
    transform-origin: top right;
    transform: rotate(20deg);
  }

  .petal-2 {
    background: var(--lightGreen);
    position: absolute;
    top: 13px;
    right: 3px;
    width: 12px;
    height: 15px;
    border-radius: 65% 0 70% 10%;
    transform-origin: top right;
    transform: rotate(85deg);
  }

  .petal-3 {
    background: var(--lightGreen);
    position: absolute;
    top: 45px;
    left: 9px;
    width: 10px;
    height: 15px;
    border-radius: 65% 0 70% 10%;
    transform-origin: top right;
    transform: rotate(20deg);
  }

  .petal-4 {
    background: var(--lightGreen);
    position: absolute;
    top: 19px;
    right: 3px;
    width: 10px;
    height: 15px;
    border-radius: 65% 0 70% 10%;
    transform-origin: top right;
    transform: rotate(85deg);
  }

  .petal-5 {
    background: var(--lightGreen);
    position: absolute;
    top: 10px;
    left: 9px;
    width: 10px;
    height: 15px;
    border-radius: 65% 0 70% 10%;
    transform-origin: top right;
    transform: rotate(20deg);
  }

  .vein-right {
    background: var(--darkGreen);
    position: absolute;
    top: 35%;
    right: 30%;
    width: 1px;
    height: 10px;
    border-radius: 10%;
    transform-origin: top right;
    transform: rotate(40deg);
  }

  .vein-left {
    background: var(--darkGreen);
    position: absolute;
    top: 22%;
    right: 29%;
    width: 1px;
    height: 10px;
    border-radius: 10%;
    transform-origin: top right;
    transform: rotate(30deg);
  }
</style>
