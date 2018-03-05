<template>
  <md-list  class="md-triple-line md-dense">
      <comment-list-item :comment="comment" :key="comment.id" v-for="comment in comments"></comment-list-item>
  </md-list>
</template>
<script>
import CommentListItem from './CommentListItem';
export default {
  components: {
      commentListItem: CommentListItem
  },
  props: ['comments']
}
</script>
