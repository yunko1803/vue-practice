<template>
  <form @submit.prevent="onSave">
    <AppControlInput v-model="editedPost.author">Author Name</AppControlInput>

    <AppControlInput v-model="editedPost.title">Title</AppControlInput>

    <AppControlInput v-model="editedPost.thumbnailLink">Thumbnail Link</AppControlInput>

    <AppControlInput
      control-type="textarea"
      v-model="editedPost.content"
    >
      Content
    </AppControlInput>

    <AppControlInput
      control-type="textarea"
      v-model="editedPost.previewText"
    >
      Preview Text
    </AppControlInput>

    <AppButton type="submit">
      Save
    </AppButton>

    <AppButton
      type="button"
      style="margin-left: 10px"
      btn-style="cancel"
      @click="onCancel"
    >
      Cancel
    </AppButton>
  </form>
</template>

<script lang="ts">
import Vue from 'vue'
import AppButton from '@/components/Ui/AppButton.vue'
import AppControlInput from '@/components/Ui/AppControlInput.vue'

export default Vue.extend({
  props: {
    post: {
      type: Object,
      required: false,
    }
  },
  data() {
    return {
      editedPost: this.post
        ? { ...this.post }
        : {
        author: '',
        title: '',
        thumbnailLink: '',
        content: '',
        previewText: '',
      }
    }
  },
  components: {
    AppButton,
    AppControlInput
  },

  methods: {
    onCancel() {
      this.$router.push('/admin');
    },

    onSave() {
      this.$emit('submit', this.editedPost);
    }
  }
})
</script>
