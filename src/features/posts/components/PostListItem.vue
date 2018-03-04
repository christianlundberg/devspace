<template>
  <div class="container">
    <div class="md-title">
      <a v-if="post.url" :href="post.url">{{post.title}}</a>
      <router-link v-else :to="`${this.$route.params.id}/posts/${post.id}`">{{post.title}}</router-link>
    </div>
    <div class="md-subhead">by {{post.author.email}}</div>
  </div>
</template>

<script>
export default {
  props: ['post']
}
</script>
<style scoped>
  .container{
    margin: 16px 0;
  }
</style>


