import Vue from 'vue'
import Router from 'vue-router'
import Layout from '@/views/Layout';
import Login from '@/views/Login';
import SignUp from '@/views/SignUp';
import Spaces from '@/features/spaces/views/Spaces';
import CreateSpace from '@/features/spaces/views/CreateSpace';
import ManageSpaces from '@/features/spaces/views/ManageSpaces';

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      redirect: '/spaces',
      name: 'Layout',
      component: Layout,
      children: [{
        path: 'manage',
        component: ManageSpaces
      },{
        path: 'spaces',
        component: Spaces
      },{
        path: 'spaces/create',
        component: CreateSpace
      }]
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
