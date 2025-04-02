<script setup lang="ts">
import TableRow from '@/components/TableRow.vue';
import { onMounted, ref } from 'vue';

const albumsArr = ref([]);

async function getAlbums() {
  try {
    const response = await fetch('https://jsonplaceholder.typicode.com/albums');
    if (response.ok) {
      albumsArr.value = await response.json();
    }
  } catch (error) {
    console.error('Error:', error);
  }
}

onMounted(getAlbums);
</script>

<template>
  <table>
    <thead>
      <tr>
        <th>UserID</th>
        <th>Id</th>
        <th>Title</th>
      </tr>
    </thead>
    <tbody>
      <table-row v-for="album in albumsArr" :key="album.id">
        <template #default>
          <td>{{ album.userId }}</td>
          <td>{{ album.id }}</td>
          <td>{{ album.title }}</td>
        </template>
      </table-row>
    </tbody>
  </table>
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
