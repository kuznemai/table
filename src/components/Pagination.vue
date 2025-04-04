<script setup lang="ts">
import { computed, ref, watch } from 'vue';

const props = defineProps({
  filteredPosts: Array,
});

const currentPage = ref<number>(1);
const postsPerPage = 25;
const amountOfPages = computed(() => Math.ceil(props.filteredPosts.length / postsPerPage));

const paginatedposts = computed(() => {
  const start = (currentPage.value - 1) * postsPerPage;
  const end = start + postsPerPage;
  return props.filteredPosts.slice(start, end);
  console.log('paginatedposts.value', paginatedposts.value);
});

function handlePropagationClick(page: number) {
  currentPage.value = page;
  sendUpdatedPaginatedPosts();
}

function nextPage() {
  if (currentPage.value !== Math.ceil(props.filteredPosts.length / postsPerPage)) {
    currentPage.value++;
    handlePropagationClick(currentPage.value);
  }
}

function previousPage() {
  if (currentPage.value !== 1) {
    currentPage.value--;
    handlePropagationClick(currentPage.value);
  }
}

const emit = defineEmits(['paginatedposts']);
function sendUpdatedPaginatedPosts() {
  emit('paginatedposts', paginatedposts.value);
}
watch(
  () => props.filteredPosts,
  () => {
    sendUpdatedPaginatedPosts();
  }
);

// const emit = defineEmits(['getSortFromParent']);
//
// function getSorting(payload: { sortBy: string; header: string }) {
//   emit('getSortFromParent', payload);
// }
</script>

<template>
  <div class="pagination-buttons">
    <button class="pagination-button" @click="previousPage"><</button>
    <button
      class="pagination-button"
      :class="[currentPage === page ? 'active' : '']"
      v-for="page in amountOfPages"
      :key="page"
      @click="handlePropagationClick(page)"
    >
      {{ page }}
    </button>
    <button class="pagination-button" @click="nextPage">></button>
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
</style>
