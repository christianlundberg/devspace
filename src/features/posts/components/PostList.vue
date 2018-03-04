<template>
  <div>
    <div v-for="(post, index) in posts" :key="post.id">
      <post-list-item :post="post" ></post-list-item>
      <md-divider v-if="index != (posts.length - 1)"></md-divider>
    </div>
  </div>
</template>

<script>
import PostListItem from './PostListItem';

export default {
  components: {
    postListItem: PostListItem
  },
  props: ['posts']
}
</script>
