<script setup lang="ts">
import { computed, onMounted, ref, watch } from 'vue';
import { useRoute, useRouter } from 'vue-router';

const props = defineProps({
  filteredPosts: Array,
  // currentPage: Number,
});

const postsPerPage = 25;
const amountOfPages = computed(() => Math.ceil(props.filteredPosts.length / postsPerPage));
const currentPage = ref(1);

const paginatedposts = computed(() => {
  const start = (currentPage.value - 1) * postsPerPage;
  const end = start + postsPerPage;
  return props.filteredPosts.slice(start, end);
  console.log('paginatedposts.value', paginatedposts.value);
});

function handlePropagationClick(page: number) {
  currentPage.value = page;
  emit('sendCurrentPage', page);
  console.log('page', page);
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

const emit = defineEmits(['paginatedposts', 'sendCurrentPage']);
function sendUpdatedPaginatedPosts() {
  emit('paginatedposts', paginatedposts.value);
}
watch(
  () => props.filteredPosts,
  () => {
    sendUpdatedPaginatedPosts();
  }
);
onMounted(() => {
  sendUpdatedPaginatedPosts();
  const queryPage = Number(route.query.currentPage);

  if (!queryPage || isNaN(queryPage) || queryPage < 1) {
    currentPage.value = 1;

    router.replace({
      query: {
        ...route.query,
        currentPage: '1',
      },
    });
  }
});
const router = useRouter();
const route = useRoute();

watch(currentPage, (newVal) => {
  router.push({
    query: {
      ...route.query,
      currentPage: newVal,
    },
  });
});

watch(
  () => route.query,
  (newQuery) => {
    currentPage.value = Number(newQuery.currentPage);
    console.log('Number(newQuery.currentPage)', Number(newQuery.currentPage));
  },
  { immediate: true }
);
</script>

<template>
  <div class="pagination-buttons">
    <button class="pagination-button" @click="previousPage"><</button>
    <button
      class="pagination-button"
      :class="[Number(currentPage) === page ? 'active' : '']"
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
