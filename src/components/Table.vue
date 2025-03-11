<script setup lang="ts">
import { onMounted, ref } from "vue";
import TableRow from "@/components/TableRow.vue";

let items = ref([]);
let users = ref([]);
let mergedItems = ref([]);

async function getData() {
  try {
    let response = await fetch("https://jsonplaceholder.typicode.com/posts");
    if (response.ok) {
      items.value = await response.json();
      console.log("items", items.value);
    }
  } catch (error) {
    console.error("Error:", error);
  }
}

async function getUserData() {
  try {
    let response = await fetch("https://jsonplaceholder.typicode.com/users");
    if (response.ok) {
      users.value = await response.json();
      console.log("users", users.value);
    }
  } catch (error) {
    console.error("Error:", error);
  }
}

onMounted(async () => {
  await Promise.all([getData(), getUserData()]);
  mergeUsers();
});

function mergeUsers() {
  mergedItems.value = items.value.map((elem) => {
    let item = users.value.find((user) => elem.userId === user.id);
    if (item) {
      return { ...elem, ...item };
    } else {
      return elem;
    }
  });
  console.log("mergedItems.value", mergedItems.value);
}
</script>
<template>
  <table class="table">
    <thead class="table-head">
      <tr>
        <th class="table-header">ID</th>
        <th class="table-header">User ID</th>
        <th class="table-header">User Name</th>
        <th class="table-header">Title</th>
        <th class="table-header">Body</th>
      </tr>
    </thead>
    <tbody>
      <TableRow v-for="item in mergedItems" :key="item.id">
        <template #id>{{ item.id }}</template>
        <template #userID>{{ item.userId }}</template>
        <template #userName>{{ item.name }}</template>
        <template #title>{{ item.title }}</template>
        <template #body>{{ item.body }}</template>
      </TableRow>
    </tbody>
  </table>
</template>

<style scoped>
.table {
  width: 100%;
  border-collapse: collapse;
}

.table-head {
  background-color: #f3f3f3;
  border: 1px solid black;
}

.table-header {
  font-size: 16px;
  font-weight: bold;
  border: 2px solid black;
  padding: 10px;
}

td {
  border: 1px solid black;
  padding: 8px;
}
</style>

<style scoped>
.table {
  width: 100%;
  border-collapse: collapse;
}

.table-head {
  background-color: #f3f3f3;
}

.table-header {
  font-size: 16px;
  font-weight: bold;
  border: 2px solid black;
  padding: 10px;
}

td {
  border: 1px solid black;
  padding: 8px;
}
</style>
