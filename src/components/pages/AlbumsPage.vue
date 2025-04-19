<script setup lang="ts">
import { onMounted, ref, watch } from 'vue';
import UniversalTableComponent from '@/components/UniversalTableComponent.vue';
import { useRoute, useRouter } from 'vue-router';

import UniversalModalWindow from '@/components/UniversalModalWindow.vue';
import AlbumsPagePopup from '@/components/popups/AlbumsPagePopup.vue';

interface Album {
  userId: number;
  id: number;
  title: string;
}

const albumsArr = ref<Album[]>([]);
const headersArr = ref<string[]>([]);
const openPopupModalId = ref(null);
const route = useRoute();

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
function checkIsOpenPopup() {
  openPopupModalId.value = Number(route.query.modalPopup) || null;
}
checkIsOpenPopup();
// -------------Data request for modal---------------

async function getDataFromTableRow(payload) {
  openPopupModalId.value = payload.id;
}
function closeModalWindow() {
  openPopupModalId.value = null;
}

onMounted(async () => {
  await getAlbums();
  if (route.query.modalPopup) {
    await getDataFromTableRow({
      id: Number(route.query.modalPopup),
    });
  }
});
</script>

<template>
  <UniversalTableComponent
    :mergedposts="albumsArr"
    :headers-arr="headersArr"
    @onClickRow="getDataFromTableRow"
  ></UniversalTableComponent>
  <UniversalModalWindow
    v-if="openPopupModalId"
    @closeModal="closeModalWindow"
    :id="openPopupModalId"
  >
    <albums-page-popup :id="openPopupModalId"></albums-page-popup>
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
