import { createRouter, createWebHistory } from 'vue-router';

import AlbumsPage from '@/components/pages/AlbumsPage.vue';
import PostsPage from '@/components/pages/PostsPage.vue';

const routes = [
  {
    path: '/albums',
    name: 'albums',
    component: AlbumsPage,
  },
  {
    path: '/posts',
    name: 'post',
    component: PostsPage,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
