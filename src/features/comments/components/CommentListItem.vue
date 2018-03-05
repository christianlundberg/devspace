<template>
  <md-list-item>
    <div class="md-list-item">
      <div><span class="md-caption">{{comment.author.email}}:</span></div>
      <span class="md-subheading">{{comment.text}}</span>
    </div>
  </md-list-item>
</template>

<script>
export default {
  props: ["comment"]
}
</script>
