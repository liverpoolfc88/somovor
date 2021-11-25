import Vue from 'vue';
import VueRouter from 'vue-router';
import Home from '../views/Home.vue';
import Layout from '../views/Layout.vue';
import LayoutBest from '../views/LayoutBest.vue';
import store from '../store';
import storage from '../helpers/storage.js';

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Layout,
    children: [
      {
        path: '',
        component: Home,
      },
    ],
  },
  {
    path: '/login',
    name: 'Login',
    component: () =>
          import('@/views/Login')
  },

  {
    path: '/roles',
    component: Layout,
    children: [
      {
        path: '/',
        component: () =>
          import('@/views/Roles'),
        meta: {
          permission: "roles-show"
        }
      }
    ]
  },
  {
    path: '/rooms',
    component: Layout,
    children: [
      {
        path: '/',
        component: () =>
          import('@/views/Room'),
        meta: {
          permission: "roles-show"
        }
      }
    ]
  },
  {
    path: '/userhome/:type',
    component: Layout,
    children: [
      {
        path: '/',
        component: () =>
          import('@/views/UserHome'),
        meta: {
          permission: "roles-show"
        }
      }
    ]
  },
  {
    path: '/permissions',
    component: Layout,
    children: [
      {
        path: '/',
        component: () =>
          import('@/views/Permissions'),
        meta: {
          permission: "permissions-show"
        }
      }
    ]
  },
  {
    path: '/users',
    component: Layout,
    children: [
      {
        path: '/',
        component: () =>
          import('@/views/Users'),
        meta: {
          permission: "users-show"
        }
      }
    ]
  },
  {
    path: '/404',
    component: () =>
      import('@/views/layouts/404'),
    visible: true, //store.getters.checkPermission("templates-index")
  },
  {
    path: '/403',
    component: () =>
      import('@/views/layouts/403'),
  },
  {
    path: '*',
    redirect: '/404',
  },
];

const router = new VueRouter({
  mode: 'hash',
  // mode: 'history',
  base: process.env.BASE_URL,
  routes,
});

router.beforeEach((to, from, next) => {
  var access_token = store.getters.getAccessToken();
  let localStorage = window.localStorage;
  const now = new Date();
  let expire_token = localStorage.getItem('expire_token', now.getTime());
  
  if(!(expire_token == 'null' || expire_token == null) && expire_token < now.getTime() - 10800000 && to.fullPath != '/login'){
    store.dispatch("setUser", null);
    store.dispatch("setPermissions", null);
    //store.dispatch("setRole", null);
    store.dispatch("setAccessToken", null);
    // Cookies.remove("access_token");
    next({
      path: '/login',
    });
  }
  

  if (!access_token && to.fullPath != '/login') {
    store.dispatch('setRedirectUrl', to.fullPath);
    localStorage.setItem('expire_token', now.getTime());
    next({
      path: '/login',
    });
  }
  else if (!to.meta.permission || store.getters.checkPermission(to.meta.permission)) {
    localStorage.setItem('expire_token', now.getTime());
    next();
  }
  else {
    localStorage.setItem('expire_token', now.getTime());
    next('/403');
  }
});

export default router;
