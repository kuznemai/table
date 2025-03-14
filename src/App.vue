<script setup lang="ts">
import Table from "@/components/Table.vue";
import { computed, onMounted, ref, watch } from "vue";

const items = ref([]);
const users = ref([]);
const mergedItems = ref([]);
const currentPage = ref(1);
const itemsPerPage = 25;
const amountOfPages = computed(() =>
  Math.ceil(mergedItems.value.length / itemsPerPage),
);
const headersArr = ref([]);
const filterBy = ref("");
const selectedHeader = ref("");
const selectedValue = ref("");
const inputVal = ref("");

// ----------------------requests and merging data-----------------------------------
async function getData() {
  try {
    const response = await fetch("https://jsonplaceholder.typicode.com/posts");
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
    const response = await fetch("https://jsonplaceholder.typicode.com/users");
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
    const item = users.value.find((user) => elem.userId === user.id);
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
// ----------------------requests and merging data-----------------------------------
// -------------------Pagination---------------------------------
const paginatedItems = computed(() => {
  const start = (currentPage.value - 1) * itemsPerPage;
  const end = start + itemsPerPage;
  return mergedItems.value.slice(start, end);
  console.log("paginatedItems.value", paginatedItems.value);
});

function handlePropagationClick(page) {
  currentPage.value = page;
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
// -------------------Pagination end---------------------------------
// ------------------Filtering------------------------------------------
function getFilters({ sortBy, header }) {
  filterBy.value = sortBy;
  selectedHeader.value = header;
  console.log("Фильтры", filterBy.value, selectedHeader.value);
}

watch([filterBy, selectedHeader], () => {
  handleSelectTrigger(filterBy.value, selectedHeader.value);
});

function handleSelectTrigger(filterBy, selectedHeader) {
  if (typeof mergedItems.value[0][selectedHeader] === "number") {
    if (filterBy === "lowtohigh") {
      mergedItems.value.sort((a, b) => a[selectedHeader] - b[selectedHeader]);
    } else if (filterBy === "hightolow") {
      mergedItems.value.sort((a, b) => b[selectedHeader] - a[selectedHeader]);
    }
  } else if (typeof mergedItems.value[0][selectedHeader] === "string") {
    if (filterBy === "lowtohigh") {
      mergedItems.value.sort((a, b) =>
        a[selectedHeader].localeCompare(b[selectedHeader]),
      );
    } else if (filterBy === "hightolow") {
      mergedItems.value.sort((a, b) =>
        b[selectedHeader].localeCompare(a[selectedHeader]),
      );
    }
  }
}
// ------------------Filtering------------------------------------------
// ---------------------Filtering input-------------------------------------
function sortBySelectValue(event) {
  selectedValue.value = event.target.value;
  console.log("selectedValue.value", selectedValue.value);
}

function handleInputSelect(event) {
  inputVal.value = event.target.value;
  console.log(" inputVal.value", inputVal.value);
}
watch(selectedValue, () => inputSearch());
function inputSearch() {
  if (inputVal.value.length !== 0) {
    mergedItems.value = mergedItems.value.filter((elem) => {
      return Object.values(elem)
        .toLowerCase()
        .includes(inputVal.value.toLowerCase());
    });
  }
  return mergedItems.value;
}
// ---------------------Filtering input-------------------------------------
</script>

<template>
  <div class="select-input-container">
    <select @change="sortBySelectValue($event)" class="select-wrapper">
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
        @input="handleInputSelect($event)"
        class="input-wrapper"
        type="text"
        placeholder="Search..."
      />
    </div>
  </div>
  <Table
    v-model:mergedItems="paginatedItems"
    :headersArr="headersArr"
    @sendFiltersToParent="getFilters"
  ></Table>
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
