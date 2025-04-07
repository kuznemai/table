<script setup lang="ts">
import PostsPage from '@/components/pages/PostsPage.vue';
import { ref } from 'vue';
import AlbumsPage from '@/components/pages/AlbumsPage.vue';

interface Post {
  userId: number;
  id: number;
  title: string;
  body: string;
}

interface User {
  id: number;
  name: string;
  username: string;
  email: string;
  address: {
    company: string;
    email: string;
    id: number;
    name: string;
    phone: string;
    username: string;
    website: string;
  };
}

const chosenTab = ref('albums');
</script>

<template>
  <div class="tabs-container">
    <nav class="tabs">
      <router-link to="/posts" :class="{ active: $route.path === '/posts' }">Posts</router-link>
      <router-link to="/albums" :class="{ active: $route.path === '/albums' }">Albums</router-link>
    </nav>
    <!--    <router-view />-->
    <!--    <div class="tabs">-->
    <!--      <button @click="chosenTab = 'posts'" :class="{ active: chosenTab === 'posts' }">Posts</button>-->
    <!--      <button @click="chosenTab = 'albums'" :class="{ active: chosenTab === 'albums' }">-->
    <!--        Albums-->
    <!--      </button>-->
    <!--    </div>-->
  </div>

  <!--  <PostsPage v-if="chosenTab === 'posts'" />-->
  <!--  <AlbumsPage v-if="chosenTab === 'albums'" />-->
  <router-view />
</template>

<style scoped>
.tabs-container {
}

.tabs {
  display: flex;
  gap: 10px;
  margin-bottom: 20px;
}

.tabs > * {
  width: 100px;
  height: 40px;
  color: #000000;
  font-size: 18px;
  padding: 5px;
  text-decoration: none;
}

.active {
  background-color: #8c8c8c;
}
</style>
