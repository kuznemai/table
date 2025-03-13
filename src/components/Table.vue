<script setup lang="ts">
import TableRow from "@/components/TableRow.vue";
import { onMounted, ref, watch } from "vue";

const props = defineProps({
  mergedItems: Array,
  headersArr: Array,
});

const emit = defineEmits(["renewedMergedItems"]);

function handleSelectValue(event, header) {
  let sortBy = event.target.value;

  let copyOfMerged = [...props.mergedItems];

  if (typeof props.mergedItems[0][header] === "number") {
    console.log("test1");
    if (sortBy === "lowtohigh") {
      return copyOfMerged.sort((a, b) => a[header] - b[header]);
      console.log("props.mergedItems1", props.mergedItems);
    } else if (sortBy === "hightolow") {
      return copyOfMerged.sort((a, b) => b[header] - a[header]);
      console.log("props.mergedItems2", props.mergedItems);
    }
  } else if (typeof props.mergedItems[0][header] === "string") {
    console.log("test2");
    if (sortBy === "lowtohigh") {
      console.log("sortBy", sortBy);
      return copyOfMerged.sort((a, b) => a[header].localeCompare(b[header]));
      console.log("props.mergedItems3", props.mergedItems);
    } else if (sortBy === "hightolow") {
      return copyOfMerged.sort((a, b) => b[header].localeCompare(a[header]));
      console.log("props.mergedItems4", props.mergedItems);
    }
    console.log("props.mergedItems6", props.mergedItems);
  }
  console.log("props.mergedItems5", props.mergedItems);
  console.log(event.target.value);
  console.log("header", header);
  emit("renewedMergedItems", copyOfMerged);
}
</script>

<template>
  <table class="table">
    <thead class="table-head">
      <tr>
        <th
          class="table-header"
          v-for="header in props.headersArr"
          :key="header"
        >
          <div>
            <span>{{ header.charAt(0).toUpperCase() + header.slice(1) }}</span>
            <select
              @change="handleSelectValue($event, header)"
              class="select-wrapper"
            >
              <option value="lowtohigh">По возрастанию</option>
              <option value="hightolow">По убыванию</option>
            </select>
          </div>
        </th>
      </tr>
    </thead>
    <tbody>
      <TableRow v-for="item in props.mergedItems" :key="item.id">
        <template #id>{{ item.userId }}</template>
        <template #userID>{{ item.id }}</template>
        <template #userName>{{ item.title }}</template>
        <template #title>{{ item.body }}</template>
        <template #body>{{ item.username }}</template>
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
