<script setup lang="ts">
import Table from '@/components/Table.vue';
import { computed, ref } from 'vue';
import Pagination from '@/components/Pagination.vue';
import SelectInput from '@/components/SelectInput.vue';
import { createLogger } from 'vite';
// interface Props {
//   mergedposts: Merged[];
//   headersArr: string[];
//   sortValue: { sortBy: string; header: string };
//   inputVal: string;
//   selectedMainHeader: string;
// }

const props = defineProps({
  mergedposts: Array,
  headersArr: Array,
});
const selectedMainHeader = ref('');
const inputVal = ref('');

const sort = ref({ sortBy: 'lowtohigh', header: 'postId' });

// const currentPage = ref<number>(1);
// const postsPerPage = 25;
// const amountOfPages = computed(() => Math.ceil(props.mergedposts.length / postsPerPage));
//
// const paginatedposts = computed(() => {
//   const start = (currentPage.value - 1) * postsPerPage;
//   const end = start + postsPerPage;
//   return props.mergedposts.slice(start, end);
//   console.log('paginatedposts.value', paginatedposts.value);
// });
//
// function handlePropagationClick(page: number) {
//   currentPage.value = page;
// }
//
// function nextPage() {
//   if (currentPage.value !== Math.ceil(props.mergedposts.length / postsPerPage)) {
//     currentPage.value++;
//   }
// }
//
// function previousPage() {
//   if (currentPage.value !== 1) {
//     currentPage.value--;
//   }
// }

// const emit = defineEmits(['getSortFromParent']);
//
// function getSorting(payload: { sortBy: string; header: string }) {
//   emit('getSortFromParent', payload);
// }

// / ------------------Filtering------------------------------------------

function getSorting(payload: { sortBy: string; header: string }) {
  console.log('payload', payload);
  sort.value = payload;
  console.log('Cортировка', sort.value);
}
// function handleSelectValue(event: Event, header: string) {
//   const target = event.target as HTMLSelectElement;
//   sort.value = {
//     sortBy: target.value,
//     header: header,
//   };
// }
const isTypeInputNumber = computed(() => ['userId', 'postId'].includes(selectedMainHeader.value));

const filterTableposts = computed(() => {
  if (!props.mergedposts || props.mergedposts.length === 0) return [];

  let copymergedposts = [...props.mergedposts];
  const { sortBy: filterBy, header: selectedHeader } = sort.value;

  if (inputVal.value.length !== 0 && selectedMainHeader.value.length !== 0) {
    if (isTypeInputNumber.value) {
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

  console.log('copymergedposts', copymergedposts);
  return copymergedposts;
});
const paginated = ref([]);
function getPaginatedPosts(paginatedPosts) {
  paginated.value = paginatedPosts;
  console.log('paginated.value', paginated.value);
}
</script>

<template>
  <SelectInput
    v-model:selectedMainHeader="selectedMainHeader"
    v-model:inputVal="inputVal"
    :headersArr="props.headersArr"
  ></SelectInput>
  <Table
    :mergedposts="paginated"
    :headersArr="props.headersArr"
    @getSortFromParent="getSorting"
    :sort-value="sort"
  ></Table>
  <!--  @getSortFromParent="getSorting"-->
  <!--  :sort-value="sortValue"-->
  <Pagination :filtered-posts="filterTableposts" @paginatedposts="getPaginatedPosts"></Pagination>
  <!--  <div class="pagination-buttons">-->
  <!--    <button class="pagination-button" @click="previousPage()"><</button>-->
  <!--    <button-->
  <!--      class="pagination-button"-->
  <!--      :class="[currentPage === page ? 'active' : '']"-->
  <!--      v-for="page in amountOfPages"-->
  <!--      :key="page"-->
  <!--      @click="handlePropagationClick(page)"-->
  <!--    >-->
  <!--      {{ page }}-->
  <!--    </button>-->
  <!--    <button class="pagination-button" @click="nextPage()">></button>-->
  <!--  </div>-->
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
