<template>
  <div class="md-layout">
    <div class="md-layout-item md-xsmall-size-50 md-small-size-60 md-size-70">
      <router-view></router-view>
    </div>
    <div class="md-layout-item md-xsmall-size-50 md-small-size-40 md-size-30">
      <md-card v-if="loading">
        <md-card-content>
          <div class="md-layout md-alignment-center-center">
            <md-progress-spinner class="md-accent" :md-diameter="100" :md-stroke="10" md-mode="indeterminate"></md-progress-spinner>
          </div>
        </md-card-content>
      </md-card>
      <md-card v-else>
        <md-card-area>
          <md-card-media>
            <img :src="space.logo" alt="Logo">
          </md-card-media>

          <md-card-header>
            <md-card-header-text>
              <div class="md-title">{{space.name}}</div>
              <div class="md-subhead">Subtitle here</div>
            </md-card-header-text>
            <!-- <md-menu md-size="big" md-direction="bottom-end">
              <md-button class="md-icon-button" md-menu-trigger>
                <md-icon>more_vert</md-icon>
              </md-button>
              <md-menu-content>
                <md-menu-item @click="doACall">
                  <span>Call</span>
                  <md-icon>phone</md-icon>
                </md-menu-item>
                <md-menu-item @click="sendMessage">
                  <span>Send a message</span>
                  <md-icon>message</md-icon>
                </md-menu-item>
              </md-menu-content>
            </md-menu> -->
          </md-card-header>
          <md-card-content>
            {{space.description}}
          </md-card-content>
        </md-card-area>
        <md-card-actions md-alignment="left">
          <md-button  class="md-primary md-raised" :to="{ name: 'createPost', params: { id: this.$route.params.id }}">Post</md-button>
        </md-card-actions>
    </md-card>
    </div>
  </div>
</template>
<script>
import { mapGetters, mapActions } from 'vuex';
import { types } from '../../../store/modules/active-space';

export default {
  
  computed: mapGetters({
    space: types.SPACE,
    loading: types.LOADING
  }),
  watch: {
    '$route.params.id': function (id) {
      this.getSpace(id);
    }
  },
  created(){
    this.getSpace(this.$route.params.id);
  },
  methods: {
    getSpace(id){
      this.$store.dispatch(types.LOAD_SPACE, id);
    }
  }
}
</script>

