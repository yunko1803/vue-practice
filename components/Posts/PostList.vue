<template>
  <section class="post-list">
    <PostPreview
      id="1"
      :is-admin="isAdmin"
      thumbnail="https://assets.thehansindia.com/h-upload/2021/07/31/1092805-tech.webp"
      title="hello there"
      previewText="This is my first post"
    />
    <PostPreview
      id="2"
      :is-admin="isAdmin"
      thumbnail="https://assets.thehansindia.com/h-upload/2021/07/31/1092805-tech.webp"
      title="hello there"
      previewText="This is my second post"
    />
    <PostPreview
      id="3"
      :is-admin="isAdmin"
      thumbnail="https://assets.thehansindia.com/h-upload/2021/07/31/1092805-tech.webp"
      title="hello there"
      previewText="This is my third post"
    />
  </section>
</template>

<script lang="ts">
import Vue from 'vue'
import PostPreview from '@/components/Posts/PostPreview.vue'

export default Vue.extend({
  components: {
    PostPreview,
  },
  props: {
    isAdmin: {
      type: Boolean,
      default: false,
    }
  }
})
</script>

<style scoped>
.post-list {
  display: flex;
  padding: 20px;
  box-sizing: border-box;
  flex-wrap: wrap;
  align-items: center;
  justify-content: center;
}
</style>
