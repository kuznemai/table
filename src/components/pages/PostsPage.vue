<script setup lang="ts">
import { onMounted, ref, computed, watch } from 'vue';
import UniversalTableComponent from '@/components/UniversalTableComponent.vue';
import { useRouter } from 'vue-router';
import { useRoute } from 'vue-router';
import UniversalModalWindow from '@/components/UniversalModalWindow.vue';
import PostPagePopup from '@/components/popups/PostPagePopup.vue';

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
const openPopupModalId = ref(null);

const router = useRouter();
const route = useRoute();

async function getData() {
  try {
    const response = await fetch('https://jsonplaceholder.typicode.com/posts');
    if (response.ok) {
      const data = await response.json();
      posts.value = data.map(({ id, ...rest }) => ({
        postId: id,
        ...rest,
      }));
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
    }
  } catch (error) {
    console.error('Error:', error);
  }
}

function checkIsOpenPopup() {
  openPopupModalId.value = Number(route.query.modalPopup) || null;
}
checkIsOpenPopup();

onMounted(async () => {
  await Promise.all([getData(), getUserData()]);
  mergeUsers();
  console.log('route.query.isModalOpen', route.query.isModalOpen);

  if (route.query.modalPopup) {
    await getDataFromTableRow({
      postId: Number(route.query.modalPopup),
    });
  }
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

async function getDataFromTableRow(payload) {
  openPopupModalId.value = payload.postId;
  console.log('ivegotthepayloaaaad', payload);
}

function closeModalWindow() {
  openPopupModalId.value = null;
}
</script>

<template>
  <UniversalTableComponent
    :mergedposts="mergedposts"
    :headers-arr="headersArr"
    @onClickRow="getDataFromTableRow"
    @sendPostIdToPosts="getDataFromTableRow"
  ></UniversalTableComponent>
  <UniversalModalWindow
    v-if="openPopupModalId"
    @closeModal="closeModalWindow"
    :id="openPopupModalId"
  >
    <post-page-popup :id="openPopupModalId"></post-page-popup>
  </UniversalModalWindow>
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
