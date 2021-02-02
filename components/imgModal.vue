<template>
  <div class="modal" tabindex="0" @keyup.esc="closeModal($event)" @click="handleClick($event)">
    <div class="modal-inner">
      <img :src="picsrc" />
      <button class="close-modal" @click="closeModal">X</button>
    </div>
  </div>
</template>

<script>
  export default {
    props: {
      picsrc: String,
    },
    methods: {
      closeModal(e) {
        console.log(e);
        this.$emit('close-image');
      },
      handleClick(e) {
        if (e.target === e.currentTarget) {
          // this.$emit('close-image');
          this.closeModal();
        }
      },
    },
  };
</script>

<style scoped>
  .modal {
    position: fixed;
    background: var(--darkBasicOpacity);
    z-index: 2;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    display: grid;
    place-items: center;
    opacity: 0;
    transition: opacity 0.5s;
    pointer-events: none;
  }

  .modal-inner {
    z-index: 2;
    border-radius: 5px;
    width: 80vw;
    height: 70vh;
    display: grid;
    grid-template-columns: 1fr;
    place-items: center;
    transform: translateY(-100vh);
    transition: all 0.5s;
  }

  img {
    width: 100%;
    height: 100%;
    object-fit: contain;
  }

  .close-modal {
    font-family: var(--serif);
    font-size: 1.5rem;
    font-weight: bold;
    color: var(--lightBasic);
    background: var(--darkBasicOpacity);
    box-shadow: none;
    border: none;
    border-radius: 5px;
    width: 40px;
    height: 40px;
    position: absolute;
    top: 3px;
    right: 3px;
  }

  .open {
    opacity: 1;
    pointer-events: all;
  }

  .open .modal-inner {
    transform: translateY(0);
  }

  @media screen and (max-width: 768px) {
    .modal-inner {
      width: 95vw;
      height: auto;
    }

    .close-modal {
      top: -50px;
    }
  }
</style>
