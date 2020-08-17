<template>
  <div class="tag-container">
    <ul class="tags-wrapper">
      <li class="single-tag">
        <nuxt-link :to="{ name: 'writing' }">All</nuxt-link>
      </li>
      <li v-for="tag in getAllTags" :key="tag" class="single-tag">
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
    },
  };
</script>

<style scoped>
  .tag-container {
    width: 70%;
    border: 2px solid var(--lightYellow);
    margin: 0 auto 3%;
  }

  .tags-wrapper {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-wrap: wrap;
  }

  .single-tag {
    padding: 0.5% 1%;
    margin: 0 1.5%;
    text-transform: uppercase;
    font-size: 0.9rem;
    font-family: var(--sansSerif);
    font-weight: 700;
    letter-spacing: 0.75px;
    background: var(--lightPurple);
    color: var(--darkBasic);
    border-radius: 5px;
    list-style: none;
    text-decoration: none;
  }

  .single-tag:nth-child(2n) {
    background: var(--lightBlue);
  }

  .single-tag:nth-child(3n) {
    background: var(--lightYellow);
  }

  .single-tag:nth-child(4n) {
    background: var(--lightPink);
  }
</style>
