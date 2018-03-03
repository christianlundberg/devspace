import Vue from 'vue'
import Router from 'vue-router'
import Layout from '@/views/Layout';
import Login from '@/views/Login';
import SignUp from '@/views/SignUp';
import Spaces from '@/features/spaces/views/Spaces';
import CreateSpace from '@/features/spaces/views/CreateSpace';
import ManageSpaces from '@/features/spaces/views/ManageSpaces';
import Space from '@/features/spaces/views/Space';
import CreatePost from '@/features/posts/views/CreatePost';

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      redirect: '/manage',
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
      },{
        path: 'spaces/:id',
        component: Space
      },{
        name: 'createPost',
        path: 'spaces/:id/post',
        component: CreatePost
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
