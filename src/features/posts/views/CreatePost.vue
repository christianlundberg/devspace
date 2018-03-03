<template>
  <div>
    <!-- <post-form></post-form> -->
    <md-card>
      <!-- <md-progress-bar class="md-accent" md-mode="indeterminate"  /> -->
      <md-tabs>
        <md-tab md-icon="link" id="tab-link" md-label="Link">
          <post-link-form @save="submit"></post-link-form>
        </md-tab>
        
        <md-tab md-icon="mode_edit" id="tab-text" md-label="Text">
          <post-text-form @save="submit"></post-text-form>
        </md-tab>
      </md-tabs>
      
    </md-card>
    
  </div>
</template>
<script>
import PostLinkForm from '../components/PostLinkForm';
import PostTextForm from '../components/PostTextForm';
import { types } from '../../../store/modules/active-space';

export default {
  components: {
    postLinkForm: PostLinkForm,
    postTextForm: PostTextForm
  },
  methods:{
    submit(form){
      this.$store.dispatch(types.CREATE_POST, form);
    }
  }
}
</script>

