<script setup lang="ts">
import { onMounted, ref, computed } from 'vue';
import UniversalTableComponent from '@/components/UniversalTableComponent.vue';

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
const headersArr = ref<string[]>([]);
const postId = ref();

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
  getComments(postId.value);
});

function mergeUsers() {
  if (posts.value.length === 0 || users.value.length === 0) return;

  mergedposts.value = posts.value.map((elem: Post) => {
    const post = users.value.find((user: User) => elem.userId === user.userId);
    if (post) {
      return { ...elem, username: post.username };
    } else {
      return elem;
    }
  });

  headersArr.value = Object.keys(mergedposts.value[0]);
}

// -------------Data request for modal---------------
const comments = ref([]);

function getDataFromTableRow(payload) {
  console.log('ivegotthepayloaaaad', payload);
  postId.value = payload.postId;
  if (payload.isModalOpen === true) {
    getComments(payload.postId);
  }
}
async function getComments(postId: number) {
  try {
    const response = await fetch('https://jsonplaceholder.typicode.com/comments');
    if (response.ok) {
      const data = await response.json();
      console.log('hghghghghghgh', data);
      comments.value = data.filter((elem) => elem.postId === postId);
    }
  } catch (err) {
    console.log('Error');
  }
}

// onMounted(() => getComments());
</script>

<template>
  <UniversalTableComponent
    :mergedposts="mergedposts"
    :headers-arr="headersArr"
    :modal-data="comments"
    @modal-opened="getDataFromTableRow"
  ></UniversalTableComponent>
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
</style>
