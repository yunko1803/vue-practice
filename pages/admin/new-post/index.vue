<template>
  <div class="admin-new-post-page">
    <section class="new-post-form">
      <AdminPostForm @submit="onSubmitted" />
    </section>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import axios from 'axios'
import AdminPostForm from '@/components/Admin/AdminPostForm.vue'

export default Vue.extend({
  layout: 'admin',
  components: {
    AdminPostForm
  },
  methods: {
    async onSubmitted(postData) {
      let result = await axios.post('https://nuxt-blog-381bf-default-rtdb.firebaseio.com/posts.json', {
        ...postData,
        updatedDate: new Date(),
      });
      this.$router.push('/');
    }
  }
})
</script>

<style scoped>
.new-post-form {
  width: 90%;
  margin: 20px auto;
}

@media (min-width: 768px) {
  .new-post-form {
    width: 500px;
  }
}
</style>
