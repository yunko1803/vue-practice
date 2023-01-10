<template>
  <div class="posts-page">
    <PostList :posts="this.loadedPosts" />
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import PostList from '@/components/Posts/PostList.vue'
export default Vue.extend({
  components: {
    PostList,
  },
  asyncData(context) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve({
          loadedPosts: [
            {
              id: '1',
              title: 'First post',
              previewText: 'This is our first post',
              thumbnail: 'https://assets.thehansindia.com/h-upload/2021/07/31/1092805-tech.webp',
            },
            {
              id: '2',
              title: 'Second post',
              previewText: 'This is our second post',
              thumbnail: 'https://assets.thehansindia.com/h-upload/2021/07/31/1092805-tech.webp',
            }
          ]
        });
      }, 1000);
    })
    .then(data => {
      return data;
    })
    .catch(e => {
      context.error(e);
    });
  },
  created() {
    this.$store.dispatch('setPosts', this.loadedPosts);
  }
})
</script>

<style scoped>
.posts-page {
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
