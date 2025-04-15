<script setup lang="ts">
import Table from '@/components/Table.vue';
import { computed, onMounted, ref, watch } from 'vue';
import Pagination from '@/components/Pagination.vue';
import SelectInput from '@/components/SelectInput.vue';
import { useRoute, useRouter } from 'vue-router';

interface Props {
  mergedposts: Merged[];
  headersArr: string[];
  sortValue: { sortBy: string; header: string };
  inputVal: string;
  selectedMainHeader: string;
}
interface SortValue {
  sortBy: string;
  header: string;
}
interface Merged {
  userId: number;
  postId: number;
  id: number;
  title: string;
  body: string;
  username: string;
  [key: string]: string | number; // Index signature for dynamic properties
}
const props = defineProps<Props>();
//   {mergedposts: Array,
// headersArr: Array,
// modalData: Array,}

const currentPage = ref<number>(1);
const selectedMainHeader = ref<string>('');
const inputVal = ref<string>('');
const sort = ref<SortValue>({ sortBy: '', header: '' });

const router = useRouter();
const route = useRoute();
const emit = defineEmits(['onClickRow', 'sendPostIdToPosts']);

// / ------------------Filtering------------------------------------------

function getSorting(payload: SortValue): void {
  sort.value = payload;
}

const isTypeInputNumber = computed<boolean>(() =>
  ['userId', 'postId'].includes(selectedMainHeader.value)
);

const filterTableposts = computed<Merged[]>(() => {
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
      copymergedposts.sort((a: Merged, b: Merged) => a[selectedHeader] - b[selectedHeader]);
    } else if (filterBy === 'hightolow') {
      copymergedposts.sort((a: Merged, b: Merged) => b[selectedHeader] - a[selectedHeader]);
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
const universalPaginatedPosts = ref<Merged[]>([]);
function getPaginatedPosts(paginatedPosts: Merged[]): void {
  universalPaginatedPosts.value = paginatedPosts;
}

function handlePostId(payload: Merged): void {
  emit('onClickRow', payload);
}

function getCurrentPage(page: number): void {
  currentPage.value = page;
}

watch(inputVal, (newVal: string) => {
  router.push({
    query: {
      ...route.query,
      inputVal: newVal,
    },
  });
});

watch(selectedMainHeader, (newVal: string) => {
  router.push({
    query: {
      ...route.query,
      selectedMainHeader: newVal,
    },
  });
});

watch(sort, (newVal: SortValue) => {
  router.push({
    query: {
      ...route.query,
      sortBy: newVal.sortBy,
      header: newVal.header,
    },
  });
});

watch(
  () => route.query,
  (newQuery) => {
    sort.value.sortBy = newQuery.sortBy?.toString() || 'lowtohigh';
    sort.value.header = newQuery.header?.toString() || 'postId';
    selectedMainHeader.value = newQuery.selectedMainHeader?.toString() || '';
    inputVal.value = newQuery.inputVal?.toString() || '';
  },
  { immediate: true }
);
</script>

<template>
  <SelectInput
    v-model:selectedMainHeader="selectedMainHeader"
    v-model:inputVal="inputVal"
    :headersArr="props.headersArr"
  ></SelectInput>
  <Table
    :mergedposts="universalPaginatedPosts"
    :headersArr="props.headersArr"
    :sortValue="sort"
    :inputVal="inputVal"
    @getSortFromParent="getSorting"
    @onClickRow="handlePostId"
  ></Table>
  <!--  @getSortFromParent="getSorting"-->
  <!--  :sort-value="sortValue"-->
  <Pagination
    :filtered-posts="filterTableposts"
    :current-page="currentPage"
    @send-current-page="getCurrentPage"
    @paginatedposts="getPaginatedPosts"
  ></Pagination>
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
