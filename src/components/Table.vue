<script setup lang="ts">
import TableRow from "@/components/TableRow.vue";
import { onMounted, ref, watch } from "vue";

const props = defineProps({
  mergedItems: Array,
  headersArr: Array,
});
const sortBy = ref("");
const tableHeader = ref("");
const emit = defineEmits(["sendFiltersToParent"]);

function handleSelectValue($event, header) {
  sortBy.value = $event.target.value;
  tableHeader.value = header;
  emit("sendFiltersToParent", { sortBy: sortBy.value, header: header });
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
          <div class="header-select-container">
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
.header-select-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 5px;
}
</style>
