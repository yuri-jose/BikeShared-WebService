import { RouteRecordRaw } from 'vue-router';

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [{ path: '', component: () => import('pages/IndexPage.vue') }],
  },

  {
    path: '/admin',
    component: () => import('layouts/LoginLayout.vue'),
    children: [
      { path: '', component: () => import('pages/admin/loginPage.vue') },
      {
        path: '/reset-password',
        name: 'reset-password',
        component: () => import('pages/admin/reset-passwordPage.vue'),
      },
    ],
  },

  {
    path: '/#',
    component: () => import('layouts/LoginLayout.vue'),
    children: [
      {
        path: '/login',
        name: 'login',
        component: () => import('pages/admin/loginPage.vue'),
      },
      {
        path: '/reset-password',
        name: 'reset-password',
        component: () => import('pages/admin/reset-passwordPage.vue'),
      },
    ],
  },

  {
    path: '/dashboard',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      {
        path: '/dashboard',
        name: 'dashboard',
        component: () => import('pages/admin/principalPage.vue'),
      },
    ],
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/ErrorNotFound.vue'),
  },
];

export default routes;
