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
          <div class="md-subhead">by {{post.author.email}}</div>
        </md-card-header>
        <md-card-content>
          <span style="white-space: pre-wrap;">{{post.text}}</span>
          
        </md-card-content>
    </md-card>
    <div class="comment-form">
      <comment-form :saving="savingComment" @save="onSaveComment"></comment-form>
    </div>
    <md-divider></md-divider>
    
    <comment-list :comments="comments"></comment-list>
    
  </div>
</template>
<script>
import CommentList from '../../comments/components/CommentList';
import CommentForm from '../../comments/components/CommentForm';
import { mapGetters, mapActions } from "vuex";
import { types } from "../../../store/modules/active-post";

export default {
  components: {
    CommentForm,
    CommentList
  },
  computed: mapGetters({
    post: types.POST,
    loading: types.LOADING,
    savingComment: types.SAVING_COMMENT,
    comments: types.COMMENTS
  }),
  created() {
    this.$store.dispatch(types.LOAD_POST, this.$route.params.postId);
    this.$store.dispatch(types.LOAD_COMMENTS, this.$route.params.postId);
  },
  methods: {
    onSaveComment(comment){
      this.$store.dispatch(types.SAVE_COMMENT, comment);
    }
  }
};
</script>
<style scoped>
  .comment-form{
    margin: 20px 0;
  }
</style>

