import { createMemoryHistory, createRouter, type RouteRecordRaw } from 'vue-router';

const routes: RouteRecordRaw[] = [
  { path: '/', redirect: '/home' },
  { path: '/home', component: () => import('@/view/home/index.vue') },
  { path: '/search', component: () => import('@/view/search/index.vue') },
];

const router = createRouter({
  history: createMemoryHistory(),
  routes,
});

export default router;
