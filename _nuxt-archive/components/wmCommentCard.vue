<template>
  <div class="comment-wrapper">
    <div class="comment-bg">
      <div class="author">
        <img :src="comment.img" class="image" />
        <p>{{ comment.author }} {{ typeOf }} this post:</p>
      </div>
      <div class="comment-text">
        <p class="text">{{ comment.text }}</p>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    props: {
      comment: Object,
    },
    computed: {
      typeOf() {
        const type = this.comment.type;
        let value = '';
        switch (type) {
          case 'in-reply-to':
            value = 'replied to';
            break;
          case 'mention-of':
          case 'repost-of':
            value = 'shared';
            break;
          default:
            break;
        }
        return value;
      },
    },
  };
</script>

<style scoped>
  .comment-wrapper {
    background-image: var(--lightGradient);
    border-radius: 5px;
    margin-bottom: 4%;
  }

  .comment-bg {
    background-color: #212c31;
    padding: 2%;
    margin: 1.5%;
  }

  .author {
    display: flex;
    align-items: center;
    margin-bottom: 5%;
  }

  .author p {
    color: var(--lightBasic);
    margin-left: 3%;
    font-size: 1.1rem;
  }

  .image {
    border-radius: 50%;
    width: 12%;
  }

  .comment-text {
    position: relative;
  }

  .text {
    color: var(--lightBasic);
    font-family: var(--sansSerif);
    font-size: 1.2rem;
    position: relative;
    z-index: 2;
    width: 95%;
    margin: 0 auto;
  }

  @media screen and (max-width: 768px) {
    .comment-wrapper {
      margin: 0 auto 4%;
      width: 95%;
    }

    .author p {
      font-size: 1rem;
    }

    .text {
      font-size: 1rem;
    }
  }
</style>
