<template>
  <div>
      <space-form @save="submit" :creating="creating"></space-form>
      <md-snackbar md-position="center" :md-duration="4000" :md-active.sync="showSnackbar" md-persistent>
          <span>{{this.error ? this.error.message : ''}}</span>
          <md-button class="md-primary md-raised" @click="showSnackbar = false">Ok</md-button>
      </md-snackbar>
  </div>
</template>

<script>
import SpaceForm from '../components/SpaceForm';
import { types } from '../../../store/modules/spaces';
import { mapGetters } from "vuex";

export default {
  components: {
    spaceForm: SpaceForm
  },
  data() {
    return {
      showSnackbar: false
    };
  },
  computed: mapGetters({
    creating: types.CREATING,
    error: types.ERROR
  }),
  watch: {
    error(value) {
      this.showSnackbar = true;
    }
  },
  methods: {
    submit(form){
      this.$store.dispatch(types.CREATE_SPACE, form)
        .then(() => this.$router.push({path: '/spaces'}));
    }
  }
}
</script>
