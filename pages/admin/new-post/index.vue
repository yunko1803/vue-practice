<template>
  <div class="admin-new-post-page">
    <section class="new-post-form">
      <AdminPostForm @submit="onSubmitted" />
    </section>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import AdminPostForm from '@/components/Admin/AdminPostForm.vue'

export default Vue.extend({
  layout: 'admin',
  middleware: 'auth',
  components: {
    AdminPostForm
  },
  methods: {
    async onSubmitted(postData) {
      await this.$store.dispatch('addPost', postData);
      this.$router.push('/admin');
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
