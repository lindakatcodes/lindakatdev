<template>
  <div class="comment-wrapper">
    <div class="comment-bg">
      <div class="author">
        <img :src="comment.img" class="image" />
        <p>{{ comment.author }} {{ typeOf }} this post:</p>
      </div>
      <div class="comment-text">
        <i class="material-icons bg-quote-left">format_quote</i>
        <p class="text">{{ comment.text }}</p>
        <i class="material-icons bg-quote-right">format_quote</i>
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
    width: 85%;
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
    display: flex;
    align-items: flex-start;
    justify-content: space-between;
  }

  .text {
    color: var(--lightBasic);
    font-family: var(--sansSerif);
    flex-grow: 2;
  }

  .bg-quote-left {
    color: var(--lightYellow);
    font-size: 3rem;
    transform: scaleX(-1);
    margin-top: -4%;
  }

  .bg-quote-right {
    color: var(--lightYellow);
    font-size: 3rem;
    margin-top: -4%;
  }
</style>
