<script setup lang="ts">
import PostsPage from '@/components/pages/PostsPage.vue';
import { ref } from 'vue';
import AlbumsPage from '@/components/pages/AlbumsPage.vue';
import Pagination from '@/components/Pagination.vue';

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

const chosenTab = ref('posts');
</script>

<template>
  <div class="tabs-container">
    <!--    <nav>-->
    <!--      <router-link to="/posts">Главная</router-link>-->
    <!--      <router-link to="/albums">О нас</router-link>-->
    <!--    </nav>-->
    <!--    <router-view />-->
    <div class="tabs">
      <button @click="chosenTab = 'posts'" :class="{ active: chosenTab === 'posts' }">Posts</button>
      <button @click="chosenTab = 'albums'" :class="{ active: chosenTab === 'albums' }">
        Albums
      </button>
    </div>
  </div>

  <posts-page v-if="chosenTab === 'posts'" />
  <albums-page v-if="chosenTab === 'albums'" />
</template>

<style scoped>
.tabs-container {
  padding: 20px;
}

.tabs {
  display: flex;
  gap: 10px;
  margin-bottom: 20px;
}

.tabs > button {
  width: 100px;
  height: 40px;
}

.active {
  background-color: #8c8c8c;
}
</style>
