import Vue from 'vue'
import Router from 'vue-router'
import Layout from '@/views/Layout';
import Login from '@/views/Login';
import SignUp from '@/views/SignUp';

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Layout',
      component: Layout
    },
    {
      path: '/login',
      name: 'Login',
      component: Login
    },
    {
      path: '/sign-up',
      name: 'SignUp',
      component: SignUp
    }
  ]
})
