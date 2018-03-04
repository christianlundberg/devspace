// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
import App from './App';
import router from './router';
import { store } from './store';
import VueMaterial from 'vue-material';
import Vuelidate from 'vuelidate';
import 'vue-material/dist/vue-material.min.css';
import './theme.scss';
import { firebaseApp } from './firebase';

Vue.config.productionTip = false;

Vue.use(VueMaterial);
Vue.use(Vuelidate);

const unsubscribe = firebaseApp.auth().onAuthStateChanged(user => {

  store.dispatch('loadUser', user).then(() => {
    new Vue({
      el: '#app',
      router,
      store,
      components: { App },
      template: '<App/>'
    });
  });
  
  unsubscribe();
});
