<script setup lang="ts">
import { onMounted, ref, watch } from 'vue';
import UniversalTableComponent from '@/components/UniversalTableComponent.vue';
import { useRoute, useRouter } from 'vue-router';
import PostPagePopup from '@/components/popups/PostPagePopup.vue';
import UniversalModalWindow from '@/components/UniversalModalWindow.vue';
import AlbumsPagePopup from '@/components/popups/AlbumsPagePopup.vue';

const router = useRouter();
const route = useRoute();

const postId = ref();
const sort = ref({ sortBy: 'lowtohigh', header: 'postId' });
const selectedMainHeader = ref('');
const inputVal = ref('');
const currentPage = ref();
const isModalOpen = ref(false);

// watch(
//   () => [sort.value, selectedMainHeader.value, inputVal.value, currentPage.value],
//   () => {
//     router.push({
//       query: {
//         ...route.query,
//         sortBy: sort.value.sortBy,
//         header: sort.value.header,
//         selectedMainHeader: selectedMainHeader.value,
//         inputVal: inputVal.value,
//         currentPage: currentPage.value.toString(),
//       },
//     });
//   }
// );

// watch(() => {
//   sort.sortBy = route.query.sortBy?.toString() || 'lowtohigh';
//   sort.header = route.query.header?.toString() || 'postId';
//   selectedMainHeader.value = route.query.selectedMainHeader?.toString() || '';
//   inputVal.value = route.query.inputVal?.toString() || '';
//   currentPage.value = route.query.currentPage?.toString() || '';
//   postId.value = route.query.postId?.toString() || '';
//   console.log('route.query', route.query);
// });
const albumsArr = ref([]);
const headersArr = ref([]);

async function getAlbums() {
  try {
    const response = await fetch('https://jsonplaceholder.typicode.com/albums');
    if (response.ok) {
      // const data = await response.json();
      albumsArr.value = await response.json();
      console.log('albumsArr.value', albumsArr.value);
      // albumsArr.value = data.map(({ id, ...rest }) => ({
      //   postId: id,
      //   ...rest,
      // }));
    }
    headersArr.value = Object.values(Object.keys(albumsArr.value[0]));
    console.log('headersArr.value', headersArr.value);
  } catch (error) {
    console.error('Error:', error);
  }
}

onMounted(getAlbums);

// -------------Data request for modal---------------
// const photos = ref([]);
const tableRowObj = ref({});
async function getDataFromTableRow2(payload) {
  tableRowObj.value = payload;
  console.log('ivegotthepayloaaaad', payload);
  isModalOpen.value = true;
  router.push({
    query: {
      ...route.query,
      isModalOpen: isModalOpen.value,
    },
  });
}

watch(
  () => route.query,
  (newQuery) => {
    isModalOpen.value = newQuery.isModalOpen?.toString() || '';
  },
  { immediate: true }
);
// async function getComments(postId: number) {
//   try {
//     const response = await fetch('https://jsonplaceholder.typicode.com/photos');
//     if (response.ok) {
//       const data = await response.json();
//       console.log('hghghghghghgh', data);
//       photos.value = data.filter((elem) => elem.albumId === postId);
//     }
//   } catch (err) {
//     console.log('Error');
//   }
// }
</script>

<template>
  <UniversalTableComponent
    :mergedposts="albumsArr"
    :headers-arr="headersArr"
    @onClickRow="getDataFromTableRow2"
  ></UniversalTableComponent>
  <UniversalModalWindow v-if="isModalOpen" @closeModal="isModalOpen = false">
    <albums-page-popup :tableRowObj="tableRowObj"></albums-page-popup>
  </UniversalModalWindow>
</template>

<style scoped>
table {
  width: 100%;
  border-collapse: collapse;
  font-family: Arial, sans-serif;
}

th,
td {
  padding: 10px;
  border: 1px solid #ddd;
  text-align: left;
}

th {
  background-color: #f4f4f4;
  font-weight: bold;
}

tbody tr:nth-child(even) {
  background-color: #f9f9f9;
}

tbody tr:hover {
  background-color: #e2e8f0;
}

td {
  transition: background-color 0.3s;
}

thead {
  border-bottom: 2px solid #ccc;
}

table-row {
  cursor: pointer;
}
</style>
