<template>
  <md-card v-if="loading">
    <md-card-content>
      <div class="md-layout md-alignment-center-center">
        <md-progress-spinner class="md-accent" :md-diameter="100" :md-stroke="10" md-mode="indeterminate"></md-progress-spinner>
      </div>
    </md-card-content>
  </md-card>
  <div v-else>
    <md-card>
        <md-card-header>
          <div class="md-title">{{post.title}}</div>
        </md-card-header>
        <md-card-content>
          {{post.text}}
        </md-card-content>
    </md-card>
  </div>
</template>
<script>
import { mapGetters, mapActions } from "vuex";
import { types } from "../../../store/modules/active-post";
export default {
  computed: mapGetters({
    post: types.POST,
    loading: types.LOADING
  }),
  created() {
    this.$store.dispatch(types.LOAD_POST, this.$route.params.postId);
  }
};
</script>
