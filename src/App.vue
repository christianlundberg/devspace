<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
import { firebaseApp } from './firebase';
import { mapGetters, mapMutations } from 'vuex';

export default {
  name: "App",
  computed: mapGetters([
    'user'
  ]),
  created: function() {
    // firebaseApp.auth().onAuthStateChanged(user => {
    //   //this.loadUser(user);
    //   this.$store.dispatch('loadUser', user);
    //   if(user)
    //     this.$router.push({path: '/'});
    //   else
    //     this.$router.push({path: '/login'});
    // });
  },
  methods: mapMutations(['loadUser'])
};
</script>

<style>

</style>
