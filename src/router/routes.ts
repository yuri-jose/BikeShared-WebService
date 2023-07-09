import { RouteRecordRaw } from 'vue-router';

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    component: () => import('layouts/LoginLayout.vue'),
    children: [
      { path: '', component: () => import('pages/admin/loginPage.vue') },
    ],
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
    path: '/dashboard',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      {
        path: '/dashboard',
        name: 'dashboard',
        component: () => import('pages/admin/principalPage.vue'),
      },
      {
        path: '/listEstacao',
        name: 'listEstacao',
        component: () => import('pages/admin/listEstacaoPage.vue'),
      },
      {
        path: '/estacao',
        name: 'estacao',
        component: () => import('pages/admin/estacaoPage.vue'),
      },
      {
        path: '/listUsers',
        name: 'listUsers',
        component: () => import('pages/admin/listUsersPage.vue'),
      },
      {
        path: '/cliente',
        name: 'cliente',
        component: () => import('pages/admin/clientePage.vue'),
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
