<template>
  <div>
    <!-- <post-form></post-form> -->
    <md-card>
      <md-progress-bar v-if="posting" class="md-accent" md-mode="indeterminate"  />
      <md-tabs>
        <md-tab :md-disabled="posting" md-icon="link" id="tab-link" md-label="Link">
          <post-link-form :posting="posting" @save="submit"></post-link-form>
        </md-tab>
        
        <md-tab :md-disabled="posting" md-icon="mode_edit" id="tab-text" md-label="Text">
          <post-text-form :md-disabled="posting" :posting="posting" @save="submit"></post-text-form>
        </md-tab>
      </md-tabs>
    </md-card>
  </div>
</template>

<script>
import PostLinkForm from '../components/PostLinkForm';
import PostTextForm from '../components/PostTextForm';
import { types } from '../../../store/modules/active-space';
import { mapGetters } from 'vuex';

export default {
  components: {
    postLinkForm: PostLinkForm,
    postTextForm: PostTextForm
  },
  computed: mapGetters({
    posting: types.POSTING
  }),
  methods:{
    submit(form){
      this.$store.dispatch(types.CREATE_POST, {...form, spaceId: this.$route.params.id})
        .then(() => this.$router.push({path: `/spaces/${this.$route.params.id}`}));
    }
  }
}
</script>

