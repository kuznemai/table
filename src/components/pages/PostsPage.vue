<script setup lang="ts">
import Table from '@/App.vue';
import TableWithPagination from '@/components/TableWithPagination.vue';
import { onMounted, ref } from 'vue';

interface Post {
  userId: number;
  postId: number;
  title: string;
  body: string;
}

interface User {
  userId: number;
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

const posts = ref<Post[]>([]);
const users = ref<User[]>([]);
const mergedposts = ref<Merged[]>([]);
async function getData() {
  try {
    const response = await fetch('https://jsonplaceholder.typicode.com/posts');
    if (response.ok) {
      const data = await response.json();
      posts.value = data.map(({ id, ...rest }) => ({
        postId: id,
        ...rest,
      }));
      console.log('posts', posts.value);
    }
  } catch (error) {
    console.error('Error:', error);
  }
}
async function getUserData() {
  try {
    const response = await fetch('https://jsonplaceholder.typicode.com/users');
    if (response.ok) {
      const data = await response.json();
      users.value = data.map(({ id, ...rest }) => ({
        userId: id,
        ...rest,
      }));
      console.log('users', users.value);
    }
  } catch (error) {
    console.error('Error:', error);
  }
}

onMounted(async () => {
  await Promise.all([getData(), getUserData()]);
  mergeUsers();
});
function mergeUsers() {
  mergedposts.value = posts.value.map((elem: Post) => {
    const post = users.value.find((user: User) => elem.userId === user.userId);
    if (post) {
      return { ...elem, username: post.username };
    } else {
      return elem;
    }
  });

  headersArr.value = Object.keys(mergedposts.value[0]);
  console.log('mergedposts.value', mergedposts.value);
}
</script>

<template>
  <table-with-pagination></table-with-pagination>
</template>

<style scoped></style>
