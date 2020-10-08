<template>
  <div class="comment-wrapper">
    <div class="comment-bg">
      <div class="author">
        <img :src="comment.img" class="image" />
        <p>{{ comment.author }} {{ typeOf }} this post:</p>
      </div>
      <div class="comment-text">
        <i class="material-icons bg-quote bg-quote-left">format_quote</i>
        <p class="text">{{ comment.text }}</p>
        <i class="material-icons bg-quote bg-quote-right">format_quote</i>
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
    width: 65%;
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

  .bg-quote {
    color: var(--lightYellow);
    font-size: 5rem;
    margin-top: -4%;
    z-index: 1;
    opacity: 0.2;
    position: absolute;
    top: -15px;
  }

  .bg-quote-left {
    transform: scaleX(-1);
    left: -15px;
  }

  .bg-quote-right {
    right: -15px;
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

    .bg-quote {
      font-size: 3.5rem;
    }
  }
</style>
