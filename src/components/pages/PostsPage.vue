<script setup lang="ts">
import TableWithPagination from '../TableWithPagination.vue';
import { onMounted, ref, computed } from 'vue';
import SelectInput from '../SelectInput.vue';

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
const sort = ref({ sortBy: 'lowtohigh', header: 'postId' });
const headersArr = ref<string[]>([]);

const selectedMainHeader = ref('');
const inputVal = ref('');

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

// ------------------Filtering------------------------------------------

function getSorting(payload: { sortBy: string; header: string }) {
  console.log('payload', payload);
  sort.value = payload;
  console.log('Cортировка', sort.value);
}
const isTypeInputNumber = computed(() => ['userId', 'postId'].includes(selectedMainHeader.value));

const filterTableposts = computed(() => {
  let copymergedposts = [...mergedposts.value];

  const { sortBy: filterBy, header: selectedHeader } = sort.value;

  if (inputVal.value.length !== 0 && selectedMainHeader.value.length !== 0) {
    if (isTypeInputNumber.value) {
      console.log('isTypeInputNumber.value', isTypeInputNumber.value);
      copymergedposts = copymergedposts.filter(
        (elem) => Number(elem[selectedMainHeader.value]) === Number(inputVal.value)
      );
    } else {
      copymergedposts = copymergedposts.filter((elem) =>
        elem[selectedMainHeader.value]
          ?.toString()
          .toLowerCase()
          .includes(inputVal.value.toLowerCase())
      );
    }
  }

  if (copymergedposts.length > 0 && typeof copymergedposts[0][selectedHeader] === 'number') {
    if (filterBy === 'lowtohigh') {
      copymergedposts.sort((a, b) => a[selectedHeader] - b[selectedHeader]);
    } else if (filterBy === 'hightolow') {
      copymergedposts.sort((a, b) => b[selectedHeader] - a[selectedHeader]);
    }
  } else if (copymergedposts.length > 0 && typeof copymergedposts[0][selectedHeader] === 'string') {
    if (filterBy === 'lowtohigh') {
      copymergedposts.sort((a, b) =>
        a[selectedHeader].toLowerCase().localeCompare(b[selectedHeader])
      );
    } else if (filterBy === 'hightolow') {
      copymergedposts.sort((a, b) =>
        b[selectedHeader].toLowerCase().localeCompare(a[selectedHeader])
      );
    }
  }
  return copymergedposts;
});
</script>

<template>
  <select-input
    v-model:selectedMainHeader="selectedMainHeader"
    v-model:inputVal="inputVal"
    :headersArr="headersArr"
  ></select-input>
  <table-with-pagination
    :mergedposts="filterTableposts"
    :headers-arr="headersArr"
    :sort-value="sort"
    :input-val="inputVal"
    :selected-main-header="selectedMainHeader"
    @getSortFromParent="getSorting"
  ></table-with-pagination>
</template>

<style scoped></style>
