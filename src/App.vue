<script setup lang="ts">
import Table from '@/components/Table.vue';
import { computed, onMounted, ref, watch } from 'vue';
import TableWithPagination from '@/components/TableWithPagination.vue';

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

const posts = ref<Post[]>([]);
const users = ref<User[]>([]);
const mergedposts = ref<Merged[]>([]);
const currentPage = ref<number>(1);
const postsPerPage = 25;
const amountOfPages = computed(() => Math.ceil(filterTableposts.value.length / postsPerPage));
const headersArr = ref<string[]>([]);

const sort = ref({ sortBy: 'lowtohigh', header: 'id' });

const selectedValue = ref('');
const inputVal = ref('');

// ----------------------requests and merging data-----------------------------------
async function getData() {
  try {
    const response = await fetch('https://jsonplaceholder.typicode.com/posts');
    if (response.ok) {
      posts.value = await response.json();
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
      users.value = await response.json();
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
    const post = users.value.find((user: User) => elem.userId === user.id);
    if (post) {
      return { ...elem, username: post.username };
    } else {
      return elem;
    }
  });

  headersArr.value = Object.keys(mergedposts.value[0]);
  console.log('mergedposts.value', mergedposts.value);
}

// ----------------------requests and merging data-----------------------------------
// -------------------Pagination---------------------------------
const paginatedposts = computed(() => {
  const start = (currentPage.value - 1) * postsPerPage;
  const end = start + postsPerPage;
  return filterTableposts.value.slice(start, end);
  console.log('paginatedposts.value', paginatedposts.value);
});

function handlePropagationClick(page: number) {
  currentPage.value = page;
}

function nextPage() {
  if (currentPage.value !== Math.ceil(mergedposts.value.length / postsPerPage)) {
    currentPage.value++;
  }
}

function previousPage() {
  if (currentPage.value !== 1) {
    currentPage.value--;
  }
}

// -------------------Pagination end---------------------------------
// ------------------Filtering------------------------------------------
function getSorting(payload) {
  console.log('payload', payload);
  sort.value = payload;
  console.log('Cортировка', sort.value);
}

// TODO:изменить название с филтра на сортировку
const isTypeInputNumber = computed(() => ['userId', 'id'].includes(selectedValue.value));
console.log('isTypeInputNumber', isTypeInputNumber);

const filterTableposts = computed(() => {
  let copymergedposts = [...mergedposts.value];

  const { sortBy: filterBy, header: selectedHeader } = sort.value;

  if (inputVal.value.length !== 0 && selectedValue.value.length !== 0) {
    console.log('inputVal.value', inputVal.value);
    console.log('selectedValue.value', selectedValue.value);
    if (isTypeInputNumber.value) {
      console.log('isTypeInputNumber.value', isTypeInputNumber.value);
      copymergedposts = copymergedposts.filter(
        (elem) => Number(elem[selectedValue.value]) === Number(inputVal.value)
      );
    } else {
      copymergedposts = copymergedposts.filter((elem) =>
        elem[selectedValue.value]?.toString().toLowerCase().includes(inputVal.value.toLowerCase())
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

// ------------------Filtering------------------------------------------
// ---------------------Filtering input-------------------------------------

// ---------------------Filtering input-------------------------------------
</script>

<template>
  <div class="select-input-container">
    <select class="select-wrapperr" v-model="selectedValue">
      <option v-for="header in headersArr" :key="header" :value="header" class="select-option">
        Filter by {{ header }}
      </option>
    </select>
    <div class="">
      <input
        v-model="inputVal"
        class="input-wrapper"
        :type="isTypeInputNumber ? 'number' : 'text'"
        placeholder="Search..."
      />
    </div>
    {{ inputVal }}
  </div>
  <table-with-pagination
    :mergedposts="paginatedposts"
    :headersArr="headersArr"
    :sort-value="sort"
    :page="currentPage"
    :amount-of-pages="amountOfPages"
    :current-page="currentPage"
    @getSortFromParent="getSorting"
    @sendPreviousEmits="previousPage()"
    @sendNextEmits="nextPage()"
    @emit-propagation="handlePropagationClick"
  ></table-with-pagination>
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
