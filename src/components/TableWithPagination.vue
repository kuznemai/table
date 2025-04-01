<script setup lang="ts">
import Table from '@/components/Table.vue';
import { computed, ref } from 'vue';
interface Props {
  mergedposts: Merged[];
  headersArr: string[];
  sortValue: { sortBy: string; header: string };
}

const props = defineProps<Props>();
const currentPage = ref<number>(1);
const postsPerPage = 25;
const amountOfPages = computed(() => Math.ceil(props.mergedposts.length / postsPerPage));

const paginatedposts = computed(() => {
  const start = (currentPage.value - 1) * postsPerPage;
  const end = start + postsPerPage;
  return props.mergedposts.slice(start, end);
  console.log('paginatedposts.value', paginatedposts.value);
});

function handlePropagationClick(page: number) {
  currentPage.value = page;
}

function nextPage() {
  if (currentPage.value !== Math.ceil(props.mergedposts.length / postsPerPage)) {
    currentPage.value++;
  }
}

function previousPage() {
  if (currentPage.value !== 1) {
    currentPage.value--;
  }
}

const emit = defineEmits(['getSortFromParent']);

function getSorting(payload: { sortBy: string; header: string }) {
  emit('getSortFromParent', payload);
}
</script>

<template>
  <Table
    :paginatedposts="paginatedposts"
    :headersArr="headersArr"
    @getSortFromParent="getSorting"
    :sort-value="sortValue"
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
.table {
  border: 1px solid black;
  padding: 15px;
  border-collapse: collapse;
}

.table-header {
  border: 1px solid black;
  border-collapse: collapse;
  padding: 10px;
  background-color: #e8e8e8;
}

.table-cell {
  border: 1px solid black;
  border-collapse: collapse;
  padding: 10px;
}

.header-options {
  display: flex;
  flex-direction: column;
}

.select-wrapper {
  max-width: 150px;
  margin: 10px auto 5px auto;
}

.font-bold {
  font-size: 18px;
  font-weight: 500;
}
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
