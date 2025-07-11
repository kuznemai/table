import { createRouter, createWebHashHistory } from 'vue-router';

import AlbumsPage from '@/components/pages/AlbumsPage.vue';
import PostsPage from '@/components/pages/PostsPage.vue';

const routes = [
  { path: '/', redirect: '/posts' },
  { path: '/posts', component: PostsPage },
  { path: '/albums', component: AlbumsPage },
];

const router = createRouter({
  history: createWebHashHistory('/table/'),
  routes,
});

export default router;
