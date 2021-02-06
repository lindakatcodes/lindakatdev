<template>
  <div v-if="haveWms" class="mentions">
    <h2 class="mentions-title">Webmentions</h2>
    <div class="mentions-info">
      <span v-if="wm.likes !== 0" class="info-show">
        <i class="material-icons wm-icon-fav">favorite</i>
        <span class="wm-count">{{ wm.likes }} {{ wm.likes === 1 ? 'Like' : 'Likes' }} </span>
      </span>
      <span v-if="wm.shares !== 0" class="info-show">
        <i class="material-icons wm-icon-rt">repeat</i>
        <span class="wm-count">{{ wm.shares }} {{ wm.shares === 1 ? 'Retweet' : 'Retweets' }}</span>
      </span>
      <span v-if="wm.saves !== 0" class="info-show">
        <i class="material-icons wm-icon-bm">bookmark</i>
        <span class="wm-count">{{ wm.saves }} Saved</span>
      </span>
    </div>
    <div v-if="wm.comments.length" class="mentions-comments">
      <div v-for="(item, index) in wm.comments" :key="index" class="comment-holder">
        <WmCommentCard :comment="item"></WmCommentCard>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        wm: {
          likes: 0,
          shares: 0,
          saves: 0,
          comments: [],
        },
        webmentions: [],
      };
    },
    async fetch() {
      let mentions = [];
      const routePath = this.$route.fullPath;
      const postsWithOldPath = ['pbd_20-09_snake-game', 'tut_20-08_nuxt-rss-feed', 'dj_20-10-26'];
      const oldPaths = ['/blog/pb-snake', '/blog/nuxt-rss-feed', '/blog/z_dj_2020_10_26'];
      if (postsWithOldPath.includes(this.$route.params.slug)) {
        const postIndex = postsWithOldPath.indexOf(this.$route.params.slug);
        const oldPath = oldPaths[postIndex];
        mentions = await fetch(
          `https://webmention.io/api/mentions.jf2?target[]=https://www.lindakat.com${routePath}/&target[]=https://www.lindakat.com${oldPath}/`
        )
          .then((res) => res.json())
          .then((feed) => feed.children);
      } else {
        mentions = await fetch(`https://webmention.io/api/mentions.jf2?target=https://www.lindakat.com${routePath}/`)
          .then((res) => res.json())
          .then((feed) => feed.children);
      }
      this.webmentions = mentions;
    },
    fetchOnServer: false,
    computed: {
      haveWms() {
        return this.checkWbStatus();
      },
    },
    methods: {
      setMentions() {
        const cleanMentions = new Set(this.webmentions);
        cleanMentions.forEach((mention) => {
          switch (mention['wm-property']) {
            case 'like-of':
              this.wm.likes += 1;
              break;
            case 'repost-of':
              this.wm.shares += 1;
              break;
            case 'bookmark-of':
              this.wm.saves += 1;
              break;
            case 'in-reply-to':
            case 'mention-of':
              this.makeCommentCard(mention);
              break;
            default:
              break;
          }
        });
      },
      makeCommentCard(mention) {
        const comment = {
          author: mention.author.name,
          img: mention.author.photo,
          text: mention.content.text,
          type: mention['wm-property'],
        };
        this.wm.comments.push(comment);
      },
      checkWbStatus() {
        this.setMentions();
        if (this.wm.likes === 0 && this.wm.shares === 0 && this.wm.saves === 0 && this.wm.commentCount === 0) {
          return false;
        }
        return true;
      },
    },
  };
</script>

<style scoped>
  .mentions-title {
    color: var(--lightBasic);
    text-align: center;
    font-size: 2rem;
    padding-bottom: 2%;
  }

  .mentions-info {
    display: flex;
    justify-content: center;
    margin: 0 auto 3%;
  }

  .wm-icon-fav {
    color: var(--lightPink);
  }

  .wm-icon-rt {
    color: var(--lightGreen);
  }

  .wm-icon-bm {
    color: var(--lightBlue);
  }

  .info-show {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 18%;
  }

  .wm-count {
    color: var(--lightBasic);
    font-size: 1.2rem;
    padding-left: 6%;
  }

  .mentions-comments {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
  }

  .comment-holder {
    width: 80%;
  }

  @media screen and (max-width: 768px) {
    .mentions-title {
      font-size: 1.3rem;
      padding-bottom: 3%;
    }

    .info-show {
      width: 35%;
    }

    .material-icons {
      font-size: 20px;
    }

    .wm-count {
      font-size: 1rem;
    }

    .comment-holder {
      width: 100%;
    }
  }
</style>
