<template>
  <div class="tag-container">
    <ul class="tags-wrapper">
      <li class="single-tag" :class="{ selected: pageParam === 'all' }">
        <nuxt-link :to="{ name: 'writing' }">All</nuxt-link>
      </li>
      <li v-for="tag in getAllTags" :key="tag" class="single-tag" :class="{ selected: pageParam === tag }">
        <nuxt-link :to="{ name: 'writing-tag', params: { tag } }">
          {{ tag }}
        </nuxt-link>
      </li>
    </ul>
  </div>
</template>

<script>
  export default {
    props: {
      tags: {
        type: Array,
      },
    },
    computed: {
      getAllTags() {
        const fullList = [];
        this.tags.forEach((post) => {
          const postTags = post.tags;
          fullList.push(...postTags);
        });
        const allSoloTags = [...new Set(fullList)];
        const sorted = allSoloTags.sort((el1, el2) => {
          const a = el1.toLowerCase();
          const b = el2.toLowerCase();
          if (a < b) {
            return -1;
          }
          if (a > b) {
            return 1;
          }
          return 0;
        });
        return sorted;
      },
      pageParam() {
        return this.$route.params.tag || 'all';
      },
    },
  };
</script>

<style scoped>
  .tag-container {
    width: 80%;
    /* border: 2px solid var(--lightYellow); */
    margin: 0 auto 2%;
  }

  .tags-wrapper {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-wrap: wrap;
    padding: 0;
  }

  .single-tag {
    padding: 0.25% 0.5%;
    margin: 0.75% 1%;
    background: var(--lightPurple);
    border-radius: 5px;
    border: 2px solid var(--lightPurple);
    list-style: none;
  }

  .single-tag a {
    color: var(--darkBasic);
    text-transform: uppercase;
    text-decoration: none;
    font-size: 1rem;
    font-family: var(--sansSerif);
    font-weight: 700;
    letter-spacing: 0.75px;
  }

  .single-tag:hover {
    background: var(--darkBasic);
  }

  .single-tag a:hover {
    color: var(--lightPurple);
  }

  .single-tag:nth-child(2n) {
    background: var(--lightBlue);
    border-color: var(--lightBlue);
  }

  .single-tag:nth-child(2n):hover {
    background: var(--darkBasic);
  }

  .single-tag:nth-child(2n) a:hover {
    color: var(--lightBlue);
  }

  .single-tag:nth-child(3n) {
    background: var(--lightYellow);
    border-color: var(--lightYellow);
  }

  .single-tag:nth-child(3n):hover {
    background: var(--darkBasic);
  }

  .single-tag:nth-child(3n) a:hover {
    color: var(--lightYellow);
  }

  .single-tag:nth-child(4n) {
    background: var(--lightPink);
    border-color: var(--lightPink);
  }

  .single-tag:nth-child(4n):hover {
    background: var(--darkBasic);
  }

  .single-tag:nth-child(4n) a:hover {
    color: var(--lightPink);
  }

  .selected.selected,
  .selected.selected:nth-child(2n),
  .selected.selected:nth-child(3n),
  .selected.selected:nth-child(4n) {
    background: var(--darkBasic);
  }

  .selected.selected a,
  .single-tag:nth-child(2n) .selected.selected a,
  .single-tag:nth-child(3n) .selected.selected a,
  .single-tag:nth-child(4n) .selected.selected a {
    font-size: 1.2rem;
    background: var(--lightGradient);
    background-clip: text;
    -webkit-text-fill-color: transparent;
    border-color: transparent;
  }
</style>
