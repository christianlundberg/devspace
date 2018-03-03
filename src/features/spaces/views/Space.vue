<template>
  <div>
      #Space name here
      <md-button :to="{ name: 'createPost', params: { id: this.$route.params.id }}">Post</md-button>
  </div>
</template>
<script>
export default {
}
</script>
