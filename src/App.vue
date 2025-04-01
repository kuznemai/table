<script setup lang="ts">
import Table from '@/components/Table.vue';
import { computed, onMounted, ref, watch } from 'vue';
import TableWithPagination from '@/components/TableWithPagination.vue';
import SelectInput from '@/components/SelectInput.vue';
import PostsPage from '@/components/pages/PostsPage.vue';

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
</script>

<template>
  <posts-page></posts-page>
</template>

<style scoped>
.pagination-buttons {
  display: flex;
  flex-direction: row;
  justify-content: center;
  padding-top: 30px;
}

.pagination-button {
  width: 40px;
  height: 40px;
  border: 1px solid black;
  border-radius: 5px;
  margin: 5px;
}

.pagination-button:hover {
  background-color: #cccccc;
  transition: 0.3s;
}

.active {
  background-color: #8c8c8c;
}

.select-input-container {
  display: flex;
  flex-direction: row;
  gap: 20px;
}

.select-wrapperr,
.input-wrapper {
  width: 200px;
  height: 40px;
  margin-bottom: 20px;
}
</style>
