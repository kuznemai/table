<script setup lang="ts">
import { onMounted, ref, watch } from 'vue';
import UniversalTableComponent from '@/components/UniversalTableComponent.vue';
import { useRoute, useRouter } from 'vue-router';

import UniversalModalWindow from '@/components/UniversalModalWindow.vue';
import AlbumsPagePopup from '@/components/popups/AlbumsPagePopup.vue';

const router = useRouter();
const route = useRoute();

const isModalOpen = ref(false);

const albumsArr = ref([]);
const headersArr = ref([]);

async function getAlbums() {
  try {
    const response = await fetch('https://jsonplaceholder.typicode.com/albums');
    if (response.ok) {
      // const data = await response.json();
      albumsArr.value = await response.json();
      console.log('albumsArr.value', albumsArr.value);
    }
    headersArr.value = Object.values(Object.keys(albumsArr.value[0]));
    console.log('headersArr.value', headersArr.value);
  } catch (error) {
    console.error('Error:', error);
  }
}

onMounted(async () => {
  await getAlbums();
  if (route.query.isModalOpen === 'true') {
    getDataFromTableRow2(Number(route.query.modalPopup));
  }
});

// -------------Data request for modal---------------
// const photos = ref([]);
const tableRowObj = ref({});
async function getDataFromTableRow2(payload) {
  await router.push({
    query: {
      ...route.query,
      isModalOpen: 'true',
    },
  });
  tableRowObj.value = payload;
  console.log('albumspagepayload', payload);
  isModalOpen.value = true;
}
function closeModalWindow() {
  isModalOpen.value = false;
  router.push({
    query: {
      ...route.query,
      isModalOpen: 'false',
    },
  });
}
</script>

<template>
  <UniversalTableComponent
    :mergedposts="albumsArr"
    :headers-arr="headersArr"
    @onClickRow="getDataFromTableRow2"
  ></UniversalTableComponent>
  <UniversalModalWindow v-if="isModalOpen" @closeModal="closeModalWindow">
    <AlbumsPagePopup :tableRowObj="tableRowObj"></AlbumsPagePopup>
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
