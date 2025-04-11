<script setup lang="ts">
import { onMounted, ref, computed, watch } from 'vue';
import UniversalTableComponent from '@/components/UniversalTableComponent.vue';
import { useRouter } from 'vue-router';
import { useRoute } from 'vue-router';

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

const router = useRouter();
const route = useRoute();

const posts = ref<Post[]>([]);
const users = ref<User[]>([]);
const mergedposts = ref<Merged[]>([]);
const headersArr = ref<string[]>([]);
const postId = ref();

// watch(
//   () => route.query,
//   (newQuery) => {
//     sort.value.sortBy = newQuery.sortBy?.toString() || 'lowtohigh';
//     sort.value.header = newQuery.header?.toString() || 'postId';
//     selectedMainHeader.value = newQuery.selectedMainHeader?.toString() || '';
//     inputVal.value = newQuery.inputVal?.toString() || '';
//     currentPage.value = newQuery.currentPage?.toString() || '';
//     postId.value = newQuery.postId?.toString() || '';
//     console.log('route.query', newQuery);
//   },
//   { immediate: true }
// );

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

onMounted(async () => {
  await Promise.all([getData(), getUserData()]);
  mergeUsers();
  // getComments(postId.value);
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
  // router.push({
  //   query: {
  //     ...route.query,
  //     postId: postId.value,
  //   },
  // });
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

// function gerPayloadForRouting(payload) {
//   sort.value.sortBy = payload.sortBy;
//   sort.value.header = payload.header;
//   console.log('я получил данные сортировки', sort.value);
//   router.push({
//     query: {
//       ...route.query,
//       sortBy: sort.value.sortBy,
//       header: sort.value.header,
//     },
//   });
// }
//
// function getSelectValue(payload) {
//   selectedMainHeader.value = payload;
//   console.log('я получил данные selectedMainHeader', selectedMainHeader.value);
//   router.push({
//     query: {
//       ...route.query,
//       selectedMainHeader: selectedMainHeader.value,
//     },
//   });
// }
// function getInputValue(payload) {
//   inputVal.value = payload;
//   console.log('я получил данные inputVal', inputVal.value);
//   router.push({
//     query: {
//       ...route.query,
//       inputVal: inputVal.value,
//     },
//   });
// }
//
// function getPage(page) {
//   currentPage.value = page;
//   console.log('currentPage.value', currentPage.value);
//   router.push({
//     query: {
//       ...route.query,
//       currentPage: currentPage.value,
//     },
//   });
// }
// function getSort(payload) {
//   sort.value.sortBy = payload.sortBy;
//   sort.value.header = payload.header;
//   router.push({
//     query: {
//       ...route.query,
//       sortBy: sort.value.sortBy,
//       header: sort.value.header,
//     },
//   });
//   console.log('payloadinpostspage', payload);
// }

// watch(inputVal, (newVal) => {
//   router.push({
//     query: {
//       ...route.query,
//       inputVal: newVal,
//     },
//   });
// });
//
// watch(selectedMainHeader, (newVal) => {
//   router.push({
//     query: {
//       ...route.query,
//       selectedMainHeader: newVal,
//     },
//   });
// });
//
// watch(sort, (newVal) => {
//   router.push({
//     query: {
//       ...route.query,
//       sortBy: newVal.sortBy,
//       header: newVal.header,
//     },
//   });
// });

// watch(currentPage, (newVal) => {
//   router.push({
//     query: {
//       ...route.query,
//       currentPage: newVal,
//     },
//   });
// });
</script>

<template>
  <UniversalTableComponent
    :mergedposts="mergedposts"
    :headers-arr="headersArr"
    :modal-data="comments"
    @modalOpened="getDataFromTableRow"
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
