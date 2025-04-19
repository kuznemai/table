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

  [key: string]: string | number;
}

const props = defineProps<Props>();

const currentPage = ref<number>(1);

const selectedMainHeader = ref<string>('');
const inputVal = ref<string>('');
const sort = ref<SortValue>({ sortBy: '', header: '' });

const router = useRouter();
const route = useRoute();
const emit = defineEmits(['onClickRow', 'sendPostIdToPosts']);

// / ------------------Filtering------------------------------------------
function checkInitialState() {
  sort.value.sortBy = route.query.sortBy?.toString() || 'lowtohigh';
  sort.value.header = route.query.header?.toString() || 'postId';
  selectedMainHeader.value = route.query.selectedMainHeader?.toString() || '';
  inputVal.value = route.query.inputVal?.toString() || '';
  currentPage.value = Number(route.query.currentPage) || 1;
}
checkInitialState();

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

  if (inputVal.value && selectedMainHeader.value.length !== 0) {
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

function handlePostId(payload: Merged): void {
  console.log('etoidpayloadcheck', payload);
  emit('onClickRow', payload);
}

watch([sort, inputVal, selectedMainHeader, currentPage], (newVal) => {
  let defaultQuery = {
    sortBy: newVal[0].sortBy,
    header: newVal[0].header,
    inputVal: newVal[1],
    selectedMainHeader: newVal[2],
    currentPage: newVal[3],
  };

  defaultQuery = Object.fromEntries(Object.entries(defaultQuery).filter(([key, value]) => value));

  router.push({
    query: defaultQuery,
  });
});

const postsPerPage = 25;
const amountOfPages = computed(() => Math.ceil(filterTableposts.value.length / postsPerPage));
const paginatedposts = computed(() => {
  const start = (currentPage.value - 1) * postsPerPage;
  const end = start + postsPerPage;
  return filterTableposts.value.slice(start, end);
});
</script>

<template>
  <SelectInput
    v-model:selectedMainHeader="selectedMainHeader"
    v-model:inputVal="inputVal"
    :headersArr="props.headersArr"
    layout="row"
  ></SelectInput>
  <Table
    :mergedposts="paginatedposts"
    :headersArr="props.headersArr"
    :sortValue="sort"
    :inputVal="inputVal"
    :selected-main-header="selectedMainHeader"
    @getSortFromParent="getSorting"
    @onClickRow="handlePostId"
  ></Table>
  <Pagination v-model:currentPage="currentPage" v-model:amountOfPages="amountOfPages"></Pagination>
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
