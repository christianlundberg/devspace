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
import Posts from '@/features/posts/views/Posts';
import Post from '@/features/posts/views/Post';
import { store } from '../store';

Vue.use(Router)

const router = new Router({
  routes: [
    {
      path: '/',
      redirect: '/manage',
      name: 'Layout',
      component: Layout,
      meta: { requiresAuth: true },
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
        name: 'space',
        path: 'spaces/:id',
        component: Space,
        children: [{
          path: '',
          component: Posts
        },{
          path: 'posts/:postId',
          component: Post
        },{
          name: 'createPost',
          path: 'post',
          component: CreatePost
        }]
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
});

router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.requiresAuth)) {
    if (!store.getters.user) {
      next({
        path: '/login'
      });
    } else {
      next();
    }
  } else {
    next();
  }
});

export default router;
