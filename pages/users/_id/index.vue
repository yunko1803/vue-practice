<template>
  <h1>A single user, With ID: {{ $route.params.id }}</h1>
</template>

<script>
export default {
  validate(data) {
    console.log(data)
    return /^\d+$/.test(data.params.id)
  }
}
</script>
