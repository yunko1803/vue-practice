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
  middleware: 'log',
  // created() {
  //   this.$store.dispatch('setPosts', this.loadedPosts);
  // }
  computed: {
    loadedPosts() {
      return this.$store.getters.loadedPosts
    }
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
