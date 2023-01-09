<template>
  <div class="admin-post-page">
    <section class="update-form">
      <AdminPostForm :post="loadedPost" />
    </section>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import AdminPostForm from '@/components/Admin/AdminPostForm.vue'

export default Vue.extend({
  components: {
    AdminPostForm
  },
  data() {
    return {
      loadedPost: {
        author: 'Yoon',
        title: 'title',
        content: 'content',
        thumbnailLink: 'https://assets.thehansindia.com/h-upload/2021/07/31/1092805-tech.webp',
      }
    }
  }
})
</script>

<style scoped>
.update-form {
  width: 90%;
  margin: 20px auto;
}
@media (min-width: 768px) {
  .update-form {
    width: 500px;
  }
}
</style>
