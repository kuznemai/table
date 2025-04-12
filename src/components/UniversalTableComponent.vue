<script setup lang="ts">
import Table from '@/components/Table.vue';
import { computed, onMounted, ref, watch } from 'vue';
import Pagination from '@/components/Pagination.vue';
import SelectInput from '@/components/SelectInput.vue';
import UniversalModalWindow from '@/components/UniversalModalWindow.vue';
import { useRoute, useRouter } from 'vue-router';
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
  modalData: Array,
});

const currentPage = ref();
const selectedMainHeader = ref('');
const inputVal = ref('');
const sort = ref({ sortBy: '', header: '' });

const router = useRouter();
const route = useRoute();
const emit = defineEmits(['onClickRow', 'sendPostIdToPosts']);

// const comments = computed(() => (comments.value = props.modalData));

// / ------------------Filtering------------------------------------------

function getSorting(payload: { sortBy: string; header: string }) {
  console.log('payload', payload);
  sort.value = payload;
  console.log('Cортировка', sort.value);
}

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

  return copymergedposts;
});
const paginated = ref([]);
function getPaginatedPosts(paginatedPosts) {
  paginated.value = paginatedPosts;
}

function handlePostId(payload) {
  console.log('object', payload);
  // console.log('universaltableisopened', isModalOpen.value, postId.value, payload);
  // isModalOpen.value = payload.isModalOpen;
  // postId.value = payload.postId;
  // console.log('universaltableisopened2222', isModalOpen.value, postId.value, payload);
  emit('onClickRow', payload);
}

// onMounted(() => {
//   if (isModalOpen.value === true) {
//     console.log('finallll', isModalOpen.value, postId.value);
//     emit('modalOpened', {
//       isModalOpen: isModalOpen.value,
//       postId: postId.value,
//     });
//   }
// });
function getCurrentPage(page) {
  currentPage.value = page;
}
// function updateModal(val) {
//   isModalOpen.value = val;
// }

watch(inputVal, (newVal) => {
  router.push({
    query: {
      ...route.query,
      inputVal: newVal,
    },
  });
});

watch(selectedMainHeader, (newVal) => {
  router.push({
    query: {
      ...route.query,
      selectedMainHeader: newVal,
    },
  });
});

watch(sort, (newVal) => {
  router.push({
    query: {
      ...route.query,
      sortBy: newVal.sortBy,
      header: newVal.header,
    },
  });
});

watch(currentPage, (newVal) => {
  router.push({
    query: {
      ...route.query,
      currentPage: newVal,
    },
  });
});
// watch(postId, (newPostId) => {
//   router.push({
//     query: {
//       ...route.query,
//       postId: newPostId,
//     },
//   });
// });
// watch(isModalOpen, (newModalState) => {
//   console.log('testtesttest', isModalOpen.value);
//   router.push({
//     query: {
//       ...route.query,
//       isModalOpen: newModalState,
//     },
//   });
// });

watch(
  () => route.query,
  (newQuery) => {
    sort.value.sortBy = newQuery.sortBy?.toString() || 'lowtohigh';
    sort.value.header = newQuery.header?.toString() || 'postId';
    selectedMainHeader.value = newQuery.selectedMainHeader?.toString() || '';
    inputVal.value = newQuery.inputVal?.toString() || '';
    currentPage.value = newQuery.currentPage?.toString() || '';
    // isModalOpen.value = newQuery.isModalOpen?.toString() || '';
    // postId.value = newQuery.postId?.toString() || '';
    console.log('route.query', newQuery);
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
    :mergedposts="paginated"
    :headersArr="props.headersArr"
    :sortValue="sort"
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
  <!--  <UniversalModalWindow-->
  <!--    :is-modal-open="isModalOpen"-->
  <!--    :post-id="postId"-->
  <!--    :data-for-render="props.modalData"-->
  <!--    @closeModal="isModalOpen = false"-->
  <!--  ></UniversalModalWindow>-->

  <!--  @update:isModalOpen="updateModal"-->
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
