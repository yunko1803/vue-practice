<template>
  <section class="container">
    <nuxt-link to="/users">Users</nuxt-link>
    <!-- <nuxt-link to="/products">Products</nuxt-link> -->
    <button @click="goProduct">Products</button>
  </section>
</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
  name: 'IndexPage',

  methods: {
    goProduct() {
      this.$router.push('/products');
    }
  }
})
</script>
