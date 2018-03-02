<template>
  <div class="page-container">
    <md-app >
      <md-app-toolbar class="md-large  md-dense md-primary">
        <div class="md-toolbar-row">
          <div class="md-toolbar-section-start">
            <md-button class="md-icon-button" @click="menuVisible = !menuVisible">
              <md-icon>menu</md-icon>
            </md-button>

            <h1 class="md-title">#Devspace</h1>
          </div>

          <div class="md-toolbar-section-end">
            {{user? user.email : ''}}
            <md-menu md-direction="bottom-start">
              <md-button md-menu-trigger class="md-icon-button">
                <md-icon>more_vert</md-icon>
              </md-button>
              <md-menu-content>
                <md-menu-item @click="logout">
                  <md-icon>exit_to_app</md-icon>
                  <span>Logout</span>
                </md-menu-item>
              </md-menu-content>
            </md-menu>
          </div>
        </div>
      </md-app-toolbar>

      <md-app-drawer :md-active.sync="menuVisible" md-theme="secondary">
        <md-list>
          <md-list-item>
            <md-icon>move_to_inbox</md-icon>
            <span class="md-list-item-text">Inbox</span>
          </md-list-item>
<md-divider></md-divider>
          <md-list-item>
            <md-icon>send</md-icon>
            <span class="md-list-item-text">Sent Mail</span>
          </md-list-item>

          <md-list-item  tag="li" to="/" exact>
            <md-icon>send</md-icon>
            <span class="md-list-item-text">Sent Mail</span>
          </md-list-item>
          

          <md-list-item>
            <md-icon>error</md-icon>
            <span class="md-list-item-text">Spam</span>
          </md-list-item>
          <md-list-item md-expand :md-expanded.sync="expandNews">
            <md-icon>whatshot</md-icon>
            <span class="md-list-item-text">News</span>

            <md-list slot="md-expand">
              <md-list-item class="md-inset" to="/" exact>
                Trash
              </md-list-item>
              <md-list-item class="md-inset">World</md-list-item>
              <md-list-item class="md-inset">Europe</md-list-item>
              <md-list-item class="md-inset">South America</md-list-item>
            </md-list>
          </md-list-item>
        </md-list>
      </md-app-drawer>

      <md-app-content >
        <div class="container"><router-view></router-view></div>
        
      </md-app-content>
    </md-app>
  </div>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  name: "Layout",
  data() {
    return {
      menuVisible: false,
      expandNews: false
    };
  },
  computed: mapGetters(["user"]),
  methods: {
    logout() {
      this.$store.dispatch("logout");
    }
  }
};
</script>

<style lang="scss" scoped>
.md-app {
  min-height:100vh;
}
.container {
  min-height: calc(100vh - 96px);
}
.md-drawer {
  width: 230px;
  max-width: calc(100vw - 125px);
}
</style>
