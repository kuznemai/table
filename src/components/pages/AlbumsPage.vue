<script setup lang="ts">
import TableRow from '@/components/TableRow.vue';
import { onMounted, ref } from 'vue';
import ModalAlbums from '@/components/ModalAlbums.vue';
import Pagination from '@/components/Pagination.vue';
import Table from '@/components/Table.vue';
import SelectInput from '@/components/SelectInput.vue';

const albumsArr = ref([]);
const headersArr = ref([]);
const selectedMainHeader = ref('');
const inputVal = ref('');

const sort = ref({ sortBy: 'lowtohigh', header: 'postId' });

async function getAlbums() {
  try {
    const response = await fetch('https://jsonplaceholder.typicode.com/albums');
    if (response.ok) {
      albumsArr.value = await response.json();
    }
    headersArr.value = Object.values(Object.keys(albumsArr.value[0]));
    console.log('headersArr.value', headersArr.value);
  } catch (error) {
    console.error('Error:', error);
  }
}

onMounted(getAlbums);

const isOpenModalAlbum = ref(false);
const albumId = ref();
function openModalAlbum(id) {
  albumId.value = id;
  isOpenModalAlbum.value = true;
}

const paginated = ref([]);
function getPaginatedPosts(paginatedPosts) {
  paginated.value = paginatedPosts;
  console.log('paginated.valuepaginated.value', paginated.value);
}
</script>

<template>
  <SelectInput
    v-model:selectedMainHeader="selectedMainHeader"
    v-model:inputVal="inputVal"
    :headersArr="headersArr"
  ></SelectInput>
  <Table :mergedposts="albumsArr" :headers-arr="headersArr" :sort-value="sort"></Table>
  <!--  <Pagination :filtered-posts="filterTableposts" @paginatedposts="getPaginatedPosts"></Pagination>-->

  <!--  <table>-->
  <!--    <thead>-->
  <!--      <tr>-->
  <!--        <th>UserID</th>-->
  <!--        <th>Id</th>-->
  <!--        <th>Title</th>-->
  <!--      </tr>-->
  <!--    </thead>-->
  <!--    <tbody>-->
  <!--      <TableRow v-for="album in paginated" :key="album.id" @click="openModalAlbum(album.id)">-->
  <!--        <template #default>-->
  <!--          <td>{{ album.userId }}</td>-->
  <!--          <td>{{ album.id }}</td>-->
  <!--          <td>{{ album.title }}</td>-->
  <!--        </template>-->
  <!--      </TableRow>-->
  <!--    </tbody>-->
  <!--  </table>-->
  <!--  <ModalAlbums-->
  <!--    v-if="isOpenModalAlbum"-->
  <!--    v-model:isOpenModalAlbum="isOpenModalAlbum"-->
  <!--    :albumId="albumId"-->
  <!--  ></ModalAlbums>-->
  <!--  <Pagination :mergedposts="albumsArr" @paginatedposts="getPaginatedPosts"></Pagination>-->
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
