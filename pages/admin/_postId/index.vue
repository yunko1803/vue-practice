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
import axios from 'axios'

export default Vue.extend({
  layout: 'admin',
  components: {
    AdminPostForm
  },
  async asyncData(context) {
    try {
      let res = await axios.get(`https://nuxt-blog-381bf-default-rtdb.firebaseio.com/posts/${ context.params.postId }.json`);
      return {
        loadedPost: res.data,
      }
    } catch (e) {
      console.error(e);
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
