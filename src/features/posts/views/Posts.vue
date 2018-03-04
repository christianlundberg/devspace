<template>
    <md-card v-if="loadingPosts">
        <md-card-content>
          <div class="md-layout md-alignment-center-center">
            <md-progress-spinner class="md-accent" :md-diameter="100" :md-stroke="10" md-mode="indeterminate"></md-progress-spinner>
          </div>
        </md-card-content>
    </md-card>
    <md-card v-else>
        <md-card-content>
            <md-empty-state 
                v-if="!(posts && posts.length)"
                md-icon="notifications_off"
                md-label="Looks like this space is empty">
            </md-empty-state>
            <post-list :posts="posts"></post-list>
        </md-card-content>
    </md-card>
</template>

<script>
import PostList from '../../posts/components/PostList';
import { mapGetters, mapActions } from 'vuex';
import { types } from '../../../store/modules/active-space';

export default {
  components: {
    postList: PostList
  },
  computed: mapGetters({
    posts: types.POSTS,
    loadingPosts: types.LOADING_POSTS
  }),
  watch: {
    '$route.params.id': function (id) {
      this.getPosts(id);
    }
  },
  created(){
    this.getPosts(this.$route.params.id);
  },
  methods: {
    getPosts(id){
      this.$store.dispatch(types.LOAD_POSTS, id);
    }
  }
}
</script>
