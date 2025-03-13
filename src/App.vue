<script setup>
import Table from "@/components/Table.vue";
import { computed, onMounted, ref } from "vue";

let items = ref([]);
let users = ref([]);
let mergedItems = ref([]);
let currentPage = ref(1);
let itemsPerPage = 25;
let amountOfPages = computed(() =>
  Math.ceil(mergedItems.value.length / itemsPerPage),
);
let isActive = ref(false);
let headersArr = ref([]);
let selectedValue = ref("");

async function getData() {
  try {
    let response = await fetch("https://jsonplaceholder.typicode.com/posts");
    if (response.ok) {
      items.value = await response.json();
      console.log("items", items.value);
    }
  } catch (error) {
    console.error("Error:", error);
  }
}

async function getUserData() {
  try {
    let response = await fetch("https://jsonplaceholder.typicode.com/users");
    if (response.ok) {
      users.value = await response.json();
      console.log("users", users.value);
    }
  } catch (error) {
    console.error("Error:", error);
  }
}

onMounted(async () => {
  await Promise.all([getData(), getUserData()]);
  mergeUsers();
});

function mergeUsers() {
  mergedItems.value = items.value.map((elem) => {
    let item = users.value.find((user) => elem.userId === user.id);
    if (item) {
      return { ...elem, username: item.username };
    } else {
      return elem;
    }
  });
  console.log("mergedItems.value", mergedItems.value);
  console.log("amountOfPages", amountOfPages.value);
  headersArr.value = Object.keys(mergedItems.value[0]);
  console.log("headersArr.value", headersArr.value);
}

let paginatedItems = computed(() => {
  let start = (currentPage.value - 1) * itemsPerPage;
  let end = start + itemsPerPage;
  return mergedItems.value.slice(start, end);
  console.log("paginatedItems.value", paginatedItems.value);
});

function handlePropagationClick(page) {
  currentPage.value = page;
  isActive.value = true;
}

function nextPage() {
  if (
    currentPage.value !== Math.ceil(mergedItems.value.length / itemsPerPage)
  ) {
    currentPage.value++;
  }
}

function previousPage() {
  if (currentPage.value !== 1) {
    currentPage.value--;
  }
}

function sortBySelectValue(event) {
  selectedValue.value = event.target.value;
  return mergedItems.value.sort(
    (a, b) => a.event.target.value - b.event.target.value,
  );
}
</script>

<template>
  <div class="select-input-container">
    <select @change="sortBySelectValue" class="select-wrapper">
      <option
        v-for="header in headersArr"
        :key="header"
        :value="header"
        class="select-option"
      >
        Sort by {{ header }}
      </option>
    </select>
    <div class="">
      <input
        @input=""
        class="input-wrapper"
        type="text"
        placeholder="Search..."
      />
    </div>
  </div>
  <Table v-model:mergedItems="paginatedItems" :headersArr="headersArr"></Table>
  <div class="pagination-buttons">
    <button class="pagination-button" @click="previousPage()"><</button>
    <button
      class="pagination-button"
      :class="[currentPage === page ? 'active' : '']"
      v-for="page in amountOfPages"
      :key="page"
      @click="handlePropagationClick(page)"
    >
      {{ page }}
    </button>
    <button class="pagination-button" @click="nextPage()">></button>
  </div>
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

.select-wrapper,
.input-wrapper {
  width: 200px;
  height: 40px;
  margin-bottom: 20px;
}
</style>
